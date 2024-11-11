# 1. International Payment Portal

File name: APDS final  
Development Environment: Visual Studio Code  
Version: 1.1.1  

## 2. Purpose

The International Payments Portal is an internal banking system that allows customers to securely log in and process international payments via SWIFT. Bank employees can verify and forward these payments to SWIFT for completion. Designed with a robust security focus, the portal handles sensitive information, such as account details and payment data, with maximum protection.

## 3. Design Considerations

Security: Passwords are securely hashed and salted using Bcrypt. All inputs are validated with RegEx patterns to prevent security vulnerabilities, and traffic is encrypted over SSL. Helmet, Morgan, and Express Brute are implemented to further enhance security and monitoring.

Usability: The UI is built using either React or Angular for a smooth customer experience. The backend is structured with Node.js to efficiently handle API requests.

Scalability: The modular architecture enables future enhancements, such as support for additional payment methods and currencies.

## 4. Default Login Details

- Username: tester123  
- Account Number: 1234567891011  
- Password: Password@123

-   ## Default Employee Login Details
-   Username: brute
-   Password: brute123


## 5. Hardware Requirements

This project can run on basic server hardware, but the following specifications are recommended for optimal performance:

- Processor: Dual-core 2 GHz or faster
- Memory: 4 GB RAM (8 GB recommended)
- Storage: 10 GB available space
- Operating System: Windows, macOS, or Linux (Ubuntu preferred)
- SSL Support: Requires SSL certificate and private key for secure communication

## 6. Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.0 or higher) or compatible cloud database
- SSL Certificate for encrypted communication

## 7. Installation Instructions

- Clone the Repository: Begin by cloning the project repository from GitHub to your local machine.

- Extract the Files: After cloning the repository, extract the project files to a directory of your choice.

- *Open the Project in VS Code: Launch Visual Studio Code (VS Code), then open the folder containing the extracted project files by selecting *File > Open Folder and navigating to the project directory.

- Connect to MongoDB Server: 
  - Navigate to the server folder within the project directory. 
  - Open the integrated terminal in VS Code and run the following command to start the MongoDB server connection:
  
    bash
    node index.js
    

  - This command will initiate the backend server and connect it to the MongoDB database.

- Start the Frontend Application: 
  - Navigate to the client folder located within the project directory under components. 
  - Open the integrated terminal in VS Code and run the following command to launch the frontend application:

    bash
    npm start
    

  - This will start the React application locally.

- Access the Application Locally: 
  - Once the frontend application has started, open your browser and visit [http://localhost:3000](http://localhost:3000) to interact with the application. 
  - All functionality should now be available for use on your local machine.

By following these steps, you will have the project up and running, ready to explore and utilize the full functionality of the application.


## 8. Core Features

- User Login: Customers and employees log in using their credentials, with authentication handled via JWT for secure session management. Note: Users are pre-created, and no registration process is available.

- International Payments: Customers can submit payments by entering the amount, selecting the currency, and providing SWIFT details.

- Employee Verification: Employees verify payments and forward them to SWIFT for processing.

- Secure Communication: All data is transmitted securely using SSL encryption.

- Input Validation: All user inputs are whitelisted and validated using RegEx patterns to protect against injection attacks and other threats.

- Security Measures:

  - Password Security: All passwords are hashed and salted using Bcrypt.
  - Attack Protection: Defenses against SQL Injection, Cross-Site Scripting (XSS), and Cross-Site Request Forgery (CSRF) are implemented.
  - Brute Force Protection: Express Brute is used to rate-limit login attempts.
  - HTTP Headers Security: Helmet is used to secure HTTP headers, enhancing the security of responses.
  - Traffic Logging: Morgan is implemented to log HTTP requests, supporting monitoring and debugging.
  - SSL Encryption: Ensures secure communication between the client and server.

## 9. Database (MongoDB)

MongoDB is used to securely store user and payment data.

### MongoDB Setup

- Install MongoDB locally or use a cloud service like MongoDB Atlas.
- The connection URI is stored in the .env file under MONGO_URI.

### Collections

- customers: Stores employee login information with hashed passwords.
- employees: Stores employee login information with hashed passwords.
- payments: Stores customer payment information securely, including SWIFT details.

## 10. FAQs

- How secure is the portal?  
  The portal employs strong security measures such as password hashing, data encryption, and protection against common online threats.

- Can I add more payment methods?  
  Yes, the app can be updated to support additional payment options beyond SWIFT.

## 11. Code Attribution

Some open-source libraries and frameworks are used in this project:

- React / Angular: Frontend framework for building user interfaces.
- Node.js: Backend JavaScript runtime environment.
- Bcrypt: For password hashing and salting.
- JWT: For secure token-based authentication.
- Morgan: For HTTP request logging.
- Helmet: For securing HTTP headers.
- Express Brute: For brute-force attack protection through rate limiting.

## 12. Developers Info

- Zaeem Patel: ST10201991
- Thaslyn Govender: ST10133946
- Rylan Newman: ST10190421
- Liam Cole Abraham: ST10144656
- Ubaidullah Yusuf Shaik: ST10232176

## 13. Acknowledgements

- YouTube: The extensive library of tutorials and guides on YouTube was instrumental in learning new concepts and overcoming challenges encountered throughout the project. Various content creators provided clear, step-by-step instructions for implementing features, setting up environments, and troubleshooting common issues, making complex tasks much more manageable.

- Stack Overflow: The collaborative community at Stack Overflow played a crucial role in addressing specific issues and refining the project. By offering detailed answers, code snippets, and best practices, Stack Overflow helped in solving technical roadblocks and in understanding more advanced concepts, ensuring smoother development and a more robust final product.

## 14. References

- YouTube (2024): YouTube. Available at: [https://www.youtube.com/](https://www.youtube.com/)
- Stack Overflow (2024): Available at: [https://stackoverflow.com/](https://stackoverflow.com/)
- MongoDB, Inc. (2024): Available at: [https://www.mongodb.com/](https://www.mongodb.com/)
