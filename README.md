# LifeLink Backend

A secure Blood Emergency Coordination Platform backend built using Node.js, Express, and MongoDB.

---

## 🚀 Project Overview

LifeLink enables hospitals to manage emergency blood requirements and allows verified donors to respond to active emergency cases.

The system implements secure authentication, role-based access control, and structured MVC architecture.

---

## 🏗 Architecture

This project follows **Strict MVC Architecture**:

- Routes → Handle endpoints only
- Controllers → Handle request/response logic
- Services → Contain business logic
- Models → Define MongoDB schema
- Middlewares → Authentication, validation, error handling
- Utils → Custom utilities (AppError)

No business logic exists inside routes.

---

## 📁 Folder Structure

```
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   ├── validations/
│   ├── utils/
│   └── app.js
│
├── server.js
└── package.json
```

---

## 🗄 Database Models

### User
- name
- email
- password (hashed)
- role (Admin/User)
- bloodGroup
- city
- phone

### Project (Emergency Case)
- title
- hospitalName
- city
- requiredBloodGroup
- unitsRequired
- urgencyLevel
- status (Active/Closed)
- createdBy (User reference)

### Task (Donor Response)
- projectId (Project reference)
- donorId (User reference)
- status (Pending/Approved/Rejected/Completed)
- verifiedBy (Admin reference)

---

## 🔐 Security Features

- JWT Authentication
- Password hashing (bcrypt)
- Strong password validation
- Helmet (secure headers)
- CORS configuration
- Rate limiting
- Mongo sanitize (NoSQL injection prevention)
- XSS protection
- Centralized error handling
- Role-based middleware

---

## 🌍 Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

---

## 🛠 Installation & Setup

1. Clone repository
2. Install dependencies

```
npm install
```

3. Create `.env` file
4. Run server

```
npm run dev
```

---

## 🔄 Deployment Architecture

React (Frontend)
↓
Node.js Backend (Render/Railway)
↓
MongoDB Atlas

---

## 📬 API Testing

Postman collection will be provided separately.

---

## 👨‍💻 Author

Ravi Kumar