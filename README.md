# 🎉 Event Management System

A full-stack **web application** built with **React**, **Node.js**, and **MySQL**, allowing users to manage events with secure login, user roles, and admin capabilities.

This project was developed as part of a self-initiated learning goal to master **full-stack development**, **role-based access control**, and **RESTful API** principles.

---

## 🚀 Features

- ✅ **User Authentication:** Secure login with role-based access (Admin/User)
- 🗓️ **Event Management:** Add, edit, delete, and view events
- 🔐 **Authorization:** Admins can manage all events; users can manage only their own
- 🧠 **JWT Security:** JSON Web Token used for session management
- 📄 **Audit-Friendly:** Created_by field tracks which user added each event
- 🌐 **RESTful API:** Modular, scalable backend logic with clean endpoints
- 📱 **Responsive UI:** Built with React and Bootstrap for modern styling

---

## 🛠️ Technologies Used

### 💻 Frontend
- **React.js**
- **React Router**
- **Axios**
- **React-Bootstrap / Bootstrap**
- **LocalStorage API**

### 🔧 Backend
- **Node.js**
- **Express.js**
- **MySQL**
- **bcryptjs** – for password hashing
- **jsonwebtoken (JWT)** – for secure authentication
- **cors** – to enable cross-origin requests

---

## 📦 Getting Started

Follow these steps to run the app locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/event-management-system.git
cd event-management-system
````

### 2️⃣ Install Dependencies

#### Backend:

```bash
cd server
npm install
```

#### Frontend:

```bash
cd client
npm install
```

### 3️⃣ Setup MySQL Database

* Create a database named `events`
* Import the required tables from `events.sql`
* Update MySQL connection credentials in `server/Server.js`

### 4️⃣ Run the App

#### Backend:

```bash
cd server
npm run dev
```

#### Frontend:

```bash
cd client
npm start
```

---

## 🧠 Learning Objectives

This project helped improve skills in:

* 🎯 Full-Stack Web Development with React & Node
* 🔐 Authentication & Authorization using JWT
* 📡 API Design and REST principles
* 🛠️ CRUD Operations and MySQL Integration
* 🧩 Clean UI Layout with Bootstrap
* 📦 Session Management with Local Storage

---

## ✍️ Author

**Taniya Anjalie Jeewandara**  
*🎓 BSc (Hons) Computer Science (Top-up) student*  
💡 Passionate about software development, full-stack apps, and real-world problem solving.

---

## 📜 License

This project is open-source and intended for learning and academic purposes.
For contributions or collaborations, feel free to connect via GitHub.

---

⭐ If you found this project useful or inspiring, give it a star!

```

---

Would you like this saved as a `.md` file or want a version tailored for a live portfolio site too?
```
