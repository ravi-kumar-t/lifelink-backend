# LifeLink Backend

Emergency Blood Response System — REST API built with Node.js, Express, and MongoDB.

## Live API

```
https://lifelink-backend-2yvn.onrender.com
```

---

## Architecture

```
React Frontend (Vercel)
        ↓
Node.js + Express API (Render)
        ↓
MongoDB Atlas
```

### MVC Pattern

```
src/
├── config/          → Database connection
├── controllers/     → Request/response handling only
├── models/          → Mongoose schemas
├── routes/          → Route definitions only
├── middlewares/     → Auth, role, validation, error
├── services/        → All business logic
├── utils/           → AppError helper
├── validations/     → Joi schemas
└── app.js           → Express app setup

server.js            → Entry point
```

**Rules strictly followed:**
- No DB queries in routes
- No business logic in routes
- Controllers only call services
- Services contain all business logic

---

## Folder Structure

```
lifelink-backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── project.controller.js
│   │   └── task.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── role.middleware.js
│   │   └── validation.middleware.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── project.model.js
│   │   └── task.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   └── task.routes.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── project.service.js
│   │   └── task.service.js
│   ├── utils/
│   │   └── AppError.js
│   ├── validations/
│   │   ├── auth.validation.js
│   │   ├── project.validation.js
│   │   └── task.validation.js
│   └── app.js
│
├── server.js
├── package.json
└── .env
```

---

## ER Diagram

```
┌─────────────────────┐
│        USER         │
├─────────────────────┤
│ _id (ObjectId)      │
│ name (String)       │
│ email (String)      │
│ password (String)   │
│ role (Admin/User)   │
│ bloodGroup (String) │
│ phone (String)      │
│ city (String)       │
│ isAvailable (Bool)  │
│ createdAt           │
└────────┬────────────┘
         │ createdBy (1)
         │
         ▼
┌─────────────────────┐
│  PROJECT            │        ┌─────────────────────┐
│  (Emergency Case)   │        │  TASK               │
├─────────────────────┤        │  (Donor Response)   │
│ _id (ObjectId)      │◄───────├─────────────────────┤
│ title (String)      │        │ _id (ObjectId)      │
│ hospitalName        │ (many) │ projectId (ref)     │
│ city (String)       │        │ donorId (ref)       │
│ requiredBloodGroup  │        │ status (enum)       │
│ unitsRequired (Num) │        │ verifiedBy (ref)    │
│ urgencyLevel (enum) │        │ createdAt           │
│ createdBy (ref)     │        └──────────┬──────────┘
│ status (enum)       │                   │ donorId (many)
│ createdAt           │                   │
└─────────────────────┘         ┌─────────┘
                                 │
                              USER (donor)
```

**Relationships:**
- User (Admin) → creates many Projects
- Project → has many Tasks (Donor Responses)
- User (Donor) → has many Tasks

---

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/auth/register | Public | Register user |
| POST | /api/auth/login | Public | Login user |
| GET | /api/auth/me | Protected | Get current user |

### Projects (Emergency Cases)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/projects | Admin | Create emergency case |
| GET | /api/projects | Protected | Get all active cases |
| GET | /api/projects/:id | Protected | Get case by ID |
| PATCH | /api/projects/:id/close | Admin | Close emergency case |

### Tasks (Donor Responses)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/tasks/respond/:projectId | User | Respond to emergency |
| GET | /api/tasks/project/:projectId | Admin | Get all responses for a case |
| PATCH | /api/tasks/:taskId/status | Admin | Update donor status |

---

## Security

| Feature | Implementation |
|---------|----------------|
| Password hashing | bcrypt (salt rounds: 10) |
| Authentication | JWT with expiration |
| Authorization | Role-based middleware (Admin/User) |
| Request limiting | express-rate-limit (100 req/15min) |
| Security headers | Helmet |
| CORS | Configured for frontend URL only |
| NoSQL injection | express-mongo-sanitize |
| Input validation | Joi schemas on all routes |

---

## Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
FRONTEND_URL=https://your-frontend-url.vercel.app
```

---

## Local Setup

```bash
# Clone the repo
git clone https://github.com/ravi-kumar-t/lifelink-backend.git
cd lifelink-backend

# Install dependencies
npm install

# Create .env file and add your environment variables

# Run in development
npm run dev

# Run in production
node server.js
```

---

## Git Workflow

```
feature/* → dev → main
```

**Branches:**
- `main` — production ready
- `dev` — integration branch
- `feature/auth` — authentication
- `feature/projects` — emergency cases
- `feature/tasks` — donor responses
- `feature/security` — security middleware

---

## Deployment

**Platform:** Render

1. Connect GitHub repo to Render
2. Set Build Command: `npm install`
3. Set Start Command: `node server.js`
4. Add all environment variables
5. Deploy from `main` branch

**Database:** MongoDB Atlas
- Whitelist Render IPs (or allow all: 0.0.0.0/0)
- Use connection string in `MONGO_URI`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Validation | Joi |
| Security | Helmet, CORS, Rate Limit, Mongo Sanitize |
| Deployment | Render |