# Complete API Documentation - City Services Platform

## Base URL
```
http://localhost:5000/api
```

---

## Authentication Endpoints

### 1. User Registration
```
POST /api/auth/register

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "password": "securePassword123"
}

Response (201):
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "role": "customer",
  "token": "jwt_token_7_day_expiry"
}
```

### 2. User Login
```
POST /api/auth/login

Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "role": "customer",
  "token": "jwt_token_7_day_expiry"
}

Error (401):
{
  "message": "Invalid credentials"
}
```

---

## Service Category Endpoints

### 1. Get All Categories
```
GET /api/categories

Response (200):
[
  {
    "_id": "cat_1",
    "name": "Plumbing",
    "description": "Professional plumbing services",
    "keywords": ["pipes", "water", "repair"],
    "icon": "🔧"
  },
  {
    "_id": "cat_2",
    "name": "Electrical",
    "description": "Electrical services",
    "keywords": ["wiring", "installation"],
    "icon": "⚡"
  }
]
```

### 2. Get Single Category
```
GET /api/categories/:categoryId

Response (200):
{
  "_id": "cat_1",
  "name": "Plumbing",
  "description": "Professional plumbing services",
  "keywords": ["pipes", "water", "repair"],
  "icon": "🔧",
  "createdAt": "2024-01-10T00:00:00Z"
}

Error (404):
{
  "message": "Category not found"
}
```

### 3. Search Categories
```
GET /api/categories/search?name=plumbing

Response (200):
[
  {
    "_id": "cat_1",
    "name": "Plumbing",
    "description": "Professional plumbing services",
    "keywords": ["pipes", "water", "repair"]
  }
]
```

### 4. Create Category (Admin Only)
```
POST /api/categories
Headers: Authorization: Bearer {token}

Body:
{
  "name": "Plumbing",
  "description": "Professional plumbing services",
  "keywords": ["pipes", "water", "repair"],
  "icon": "🔧"
}

Response (201):
{
  "_id": "cat_1",
  "name": "Plumbing",
  "description": "Professional plumbing services",
  "keywords": ["pipes", "water", "repair"],
  "icon": "🔧"
}

Error (409):
{
  "message": "Category already exists"
}
```

### 5. Update Category (Admin Only)
```
PUT /api/categories/:categoryId
Headers: Authorization: Bearer {token}

Body: {
  "name": "Updated Plumbing",
  "description": "Updated description",
  "keywords": ["pipes", "water", "repair", "installation"]
}

Response (200):
{
  "_id": "cat_1",
  "name": "Updated Plumbing",
  "description": "Updated description",
  "keywords": ["pipes", "water", "repair", "installation"]
}
```

### 6. Delete Category (Admin Only)
```
DELETE /api/categories/:categoryId
Headers: Authorization: Bearer {token}

Response (200):
{
  "message": "Category deleted successfully"
}
```

---

## Service Provider Endpoints

### 1. Create Provider Profile
```
POST /api/providers
Headers: Authorization: Bearer {token}

Body:
{
  "categoryId": "cat_1",
  "price": 65,
  "experience": "12 years in plumbing",
  "description": "Expert in pipe repairs and installations",
  "availability": [
    {
      "day": "Monday",
      "timeStart": "08:00",
      "timeEnd": "18:00"
    },
    {
      "day": "Saturday",
      "timeStart": "10:00",
      "timeEnd": "14:00"
    }
  ]
}

Response (201):
{
  "_id": "provider_1",
  "userId": "user_id",
  "categoryId": "cat_1",
  "price": 65,
  "experience": "12 years in plumbing",
  "description": "Expert in pipe repairs and installations",
  "availability": [
    {
      "day": "Monday",
      "timeStart": "08:00",
      "timeEnd": "18:00"
    },
    {
      "day": "Saturday",
      "timeStart": "10:00",
      "timeEnd": "14:00"
    }
  ],
  "rating": 0,
  "createdAt": "2024-01-20T00:00:00Z"
}

Error (400):
{
  "message": "You are already registered as a provider for this category"
}
```

### 2. Get All Providers
```
GET /api/providers

Response (200):
[
  {
    "_id": "provider_1",
    "userId": {
      "_id": "user_1",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "555-1234"
    },
    "categoryId": {
      "_id": "cat_1",
      "name": "Plumbing"
    },
    "price": 65,
    "experience": "12 years in plumbing",
    "description": "Expert in pipe repairs",
    "rating": 4.8,
    "availability": [...]
  }
]
```

### 3. Get Providers by Category
```
GET /api/providers/category/:categoryId

Response (200):
[
  {
    "_id": "provider_1",
    "userId": {...},
    "categoryId": {...},
    "price": 65,
    "experience": "12 years in plumbing",
    "rating": 4.8
  },
  {
    "_id": "provider_2",
    "userId": {...},
    "categoryId": {...},
    "price": 55,
    "experience": "8 years in plumbing",
    "rating": 4.5
  }
]
```

### 4. Get Single Provider Profile
```
GET /api/providers/profile/:providerId

Response (200):
{
  "_id": "provider_1",
  "userId": {
    "_id": "user_1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "categoryId": {
    "_id": "cat_1",
    "name": "Plumbing"
  },
  "price": 65,
  "experience": "12 years in plumbing",
  "description": "Expert in pipe repairs",
  "availability": [...]
}
```

### 5. Get My Provider Profile
```
GET /api/providers/my/profile
Headers: Authorization: Bearer {token}

Response (200):
{
  "_id": "provider_1",
  "userId": "user_id",
  "categoryId": "cat_1",
  "price": 65,
  "experience": "12 years in plumbing",
  ...
}

Response (null) - if user is not a provider:
null

Error (401):
{
  "message": "Unauthorized"
}
```

### 6. Update Provider Profile
```
PUT /api/providers/:providerId
Headers: Authorization: Bearer {token}

Body: {
  "price": 75,
  "experience": "15 years in plumbing",
  "description": "Updated description",
  "availability": [...]
}

Response (200):
{
  "_id": "provider_1",
  "userId": "user_id",
  "categoryId": "cat_1",
  "price": 75,
  "experience": "15 years in plumbing",
  "description": "Updated description",
  ...
}

Error (401):
{
  "message": "Unauthorized - You can only update your own profile"
}

Error (404):
{
  "message": "Provider not found"
}
```

---

## Booking Endpoints

### 1. Create Booking
```
POST /api/bookings
Headers: Authorization: Bearer {token}

Body:
{
  "providerId": "provider_1",
  "serviceDate": "2024-02-15",
  "serviceTime": "10:00",
  "description": "Need to fix kitchen sink"
}

Response (201):
{
  "_id": "booking_1",
  "customerId": "user_id",
  "providerId": "provider_1",
  "serviceDate": "2024-02-15",
  "serviceTime": "10:00",
  "description": "Need to fix kitchen sink",
  "status": "pending",
  "createdAt": "2024-01-20T00:00:00Z"
}
```

### 2. Get My Bookings
```
GET /api/bookings/my
Headers: Authorization: Bearer {token}

Response (200):
[
  {
    "_id": "booking_1",
    "providerId": {
      "_id": "provider_1",
      "userId": {
        "name": "John Doe"
      }
    },
    "serviceDate": "2024-02-15",
    "serviceTime": "10:00",
    "status": "pending"
  },
  {
    "_id": "booking_2",
    "providerId": {...},
    "serviceDate": "2024-02-10",
    "serviceTime": "14:00",
    "status": "completed"
  }
]
```

---

## Error Responses

### 401 Unauthorized
```
{
  "message": "Unauthorized - Invalid or missing token"
}
```

### 400 Bad Request
```
{
  "message": "Validation error - [specific field] is required"
}
```

### 404 Not Found
```
{
  "message": "Resource not found"
}
```

### 409 Conflict
```
{
  "message": "Resource already exists"
}
```

### 500 Server Error
```
{
  "message": "Internal server error"
}
```

---

## Authentication Header Format

All protected routes require:
```
Authorization: Bearer <jwt_token>
```

Example:
```
GET /api/providers/my/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Request/Response Examples

### Complete Flow: User → Provider

#### 1. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "password": "pass123"
  }'
```

#### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "pass123"
  }'
```

#### 3. Get All Categories
```bash
curl -X GET http://localhost:5000/api/categories
```

#### 4. Create Provider Profile
```bash
curl -X POST http://localhost:5000/api/providers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token_from_login}" \
  -d '{
    "categoryId": "cat_1",
    "price": 65,
    "experience": "12 years",
    "description": "Expert plumber",
    "availability": [
      {
        "day": "Monday",
        "timeStart": "08:00",
        "timeEnd": "18:00"
      }
    ]
  }'
```

#### 5. Get My Provider Profile
```bash
curl -X GET http://localhost:5000/api/providers/my/profile \
  -H "Authorization: Bearer {token_from_login}"
```

---

## Data Models

### User
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  phone: String,
  password: String (hashed with bcryptjs),
  role: String (enum: ['customer', 'provider', 'admin'], default: 'customer'),
  createdAt: Date,
  updatedAt: Date
}
```

### ServiceCategory
```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  description: String,
  keywords: [String],
  icon: String,
  createdAt: Date,
  updatedAt: Date
}
```

### ServiceProvider
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  categoryId: ObjectId (ref: ServiceCategory, required),
  price: Number (required, positive),
  experience: String (required),
  description: String,
  availability: [{
    day: String,
    timeStart: String,
    timeEnd: String
  }],
  rating: Number (default: 0),
  reviewCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Booking
```javascript
{
  _id: ObjectId,
  customerId: ObjectId (ref: User, required),
  providerId: ObjectId (ref: ServiceProvider, required),
  serviceDate: Date (required),
  serviceTime: String,
  description: String,
  status: String (enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending'),
  totalPrice: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Status Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required or failed |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 500 | Server Error | Internal server error |

---

## Rate Limiting
Currently: No rate limiting applied

---

## CORS Configuration
```
Origin: http://localhost:5173 (Frontend)
Methods: GET, POST, PUT, DELETE
Headers: Content-Type, Authorization
```

---

## Testing the API

### Option 1: Using cURL
```bash
curl -X GET http://localhost:5000/api/categories
```

### Option 2: Using Postman
1. Import endpoints
2. Set base URL: `http://localhost:5000/api`
3. Test each endpoint with sample data

### Option 3: Using Frontend
Visit the application at `http://localhost:5173` and test through UI

---

## Common Issues

### 401 Unauthorized
- Token expired (re-login)
- Invalid token format (missing "Bearer")
- Token not sent in headers

### 400 Bad Request
- Missing required fields
- Invalid data type
- Invalid categoryId reference

### 404 Not Found
- Invalid resource ID
- Resource was deleted
- Wrong API endpoint

---

## Support

For API issues or questions:
1. Check request format matches documentation
2. Verify JWT token is valid
3. Check browser console for errors
4. Review backend console logs

