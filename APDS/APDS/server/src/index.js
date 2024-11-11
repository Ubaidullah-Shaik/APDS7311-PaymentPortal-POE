const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const { LogInCollection, EmployeeCollection, PaymentCollection } = require("./mongodb");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "APDS FINAL/APDS/client/build")));

// API Routes

// User signup route
app.post("/signup", async (req, res) => {
    const { fullName, username, idNumber, accountNumber, password } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const data = {
            fullName,
            username,
            idNumber,
            accountNumber,
            password: hashedPassword,
        };
        await LogInCollection.insertMany([data]);
        res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ message: "Error signing up" });
    }
});

// User login route
app.post("/login", async (req, res) => {
    const { username, accountNumber, password } = req.body;

    try {
        const user = await LogInCollection.findOne({ username, accountNumber });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        if (user.lockUntil && user.lockUntil > Date.now()) {
            return res.status(403).json({
                message: "Account is temporarily locked due to multiple failed login attempts. Please try again later.",
                lock: true
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            await user.incrementLoginAttempts();
            return res.status(401).json({ message: "Invalid credentials" });
        }

        await user.resetLoginAttempts();
        res.status(200).json({ message: "Login successful", fullName: user.fullName, userId: user._id });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in" });
    }
});

// Employee login route
app.post("/employee-login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const employee = await EmployeeCollection.findOne({ username });
        if (!employee) return res.status(401).json({ success: false, message: "Invalid credentials" });

        const passwordMatch = await bcrypt.compare(password, employee.password);
        if (!passwordMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

        res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        console.error("Error logging in employee:", error);
        res.status(500).json({ success: false, message: "Error logging in" });
    }
});

// Add Employee Route
app.post("/add-employee", async (req, res) => {
    const { username, password } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newEmployee = new EmployeeCollection({ username, password: hashedPassword });
        await newEmployee.save();
        res.status(201).json({ success: true, message: "Employee added successfully" });
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).json({ success: false, message: "Error adding employee" });
    }
});

// Add Payment Route
app.post("/payment", async (req, res) => {
    const { userId, amount, currency, recipientAccountNumber, provider, swiftCode, description } = req.body;

    try {
        const paymentData = {
            userId,
            amount,
            currency,
            recipientAccountNumber,
            provider,
            swiftCode,
            description,
            status: "Pending" // or "Completed" if that's the default you prefer
        };
        
        const newPayment = new PaymentCollection(paymentData);
        await newPayment.save();

        res.status(201).json({ success: true, message: "Payment processed successfully" });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ success: false, message: "Error processing payment" });
    }
});


// Approve payment endpoint
app.put("/employee/approve-payment/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPayment = await PaymentCollection.findByIdAndUpdate(id, { status: "Completed" }, { new: true });
        res.status(200).json(updatedPayment);
    } catch (error) {
        console.error("Error updating payment status:", error);
        res.status(500).json({ message: "Failed to update payment status" });
    }
});

// Fetch completed payments for the user
app.get("/completed-payments", async (req, res) => {
    try {
        const completedPayments = await PaymentCollection.find({ status: "Completed" });
        res.status(200).json(completedPayments);
    } catch (error) {
        console.error("Error fetching completed payments:", error);
        res.status(500).json({ message: "Failed to fetch payments" });
    }
});

// Get all transactions for employees
app.get("/employee/transactions", async (req, res) => {
    try {
        const transactions = await PaymentCollection.find({});
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Failed to fetch transactions" });
    }
});

// Get payment history for a user or all if userId is not provided
app.get("/payments/:userId?", async (req, res) => {
    const { userId } = req.params;

    try {
        const payments = userId
            ? await PaymentCollection.find({ userId })
            : await PaymentCollection.find({});  // If userId isn't provided, fetch all payments

        res.status(200).json(payments);
    } catch (error) {
        console.error("Error fetching payment history:", error);
        res.status(500).json({ message: "Failed to fetch payment history" });
    }
});



// Serve React App on any other route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "APDS FINAL/APDS/client/build/index.html"));
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});