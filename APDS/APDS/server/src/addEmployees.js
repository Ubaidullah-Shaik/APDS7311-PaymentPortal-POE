//addEmployee.js
const mongoose = require("mongoose");
const { EmployeeCollection } = require("./mongodb");

mongoose.connect("mongodb+srv://your-mongodb-uri")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Connection error", err));

const insertEmployees = async () => {
    const employees = [
        {
            username: "employee1",
            password: "password123" // In production, use hashed passwords!
        },
        {
            username: "employee2",
            password: "securepass456"
        }
    ];

    try {
        for (const employee of employees) {
            const existingEmployee = await EmployeeCollection.findOne({ username: employee.username });
            
            if (!existingEmployee) {
                await EmployeeCollection.create(employee);
                console.log(`Employee ${employee.username} added`);
            } else {
                console.log(`Employee ${employee.username} already exists, skipping`);
            }
        }
    } catch (error) {
        console.error("Error inserting employees", error);
    } finally {
        mongoose.connection.close();
    }
};

insertEmployees();
