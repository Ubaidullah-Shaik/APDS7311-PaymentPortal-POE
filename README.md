# 1. International Payment Portal

**File name:** APDS final  
**Development Environment:** Visual Studio Code  
**Version:** 1.1.1  

## 2. PURPOSE

The International Payments Portal is an internal banking system that allows customers to securely log in and process international payments via SWIFT. Bank employees can verify and forward these payments to SWIFT for completion. Designed with a robust security focus, the portal handles sensitive information, such as account details and payment data, with maximum protection. 

## 3. DESIGN CONSIDERATIONS

### 3.1. Security
Passwords are securely hashed and salted using Bcrypt. All inputs are validated with RegEx patterns to prevent security vulnerabilities, and traffic is encrypted over SSL. Helmet, Morgan, and Express Brute are implemented to enhance security and monitoring.

### 3.2. Usability
The UI is built using either React or Angular for a smooth customer experience. The backend is structured with Node.js to efficiently handle API requests.

### 3.3. Scalability
The modular architecture enables future enhancements, such as support for additional payment methods and currencies.

## 4. DEFAULT LOGIN DETAILS

- **Username:** Admin  
- **Account Number:** 123456  
- **Password:** Admin123!

## 5. HARDWARE REQUIREMENTS

This project can run on basic server hardware, but the following specifications are recommended for optimal performance:

- **Processor:** Dual-core 2 GHz or faster  
- **Memory:** 4 GB RAM (8 GB recommended)  
- **Storage:** 10 GB availab
