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

### **1️⃣ Prerequisites**
Before running the project, ensure that **PostgreSQL** is installed. If it's not installed, you can set up a PostgreSQL container using Docker with the following command:

```sh
docker run --name postgres-container -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=persons_db -p 5432:5432 -d postgres
```

After setting up the database, **run the following migration** to initialize the database schema:

```sh
person-details-be\database\init.sql
```
### **2️⃣ Environment Variables Setup**
Create the required `.env` files for the frontend and backend based on the provided example files:

#### **Backend `.env` file**
Create `person-details-be/.env` with the following content:
```sh
PORT=${BACKEND_PORT:-3000}
DB_USER=admin
DB_HOST=database
DB_NAME=persons_db
DB_PASSWORD=admin
DB_PORT=${DB_PORT:-5432}
```

#### **Frontend `.env` file**
Create `person-details-fe/.env` with the following content:
```sh
VITE_BACKEND_URL=http://localhost:${BACKEND_PORT:-3000}/api
```

### **3️⃣ Run Locally Without Docker**
#### **Backend**
```sh
cd person-details-be
npm install
npm run dev
```

Runs on http://localhost:3000/api

#### **Frontend**
```sh
cd person-details-fe
yarn install
yarn dev
```

Runs on http://localhost:5173

### **4️⃣ Run with Docker Compose**
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
