# 🔌 CityService Backend API Documentation

## 📍 Base URL
```
http://localhost:5000
```

---

## 🔐 Authentication APIs

### 1. **User Registration**
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890",
  "role": "customer",           // enum: ["customer", "provider", "admin"]
  "address": "123 Main St, City"
}
```

**Response (Success):**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "customer",
    "address": "123 Main St, City",
    "createdAt": "2025-12-09T10:00:00Z"
  }
}
```

**Response (Error):**
```json
{
  "message": "Email already exists"
}
```

---

### 2. **User Login**
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Success):**
```json
{
  "message": "Login success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

**Response (Error):**
```json
{
  "message": "Invalid credentials"
}
```

**Token Usage:** Include in subsequent requests
```
Header: Authorization: Bearer <token>
```

---

## 🏷️ Category/Service APIs

### 3. **Get All Service Categories**
**Endpoint:** `GET /api/categories`

**Request:** No body required

**Response (Success):**
```json
[
  {
    "_id": "category_id_1",
    "name": "Cleaning",
    "description": "Home and office cleaning services",
    "icon": "🧹",
    "createdAt": "2025-12-09T10:00:00Z"
  },
  {
    "_id": "category_id_2",
    "name": "Plumbing",
    "description": "Plumbing repair and installation",
    "icon": "🔧",
    "createdAt": "2025-12-09T10:00:00Z"
  }
]
```

---

### 4. **Search Service Categories**
**Endpoint:** `GET /api/categories/search?name=cleaning`

**Query Parameters:**
- `name` (required): Search term

**Response (Success):**
```json
[
  {
    "_id": "category_id_1",
    "name": "Cleaning",
    "description": "Home and office cleaning services",
    "icon": "🧹"
  }
]
```

**Response (Error):**
```json
{
  "message": "Search term is required"
}
```

---

### 5. **Create Service Category** (Admin Only)
**Endpoint:** `POST /api/categories`

**Request Body:**
```json
{
  "name": "Electrical",
  "description": "Electrical repair and installation",
  "icon": "⚡"
}
```

**Response (Success):**
```json
{
  "message": "Category created",
  "category": {
    "_id": "category_id_3",
    "name": "Electrical",
    "description": "Electrical repair and installation",
    "icon": "⚡",
    "createdAt": "2025-12-09T10:00:00Z"
  }
}
```

---

## 👷 Service Provider APIs

### 6. **Get All Service Providers**
**Endpoint:** `GET /api/providers`

**Request:** No body required

**Response (Success):**
```json
[
  {
    "_id": "provider_id_1",
    "userId": {
      "_id": "user_id_1",
      "name": "Mike Johnson",
      "email": "mike@example.com",
      "phone": "+1234567890"
    },
    "categoryId": {
      "_id": "category_id_1",
      "name": "Plumbing"
    },
    "price": 50,
    "experience": "5 years",
    "description": "Expert plumber with excellent service",
    "availability": [
      {
        "day": "Monday",
        "timeStart": "09:00",
        "timeEnd": "17:00"
      },
      {
        "day": "Tuesday",
        "timeStart": "09:00",
        "timeEnd": "17:00"
      }
    ],
    "rating": 4.8,
    "createdAt": "2025-12-09T10:00:00Z"
  }
]
```

---

### 7. **Create Service Provider**
**Endpoint:** `POST /api/providers`

**Request Body:**
```json
{
  "userId": "user_id_here",
  "categoryId": "category_id_here",
  "price": 50,
  "experience": "5 years",
  "description": "Expert plumber with excellent service",
  "availability": [
    {
      "day": "Monday",
      "timeStart": "09:00",
      "timeEnd": "17:00"
    },
    {
      "day": "Tuesday",
      "timeStart": "09:00",
      "timeEnd": "17:00"
    }
  ]
}
```

**Response (Success):**
```json
{
  "message": "Provider added",
  "provider": {
    "_id": "provider_id_1",
    "userId": "user_id_here",
    "categoryId": "category_id_here",
    "price": 50,
    "experience": "5 years",
    "description": "Expert plumber with excellent service",
    "availability": [...],
    "rating": 0,
    "createdAt": "2025-12-09T10:00:00Z"
  }
}
```

---

## 📅 Booking APIs

### 8. **Create Booking**
**Endpoint:** `POST /api/bookings`

**Headers Required:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "providerId": "provider_id_here",
  "date": "2025-12-15",
  "timeSlot": "10:00-11:00"
}
```

**Response (Success):**
```json
{
  "message": "Booking created",
  "booking": {
    "_id": "booking_id_1",
    "userId": "user_id_here",
    "providerId": "provider_id_here",
    "date": "2025-12-15",
    "timeSlot": "10:00-11:00",
    "status": "pending",
    "createdAt": "2025-12-09T10:00:00Z"
  }
}
```

**Response (Error):**
```json
{
  "message": "Authentication required"
}
```

---

### 9. **Get User's Bookings**
**Endpoint:** `GET /api/bookings/my`

**Headers Required:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
[
  {
    "_id": "booking_id_1",
    "userId": "user_id_here",
    "providerId": {
      "_id": "provider_id_1",
      "userId": {
        "name": "Mike Johnson"
      },
      "price": 50,
      "rating": 4.8
    },
    "date": "2025-12-15",
    "timeSlot": "10:00-11:00",
    "status": "pending",
    "createdAt": "2025-12-09T10:00:00Z"
  }
]
```

---

## 📊 API Summary Table

| Method | Endpoint | Purpose | Auth Required | Response |
|--------|----------|---------|---------------|----------|
| POST | `/api/auth/register` | Register new user | ❌ | User object + status |
| POST | `/api/auth/login` | Login user | ❌ | Token + User object |
| GET | `/api/categories` | Get all categories | ❌ | Array of categories |
| GET | `/api/categories/search` | Search categories | ❌ | Array of matching categories |
| POST | `/api/categories` | Create category | ✅ (Admin) | Created category object |
| GET | `/api/providers` | Get all providers | ❌ | Array of providers |
| POST | `/api/providers` | Create provider | ✅ | Provider object |
| POST | `/api/bookings` | Create booking | ✅ | Booking object |
| GET | `/api/bookings/my` | Get user bookings | ✅ | Array of user bookings |

---

## 🔗 Frontend Integration URLs

### Environment Setup
Create a `.env` file in your frontend folder:
```
VITE_API_BASE_URL=http://localhost:5000
```

### API Service Example (React)
```javascript
const API_BASE = 'http://localhost:5000/api';

// Register
export const registerUser = (data) => 
  fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json());

// Login
export const loginUser = (data) => 
  fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json());

// Get Categories
export const getCategories = () => 
  fetch(`${API_BASE}/categories`).then(r => r.json());

// Get Providers
export const getProviders = () => 
  fetch(`${API_BASE}/providers`).then(r => r.json());

// Create Booking
export const createBooking = (token, data) => 
  fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }).then(r => r.json());

// Get User Bookings
export const getUserBookings = (token) => 
  fetch(`${API_BASE}/bookings/my`, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(r => r.json());
```

---

## 🔐 Authentication Flow

```
1. User registers: POST /api/auth/register
   ↓
2. Receive user object (user not yet logged in)
   ↓
3. User logs in: POST /api/auth/login
   ↓
4. Receive JWT token (valid for 7 days)
   ↓
5. Store token in localStorage
   ↓
6. Include token in Authorization header for protected routes
   ↓
7. Access protected endpoints: /api/bookings, etc.
```

---

## ⚠️ Important Notes

1. **Token Storage:** Save JWT token in localStorage after login
2. **Token Expiry:** Token expires in 7 days - implement refresh mechanism
3. **Auth Middleware:** Some endpoints require authentication (see auth required column)
4. **CORS:** If frontend is on different domain, configure CORS in server
5. **Error Handling:** All errors return status codes (400, 500, etc.)
6. **Roles:** User roles: "customer", "provider", "admin"

---

## 🚀 Server Status
- **Port:** 5000
- **Start Command:** `npm start` or `node index.js`
- **Database:** MongoDB (configured in connectDB.js)

---

**Ready to integrate with frontend!** 🎉
