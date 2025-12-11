# Quick API Testing Guide

## Before Testing
- Ensure backend is running: `npm start` (in `server` folder)
- Ensure frontend is running: `npm run dev` (in `frontend` folder)
- MongoDB Atlas must be connected

## API Test Commands

### Using Postman or curl

#### 1. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890",
    "role": "customer",
    "address": "123 Main St"
  }'
```

**Expected Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "role": "customer",
    "address": "123 Main St"
  }
}
```

---

#### 2. Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "message": "Login success",
  "token": "eyJhbGc...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

**Save the token for authenticated requests**

---

#### 3. Get Categories
```bash
curl -X GET http://localhost:5000/api/categories
```

**Expected Response:**
```json
[
  {
    "_id": "...",
    "name": "Plumbing",
    "description": "Plumbing services",
    "keywords": ["pipes", "water"]
  },
  ...
]
```

---

#### 4. Search Categories
```bash
curl -X GET "http://localhost:5000/api/categories/search?name=plumb"
```

---

#### 5. Get Providers
```bash
curl -X GET http://localhost:5000/api/providers
```

**Expected Response:**
```json
[
  {
    "_id": "...",
    "userId": { /* user details */ },
    "categoryId": { /* category details */ },
    "price": 50,
    "experience": "5 years",
    "description": "Professional plumber",
    "availability": [...]
  },
  ...
]
```

---

#### 6. Create Provider (Authenticated)
```bash
curl -X POST http://localhost:5000/api/providers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "categoryId": "CATEGORY_ID",
    "price": 50,
    "experience": "5 years",
    "description": "Professional service provider",
    "availability": [
      {
        "day": "Monday",
        "timeStart": "09:00",
        "timeEnd": "17:00"
      }
    ]
  }'
```

---

#### 7. Create Booking (Authenticated)
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "providerId": "PROVIDER_ID",
    "date": "2025-12-20",
    "time": "10:00",
    "amount": 50
  }'
```

---

#### 8. Get My Bookings (Authenticated)
```bash
curl -X GET http://localhost:5000/api/bookings/my \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## UI Testing

### Registration Test
1. Open http://localhost:5173
2. Click "Login / SignUp" button
3. Click "Register" tab
4. Fill in all fields
5. Submit form
6. Should show success message and switch to login

### Login Test
1. Enter registered email
2. Enter password
3. Click Login
4. Should show success and redirect to home
5. Navbar should display user greeting

### Navigation Test
1. **Logged Out**: See "Login / SignUp" button
2. **Logged In**: See user greeting and "Logout" button
3. **Categories Link**: Navigate to categories list
4. **Providers Link**: Navigate to providers list
5. **Dashboard Link**: (Only visible when logged in)
6. **Become Provider Link**: (Only visible when logged in)

### Categories Page Test
1. Navigate to `/categories`
2. Should display all categories
3. Search should filter categories

### Providers Page Test
1. Navigate to `/providers`
2. Should display provider cards
3. "Book Now" button should open modal

### Dashboard Test (Protected)
1. Must be logged in first
2. Navigate to `/dashboard`
3. Should show user's bookings
4. Display booking status and details

### Become Provider Test (Protected)
1. Must be logged in first
2. Navigate to `/become-provider`
3. Should display form with fields:
   - Category dropdown
   - Price input
   - Experience textarea
   - Description textarea
   - Availability schedule

---

## Troubleshooting

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Fix**: Verify CORS is enabled in `server/index.js`

### 401 Unauthorized
```
{
  "message": "Access denied"
}
```
**Fix**: 
- Add Authorization header with token
- Format: `Authorization: Bearer <token>`

### Network Error
```
Failed to fetch: http://localhost:5000/api/auth/register
```
**Fix**: 
- Ensure backend is running on port 5000
- Check for connection errors in server logs

### Invalid Token
```
{
  "message": "Invalid token"
}
```
**Fix**: 
- Get a new token by logging in again
- Token expires after 7 days
- Clear localStorage and login fresh

---

## Response Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Request completed successfully |
| 400 | Bad Request | Check data format and required fields |
| 401 | Unauthorized | Add valid Authorization header |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Check server logs for details |

---

## Important Notes

1. **Token Storage**: Keep token in localStorage (done automatically)
2. **Token Expiry**: 7 days (re-login if expired)
3. **Password**: Hashed with bcryptjs (never stored plaintext)
4. **CORS Origin**: Set to `http://localhost:5173`
5. **Database**: Uses MongoDB Atlas

---

**All APIs are functional and ready for testing!** ✅
