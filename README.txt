# Project Management System (MERN Stack)

A full-stack Project Management application built using the MERN stack (MongoDB, Express.js, React, Node.js).
This app allows users to authenticate, create projects, manage tasks, and track progress through a modern dashboard UI.

---

## Live Demo

* Frontend: https://assessment-3-zfnf.onrender.com
* Backend: https://assessment-3-zfnf.onrender.com

---

## Features

### Authentication

* User Signup & Login
* JWT-based authentication
* Protected routes

### 📁 Project Management

* Create, update, delete projects
* View all projects
* Persistent storage using MongoDB

### ✅ Task Management (Planned / Partial)

* Task creation & assignment
* Status tracking (Pending, In Progress, Completed)
* Dashboard insights (tasks, overdue, progress)

### 📊 Dashboard

* Overview of projects
* Task progress tracking UI
* Clean and modern design using Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* React Router
* Fetch API

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* CORS

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/rastogi-archi/assessment.git
cd assessment
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=4000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints

### Auth Routes

* POST `/api/auth/signup`
* POST `/api/auth/login`
* GET `/api/auth/me`

### Project Routes

* POST `/api/projects/create`
* GET `/api/projects/getAll`
* GET `/api/projects/:id`
* PUT `/api/projects/:id`
* DELETE `/api/projects/:id`

---

## 🚨 Common Issues & Fixes

### ❌ ERR_CONNECTION_REFUSED

* Ensure backend is running
* Check correct API URL (not localhost in production)

### ❌ 403 / CORS Error

* Add frontend URL in backend CORS config

### ❌ MongoDB Not Connecting

* Verify MongoDB Atlas IP whitelist (0.0.0.0/0 for testing)

### ❌ Render Build Error

* Use:

```bash
Build Command: npm install
Start Command: node index.js
```

---

## 📌 Future Improvements

* Task assignment system
* Role-based access control
* Notifications system
* File uploads
* Real-time updates (Socket.io)

---

## 👩‍💻 Author

**Archi Rastogi**
GitHub: https://github.com/rastogi-archi

---

## ⭐ Acknowledgements

* MongoDB Atlas
* Vercel
* Render
* Tailwind CSS

---

## 📄 License

This project is for learning and demonstration purposes.
