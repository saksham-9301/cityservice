# 🔗 Frontend-Backend Integration Guide

## 📋 Available APIs Summary

### **Base URL:** `http://localhost:5000`

---

## 🔐 Authentication Endpoints

### 1. Register User
```
POST http://localhost:5000/api/auth/register

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "customer",
  "address": "123 Main St"
}

Response: { message, user }
```

### 2. Login User
```
POST http://localhost:5000/api/auth/login

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response: { message, token, user }
```

---

## 🏷️ Services/Categories Endpoints

### 3. Get All Service Categories
```
GET http://localhost:5000/api/categories

Response: [{ _id, name, description, icon, ... }, ...]
```

### 4. Search Categories
```
GET http://localhost:5000/api/categories/search?name=cleaning

Response: [{ _id, name, description, icon, ... }, ...]
```

### 5. Create Category (Admin Only)
```
POST http://localhost:5000/api/categories

Headers:
Authorization: Bearer <token>

Body:
{
  "name": "Cleaning",
  "description": "Home cleaning services",
  "icon": "🧹"
}

Response: { message, category }
```

---

## 👷 Service Providers Endpoints

### 6. Get All Service Providers
```
GET http://localhost:5000/api/providers

Response: 
[
  {
    _id,
    userId: { name, email, phone, ... },
    categoryId: { name, ... },
    price,
    experience,
    description,
    availability: [{ day, timeStart, timeEnd }, ...],
    rating,
    ...
  },
  ...
]
```

### 7. Create Service Provider
```
POST http://localhost:5000/api/providers

Body:
{
  "userId": "user_id",
  "categoryId": "category_id",
  "price": 50,
  "experience": "5 years",
  "description": "Expert service provider",
  "availability": [
    { "day": "Monday", "timeStart": "09:00", "timeEnd": "17:00" },
    { "day": "Tuesday", "timeStart": "09:00", "timeEnd": "17:00" }
  ]
}

Response: { message, provider }
```

---

## 📅 Booking Endpoints

### 8. Create Booking
```
POST http://localhost:5000/api/bookings

Headers:
Authorization: Bearer <token>

Body:
{
  "providerId": "provider_id",
  "date": "2025-12-15",
  "timeSlot": "10:00-11:00"
}

Response: { message, booking }
```

### 9. Get User's Bookings
```
GET http://localhost:5000/api/bookings/my

Headers:
Authorization: Bearer <token>

Response:
[
  {
    _id,
    userId,
    providerId: { userId: { name, ... }, price, rating, ... },
    date,
    timeSlot,
    status: "pending|accepted|completed|cancelled",
    ...
  },
  ...
]
```

---

## 🛠️ Frontend Implementation Examples

### Setup API Service (React)
```javascript
// api.js
export const API_BASE = 'http://localhost:5000/api';

// Auth
export async function registerUser(userData) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
}

// Categories
export async function getCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  return res.json();
}

export async function searchCategories(query) {
  const res = await fetch(`${API_BASE}/categories/search?name=${query}`);
  return res.json();
}

// Providers
export async function getProviders() {
  const res = await fetch(`${API_BASE}/providers`);
  return res.json();
}

export async function createProvider(providerData) {
  const token = localStorage.getItem('authToken');
  const res = await fetch(`${API_BASE}/providers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(providerData)
  });
  return res.json();
}

// Bookings
export async function createBooking(bookingData) {
  const token = localStorage.getItem('authToken');
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(bookingData)
  });
  return res.json();
}

export async function getUserBookings() {
  const token = localStorage.getItem('authToken');
  const res = await fetch(`${API_BASE}/bookings/my`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}
```

---

## 📦 Integration Points for Frontend Components

### Navbar/Auth Component
```javascript
// Use: loginUser(), registerUser()
// Store: authToken in localStorage
// Header: Add token to all authenticated requests
```

### Services Section (ServicesWeOffer)
```javascript
// Use: getCategories()
// Display: Service cards from categories
// On Load: fetch and render all services
```

### Service Provider Listing
```javascript
// Use: getProviders()
// Display: Provider cards with details
// Filter: By category using categoryId
```

### Booking Component (New)
```javascript
// Use: createBooking()
// Require: User to be logged in
// Send: providerId, date, timeSlot
```

### User Bookings Page (New)
```javascript
// Use: getUserBookings()
// Display: User's past and upcoming bookings
// Status: Show booking status (pending, accepted, completed, cancelled)
```

---

## 🔒 Token Management

```javascript
// After Login
localStorage.setItem('authToken', token);

// For Authenticated Requests
const token = localStorage.getItem('authToken');
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

// Logout
localStorage.removeItem('authToken');
localStorage.removeItem('user');
```

---

## 🚀 Quick Start

1. **Start Backend:**
   ```bash
   cd server
   npm install
   npm start
   ```
   Server runs on: `http://localhost:5000`

2. **Test API with Postman/cURL:**
   ```bash
   # Test server
   curl http://localhost:5000
   # Response: "API is running..."
   ```

3. **Integrate with Frontend:**
   - Use API_BASE URL in your service file
   - Store token in localStorage after login
   - Add token to auth-required endpoints

---

## 📊 Data Models at a Glance

**User:**
```javascript
{
  _id, name, email, password, phone, role,
  address, profileImage, timestamps
}
```

**ServiceProvider:**
```javascript
{
  _id, userId, categoryId, price, experience,
  description, availability[], rating, timestamps
}
```

**ServiceCategory:**
```javascript
{
  _id, name, description, icon, timestamps
}
```

**Booking:**
```javascript
{
  _id, userId, providerId, date, timeSlot,
  status: "pending|accepted|completed|cancelled",
  timestamps
}
```

---

**All endpoints are ready to integrate!** 🎉
