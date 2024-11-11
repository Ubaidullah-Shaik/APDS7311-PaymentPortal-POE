// mongodb.js

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://tashlyng26:LhrXHBSVupnkwfRQ@cluster0.45lqw.mongodb.net/myDatabaseName?retryWrites=true&w=majority")
   .then(() => {
       console.log("MongoDB Atlas connected");
   })
   .catch((e) => {
       console.log("Connection failed", e);
   });

// Existing schemas
const logInSchema = new mongoose.Schema({
   fullName: { type: String, required: true },
   username: { type: String, required: true, unique: true },
   idNumber: { type: String, required: true },
   accountNumber: { type: String, required: true },
   password: { type: String, required: true },
   loginAttempts: { type: Number, required: true, default: 0 },  // Track login attempts
   lockUntil: { type: Date }  // Lock the account until this date/time
});

const employeeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "employee" }
});

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Collection1", required: false },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    recipientAccountNumber: { type: String, required: true },
    provider: { type: String, required: true },
    swiftCode: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "Completed" },
    createdAt: { type: Date, default: Date.now }
});

// Method to increment login attempts
logInSchema.methods.incrementLoginAttempts = function() {
    // Check if we should reset the counter (e.g., if lockUntil has passed)
    if (this.lockUntil && Date.now() > this.lockUntil) {
        this.loginAttempts = 1;
        this.lockUntil = undefined;
    } else {
        this.loginAttempts += 1;
        if (this.loginAttempts >= 5) {  // Threshold of 5 failed attempts
            this.lockUntil = Date.now() + 1 * 60 * 1000;  // Lock for 15 minutes
        }
    }
    return this.save();
};

// Method to reset login attempts
logInSchema.methods.resetLoginAttempts = function() {
    this.loginAttempts = 0;
    this.lockUntil = undefined;
    return this.save();
};

// Create models with the schemas
const LogInCollection = mongoose.model("Collection1", logInSchema);
const EmployeeCollection = mongoose.model("Employees", employeeSchema);
const PaymentCollection = mongoose.model("Payments", paymentSchema);

module.exports = { LogInCollection, EmployeeCollection, PaymentCollection };