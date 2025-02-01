# Person Details Project (Full Stack)

This repository contains both the **frontend (React)** and **backend (Node.js/Express)** for the Person Details application.

## 🚀 Quick Start

### **For Linux/macOS Users**
Run the following command:
```sh
./setup.sh
```

### **For Windows Users**
Run:
```bat
setup.bat
```

## 🚀 How to Run the Project Manually

### **1️⃣ Run Locally Without Docker**
#### **Frontend**
```sh
cd person-details-fe
yarn install
yarn dev
```

Runs on http://localhost:5173

#### **Backend**
```sh
cd person-details-be
npm install
npm run dev
```

Runs on http://localhost:3000/api

### **2️⃣ Run with Docker Compose**
To run both frontend & backend using Docker:

```sh
docker-compose up --build
```

Frontend → http://localhost:5173

Backend → http://localhost:3000/api

---

## **🚀 API Documentation**
### **📌 Endpoint: Get Person Details**
#### **Request**
```http
GET /api/person-details?name=John&phone=1234&address=Main St&country=USA
```
#### **Response (Example)**
```json
[
    {
        "first name": "John",
        "last name": "Doe",
        "telephone code": "1",
        "telephone number": "123456789",
        "address": "123 Main St",
        "country": "USA"
    }
]
```

---

## 📂 Project Structure
```
person-details/
│── docker-compose.yml    # Docker Compose config
│── setup.sh              # Setup script for Linux/macOS
│── setup.bat             # Setup script for Windows
│── person-details-fe/    # Frontend (React)
│── person-details-be/    # Backend (Node.js)
│── README.md             # Instructions
```
