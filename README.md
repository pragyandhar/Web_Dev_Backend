# Web Dev Backend - JWT Authentication API

A secure RESTful API backend built with Node.js, Express, and MongoDB, implementing JWT-based authentication for user registration and login.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Data Models](#data-models)
- [Validation Rules](#validation-rules)
- [Security Features](#security-features)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This project provides a robust authentication system using JSON Web Tokens (JWT). It allows users to register new accounts, login securely, and access protected routes using token-based authentication. All passwords are hashed using bcrypt for enhanced security.

## ✨ Features

- **User Registration**: Create new user accounts with email and password
- **User Login**: Authenticate existing users and generate JWT tokens
- **Password Hashing**: Secure password storage using bcrypt with salt
- **Input Validation**: Comprehensive validation using @hapi/joi
- **Token Verification**: Middleware to protect routes and verify JWT tokens
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Error Handling**: Proper error responses and status codes

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose v8.19.4
- **Authentication**: JSON Web Tokens (jsonwebtoken v9.0.2)
- **Password Hashing**: bcrypt v6.0.0
- **Validation**: @hapi/joi v17.1.1
- **Environment Config**: dotenv v17.2.3
- **Development**: nodemon v3.1.11

## 📁 Project Structure

```
Web_Dev_Backend/
├── index.js                 # Main application entry point
├── package.json             # Project dependencies and scripts
├── validation.js            # Input validation schemas
├── readme.md               # Project documentation
├── models/
│   └── User.js             # User model schema
└── routes/
    ├── auth.js             # Authentication routes (register/login)
    ├── posts.js            # Protected post routes
    └── verifyToken.js      # JWT verification middleware
```

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/pragyandhar/Web_Dev_Backend.git
   cd Web_Dev_Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory (see [Environment Variables](#environment-variables))

4. **Start MongoDB**
   Ensure MongoDB is running locally or have your MongoDB Atlas connection string ready

5. **Run the application**
   ```bash
   npm test
   ```
   The server will start on `http://localhost:3000`

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DB_CONNECT=mongodb://localhost:27017/your-database-name
# Or for MongoDB Atlas:
# DB_CONNECT=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>

TOKEN_SECRET=your_super_secret_jwt_key_here
```

**Important**: 
- Replace `your-database-name` with your desired database name
- Generate a strong, random string for `TOKEN_SECRET` (use a password generator)
- Never commit the `.env` file to version control

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/user/register` | Register a new user | No |
| POST | `/api/user/login` | Login existing user | No |

### Protected Routes

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/posts/` | Access protected content | Yes (JWT) |

## 🔄 Authentication Flow

### 1. User Registration

**Endpoint**: `POST /api/user/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response** (Success - 200):
```json
{
  "user": "64f7a3b2c1e2d4a5b6c7d8e9"
}
```

**Process**:
1. Validate input data (name, email, password)
2. Check if email already exists in database
3. Hash password with bcrypt (10 salt rounds)
4. Save new user to MongoDB
5. Return user ID

### 2. User Login

**Endpoint**: `POST /api/user/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response** (Success - 200):
```json
{
  "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Headers**:
```
auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Process**:
1. Validate input data
2. Verify email exists in database
3. Compare provided password with hashed password
4. Generate JWT token with user ID
5. Return token in header and response body

### 3. Accessing Protected Routes

**Endpoint**: `GET /api/posts/`

**Headers Required**:
```
auth-token: <your-jwt-token>
```

**Response** (Success - 200):
```json
{
  "_id": "64f7a3b2c1e2d4a5b6c7d8e9"
}
```

**Process**:
1. Extract token from request header
2. Verify token signature using TOKEN_SECRET
3. Decode user ID from token
4. Grant access to protected resource

## 💾 Data Models

### User Model

**Collection**: `users`

```javascript
{
  name: {
    type: String,
    required: true,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  date: {
    type: Date,
    default: Date.now
  }
}
```

**Note**: Password is stored as a bcrypt hash, not plain text.

## ✅ Validation Rules

### Registration Validation

- **Name**: 
  - Type: String
  - Minimum length: 6 characters
  - Required: Yes

- **Email**: 
  - Type: String (valid email format)
  - Minimum length: 6 characters
  - Required: Yes

- **Password**: 
  - Type: String
  - Minimum length: 7 characters
  - Required: Yes

### Login Validation

- **Email**: 
  - Type: String (valid email format)
  - Minimum length: 6 characters
  - Required: Yes

- **Password**: 
  - Type: String
  - Minimum length: 7 characters
  - Required: Yes

## 🔒 Security Features

1. **Password Hashing**: 
   - Uses bcrypt with 10 salt rounds
   - Passwords never stored in plain text

2. **JWT Authentication**: 
   - Stateless authentication mechanism
   - Tokens signed with secret key
   - Tokens expire based on configuration

3. **Input Validation**: 
   - All inputs validated using Joi schemas
   - Prevents malformed data from reaching database

4. **Email Uniqueness**: 
   - Prevents duplicate accounts
   - Checks performed before user creation

5. **Error Handling**: 
   - Appropriate HTTP status codes
   - Meaningful error messages without exposing sensitive info

## 📝 Usage Examples

### Using cURL

**Register a new user**:
```bash
curl -X POST http://localhost:3000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"myPassword123"}'
```

**Login**:
```bash
curl -X POST http://localhost:3000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"myPassword123"}'
```

**Access protected route**:
```bash
curl -X GET http://localhost:3000/api/posts \
  -H "auth-token: YOUR_JWT_TOKEN_HERE"
```

### Using Postman

1. **Register**: 
   - Method: POST
   - URL: `http://localhost:3000/api/user/register`
   - Body (JSON): `{"name":"...", "email":"...", "password":"..."}`

2. **Login**: 
   - Method: POST
   - URL: `http://localhost:3000/api/user/login`
   - Body (JSON): `{"email":"...", "password":"..."}`
   - Copy the token from response

3. **Protected Route**: 
   - Method: GET
   - URL: `http://localhost:3000/api/posts`
   - Headers: `auth-token: <paste-token-here>`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Pragyandhar**
- GitHub: [@pragyandhar](https://github.com/pragyandhar)

## 🐛 Issues

If you encounter any issues or have suggestions, please file an issue at:
https://github.com/pragyandhar/Web_Dev_Backend/issues

---

**Note**: This is a learning project demonstrating JWT authentication. For production use, consider additional security measures such as:
- HTTPS encryption
- Rate limiting
- Token refresh mechanism
- Account verification via email
- Password reset functionality
- CORS configuration
- Input sanitization against XSS
- MongoDB injection prevention
