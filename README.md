# ShoppEX - Management Hub of the Future 🚀

**ShoppEX** is a high-performance, full-stack Billing and Inventory Management System designed to streamline business operations with precision. Featuring a modern, cinematic UI and a robust Spring Boot backend, it provides a centralized platform for managing products, categories, orders, and user access.

---

## ✨ Key Features

- **🛡️ Secure IAM Console**: Advanced Identity and Access Management with role-based access control (Admin/User).
- **📊 Real-time Dashboard**: Track business metrics, recent activities, and system status at a glance.
- **📦 Inventory Management**: Full CRUD operations for products and categories with image upload support.
- **💳 Order Processing**: Seamless order creation with integrated payment methods (CASH/UPI) and Razorpay support.
- **✨ Premium UI/UX**: Cinematic landing pages, split-screen authentication, and responsive dark-mode management interfaces.
- **🔒 Secure Authentication**: JWT-based security with password visibility toggles and encrypted credential storage.

---

## 🛠️ Technology Stack

### Frontend
- **React 19** & **Vite** (Next-gen bundling)
- **Bootstrap 5** & **Bootstrap Icons**
- **React Router 7** (Modern routing)
- **React Hot Toast** (Professional notifications)
- **Axios** (API integration)

### Backend
- **Java** & **Spring Boot 3.4**
- **Spring Security** (JWT Authentication)
- **Spring Data JPA** (Hibernate)
- **MySQL** (Relational Database)
- **Maven** (Dependency management)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **Java JDK** (17 or 21)
- **MySQL Server**
- **Maven**

### 1. Database Setup
1. Create a MySQL database named `billing_app`.
2. Import the `billing_app.sql` file provided in the root directory to set up the schema and initial data.

### 2. Backend Configuration
Navigate to `billingsoftware/src/main/resources/application.properties` and update your database credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/billing_app
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

### 3. Running the Application

#### Start the Backend:
```bash
cd billingsoftware
./mvnw spring-boot:run
```
*The backend will start at `http://localhost:8080/api/v1.0`*

#### Start the Frontend:
```bash
cd client
npm install
npm run dev
```
*The frontend will start at `http://localhost:5173`*

---

## 📸 Project Architecture

```
ShoppEX/
├── billingsoftware/      # Spring Boot Backend
│   ├── src/              # Source code
│   └── pom.xml           # Dependencies
├── client/               # React Frontend
│   ├── src/              # Components & Pages
│   └── package.json      # Dependencies
└── billing_app.sql       # Database Schema
```

---

## 📄 License
This project is developed for educational and professional management purposes.

---

**Developed with ❤️ for Modern Businesses.**
