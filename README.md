# Person Details Frontend (React)

This repository contains the **frontend** of the Person Details application, built with **React**, **Bootstrap**, and containerized using **Docker**.

## 🚀 How to Run the Project

### **1️⃣ Run Locally Without Docker**
#### **Frontend**
```sh
cd person-details-fe
yarn install
yarn dev
```

- The application will be available at: **http://localhost:5173**

---

### **2️⃣ Run with Docker Compose**
If you want to run the frontend using **Docker Compose**:

```sh
docker-compose up --build
```

- The **frontend** will be available at: **http://localhost:5173**

---

## 🔧 Environment Variables
Before running the project, create a **`.env`** file inside the `person-details-fe/` directory:

```
VITE_BACKEND_URL=http://localhost:3000/api
```

This configures the frontend to communicate with the backend.

---

## 📁 Project Structure
```
person-details/
│── docker-compose.yml    # Docker Compose configuration
│── person-details-fe/    # Frontend (React)
│── README.md             # Project setup instructions
```

---

## ✨ Features
✔️ **Modern UI with React & Bootstrap**
✔️ **Sorting, Filtering & Pagination**
✔️ **Loading Spinner & Modals for better UX**
✔️ **Dockerized for easy deployment**

---

## 🔜 Next Steps
- Integrate the backend (`person-details-be/`)
- Implement CI/CD for automated deployment
- Deploy to a cloud provider

Feel free to contribute or suggest improvements! 🚀