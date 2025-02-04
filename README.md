# Person Details Project (Full Stack)

This repository contains both the **frontend (React)** and **backend (Node.js/Express)** for the Person Details application.

## 📌 Index
1. [🚀 Prerequisites](#-prerequisites)
2. [🚀 Setup Guide](#-setup-guide)
   - [1️⃣ Automatic Setup](#1️⃣-automatic-setup)
     - [With Docker Compose](#with-docker-compose-full-setup-frontend-backend-and-database)
     - [Without Docker Compose](#without-docker-compose-only-database-in-docker-frontend--backend-locally)
   - [2️⃣ Manual Setup](#2️⃣-manual-setup)
     - [I. With Docker Compose (Full Setup)](#i-with-docker-compose-full-setup)
     - [II. Without Docker Compose (Only Database in Docker, Frontend & Backend Locally)](#ii-without-docker-compose-only-database-in-docker-frontend--backend-locally)
       - [1️⃣ Database Setup](#1️⃣-database-setup)
       - [2️⃣ Environment Variables Setup](#2️⃣-environment-variables-setup)
       - [3️⃣ Frontend and Backend Setup](#3️⃣-frontend-and-backend-setup)
3. [🚀 Architecture and Design Patterns](#-architecture-and-design-patterns)
4. [🚀 API Documentation](#-api-documentation)
5. [🚀 Running Tests](#-running-tests)
5. [📂 Project Structure](#-project-structure)

## 🚀 Prerequisites

Before running the project, ensure that the following are installed on your local machine:

### **For Local Setup (Docker Users)**
- **Docker**
- **docker-compose**

#### For local setup (Non-Docker Users):
- **Docker** (for the database, if not running PostgreSQL locally) or **PostgreSQL**
- **Node.js**
- **TypeScript**

## 🚀 Setup Guide

### **1️⃣ Automatic Setup**

#### **With Docker Compose (Full Setup: Frontend, Backend, and Database)**
This will start the entire stack automatically:

For Linux/macOS:
```sh
./setup-docker.sh
```

For Windows:
```bat
setup-docker.bat
```

#### **Without Docker Compose (Only Database in Docker, Frontend & Backend Locally)**
For Linux/macOS:
```sh
chmod +x setup-local.sh
./setup-local.sh
```

For Windows:
```bat
setup-local.bat
```

---

### **2️⃣ Manual Setup**

#### **I. With Docker Compose (Full Setup)**
If you want to manually run the project with Docker Compose, use:
```sh
docker-compose up --build
```

#### **II. Without Docker Compose (Only Database in Docker, Frontend & Backend Locally)**

### **1️⃣ Database Setup**
##### **Database (Run in Docker)**
```sh
docker run --name person-postgres-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=persons_db -p 5432:5432 -d postgres
```

##### **Apply Database Migrations**
```sh
docker cp person-details-be/database/init.sql person-postgres-db:/docker-entrypoint-initdb.d/init.sql
docker exec -i person-postgres-db psql -U admin -d persons_db -f /docker-entrypoint-initdb.d/init.sql
```

Or just tun the follwoing script inside your database after installation using your prefered tool such as **dbeaver**:

```sh
person-details-be/database/init.sql
```



### **2️⃣ Environment Variables Setup**
Create the required `.env` files for the frontend and backend based on the provided example files:

#### **Backend `.env` file**
Create `person-details-be/.env` with the following content:
```sh
PORT=3000
DB_USER=admin
DB_HOST=localhost
DB_NAME=persons_db
DB_PASSWORD=admin
DB_PORT=5432
```

### **3️⃣ Frontend and Backend Setup**
#### **Frontend `.env` file**
Create `person-details-fe/.env` with the following content:
```sh
VITE_BACKEND_URL=http://localhost:3000/api
```

###### **Backend**
```sh
cd person-details-be
npm install
npm run dev
```
Runs on http://localhost:3000/api

###### **Frontend**
```sh
cd person-details-fe
yarn install
yarn dev
```
Runs on http://localhost:5173

---

## 🚀 Architecture and Design Patterns
### **🔹 Architecture**
- The project follows a **client-server architecture**, where:
  - The **frontend (React)** serves the UI and consumes the API.
  - The **backend (Node.js/Express)** processes requests and interacts with two data sources (CSV and PostgreSQL).
  - The **PostgreSQL database** stores structured data, while a **CSV file** provides an additional data source.
  - Docker is used for containerized deployment.

### **🔹 Design Pattern**
- The backend follows the **Repository Pattern**, where:
  - A `CsvPersonRepository` handles CSV data interactions.
  - A `SqlPersonRepository` handles PostgreSQL database queries.
  - A service layer processes business logic before returning results to the API.

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

## 🚀 Running Tests

To run the **unit tests**, execute the following inside `person-details-be`:

```sh
npm run test
```
**Note:** Ensure dependencies are installed before running tests:
```sh
npm install
```

---

## 📂 Project Structure
```
person-details/
│── docker-compose.yml    # Docker Compose config
│── setup-local.sh        # Local setup script for Linux/macOS
│── setup-local.bat       # Local setup script for Windows
│── setup-docker.sh       # Docker setup script for Linux/macOS
│── setup-docker.bat      # Docker setup script for Windows
│── person-details-fe/    # Frontend (React)
│── person-details-be/    # Backend (Node.js)
│── README.md             # Instructions