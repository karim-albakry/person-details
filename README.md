# Person Details Project (Full Stack)

This repository contains both the **frontend (React)** and **backend (Node.js/Express)** for the Person Details application.

## 🚀 How to Run the Project

### **1️⃣ Run Locally Without Docker**
#### **Frontend**
```sh
cd person-details-fe
yarn install
yarn dev
```

Runs on http://localhost:5173


### **2️⃣ Run with Docker Compose**
To run both frontend & backend using Docker:

```sh
docker-compose up --build
```

Frontend → http://localhost:5173


```
person-details/
│── docker-compose.yml    # Docker Compose config
│── person-details-fe/    # Frontend (React)
│── person-details-be/    # Backend (Node.js)
│── README.md             # Instructions
```