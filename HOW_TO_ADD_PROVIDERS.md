# How to Add Providers - Complete Guide

## Overview
The City Services platform uses a role-based system where users can register as service providers. This guide explains the complete process of adding providers to the system, from user registration to becoming an active service provider.

---

## System Architecture

### User Roles
```
User
├── customer (default role after registration)
├── provider (role changes when registering as service provider)
└── admin (for administrative functions)
```

### Service Provider Data Model
```
ServiceProvider
├── userId (reference to User)
├── categoryId (reference to ServiceCategory)
├── price (hourly rate in USD)
├── experience (years/description of experience)
├── description (about the provider)
├── availability (working hours per day)
└── rating (calculated from bookings)
```

---

## Step-by-Step: How Users Become Providers

### Step 1: User Registration
1. User navigates to **Authentication Page** (`/auth`)
2. Click "Sign Up" to open registration form
3. Fill in required fields:
   - **Name**: Full name
   - **Email**: Valid email address
   - **Phone**: Contact number
   - **Password**: Secure password (encrypted with bcryptjs)
4. Click "Register"
5. User is stored in database with default role: **"customer"**
6. JWT token issued (7-day expiration)

**API Endpoint**: `POST /api/auth/register`

---

### Step 2: User Login
1. User navigates to **Authentication Page** (`/auth`)
2. Click "Login"
3. Enter email and password
4. System validates credentials
5. JWT token issued on successful authentication
6. User data stored in localStorage:
   ```javascript
   {
     "authToken": "jwt_token_here",
     "user": {
       "_id": "user_id",
       "name": "John Doe",
       "email": "john@example.com",
       "role": "customer"
     }
   }
   ```

**API Endpoint**: `POST /api/auth/login`

---

### Step 3: Navigate to Provider Registration
1. Logged-in user clicks **"Become Provider"** in navigation menu
2. System redirects to **Become Provider Page** (`/become-provider`)
3. Page automatically checks if user is already a provider:
   - **If NOT a provider**: Shows "Create Provider Profile" form
   - **If ALREADY a provider**: Shows "Update Provider Profile" form (edit mode)

**API Check**: `GET /api/providers/my/profile` (protected route)

---

### Step 4: Fill Provider Registration Form

#### Required Fields:
1. **Service Category** (dropdown)
   - User selects from list of all available service categories
   - Example: Plumbing, Electrical, Cleaning, etc.
   - **Validation**: Cannot be empty

2. **Hourly Rate** (numeric input)
   - Price in USD per hour
   - Example: 50, 75, 100
   - **Validation**: Must be positive number

3. **Experience** (text input)
   - User's experience description
   - Example: "5 years in residential plumbing"
   - **Validation**: Cannot be empty

#### Optional Fields:
1. **About You** (text area)
   - Detailed description of skills and services
   - Example: "Specializing in pipe repairs and installations"

2. **Availability** (time slots)
   - Add multiple availability slots for different days
   - For each slot:
     - **Day**: Name of day (Monday, Tuesday, etc.)
     - **Start Time**: Beginning of work hours (e.g., 09:00)
     - **End Time**: End of work hours (e.g., 17:00)
   - **Features**:
     - Add additional availability slots with "+ Add Slot" button
     - Remove slots with "Remove" button (if more than 1)
   - Example:
     ```
     Monday: 09:00 - 17:00
     Tuesday: 09:00 - 17:00
     Saturday: 10:00 - 14:00
     ```

---

### Step 5: Submit Provider Profile

#### What Happens On Submit:
1. **Validation Check**:
   - Category, Price, and Experience are required
   - Error message shown if any required field missing

2. **Check for Existing Provider**:
   - System queries for user's existing provider profile
   - **If exists**: Updates the profile (PUT request)
   - **If new**: Creates new provider profile (POST request)

3. **Auto-Update User Role**:
   - When provider profile created, user's role automatically updated to "provider"
   - User document: `{ role: "provider" }`

4. **Success Response**:
   - Provider profile created/updated successfully
   - Automatic redirect to Dashboard (`/dashboard`)
   - Success message displayed: "Profile created/updated successfully!"

**API Endpoints**:
- **Create**: `POST /api/providers` (protected)
- **Update**: `PUT /api/providers/:providerId` (protected)

---

## API Endpoints Reference

### Provider Management APIs

#### 1. Create Provider Profile
```
POST /api/providers
Headers: Authorization: Bearer {token}
Body: {
  "categoryId": "category_id",
  "price": 50,
  "experience": "5 years plumbing",
  "description": "Professional plumbing services",
  "availability": [
    { "day": "Monday", "timeStart": "09:00", "timeEnd": "17:00" },
    { "day": "Saturday", "timeStart": "10:00", "timeEnd": "14:00" }
  ]
}
Response: {
  "_id": "provider_id",
  "userId": "user_id",
  "categoryId": "category_id",
  "price": 50,
  "experience": "5 years plumbing",
  ...
}
```

#### 2. Update Provider Profile
```
PUT /api/providers/:providerId
Headers: Authorization: Bearer {token}
Body: {same as create}
```

#### 3. Get My Provider Profile
```
GET /api/providers/my/profile
Headers: Authorization: Bearer {token}
Response: {provider object or null if not provider}
```

#### 4. Get All Providers
```
GET /api/providers
Response: [{provider1}, {provider2}, ...]
```

#### 5. Get Providers by Category
```
GET /api/providers/category/:categoryId
Response: [providers filtered by category]
```

#### 6. Get Provider Profile (Public)
```
GET /api/providers/profile/:providerId
Response: {provider object}
```

---

## Service Categories

### Available Categories
Service categories define what type of services are available. Categories include:

- **Plumbing**: Water pipe repairs, installation
- **Electrical**: Wiring, panel repairs, lighting
- **Cleaning**: House cleaning, office cleaning
- **Carpentry**: Furniture, repairs, installations
- **Painting**: Interior/exterior painting
- **HVAC**: Heating, ventilation, air conditioning
- **Landscaping**: Garden maintenance, yard work
- *and more...*

### Category Management

#### View All Categories
```
GET /api/categories
Response: [{category1}, {category2}, ...]
```

#### Search Categories
```
GET /api/categories/search?name=plumbing
Response: [matching categories]
```

#### Get Single Category
```
GET /api/categories/:categoryId
Response: {category object}
```

---

## Frontend Workflow

### Component Flow Diagram
```
AuthPage (Login/Register)
    ↓
Dashboard (after login)
    ↓
Navbar "Become Provider" button
    ↓
BecomeProviderPage
    ├─ Checks existing provider: GET /api/providers/my/profile
    │   ├─ If exists → Edit mode (shows "Update Provider Profile")
    │   └─ If not → Create mode (shows "Create Provider Profile")
    │
    ├─ Loads categories: GET /api/categories
    │
    └─ On form submit:
        ├─ POST /api/providers (if new)
        └─ PUT /api/providers/:providerId (if existing)
            ↓
        Redirect to Dashboard with success message
```

### Key Frontend Components

1. **BecomeProviderPage.jsx**
   - Handles provider registration and editing
   - Auto-detects existing provider profile
   - Manages form state and validation
   - Submits to appropriate API endpoint

2. **ProvidersPage.jsx**
   - Displays all providers
   - Filter by service category
   - Show provider details: name, rating, price, experience, availability
   - Booking functionality

3. **CategoriesPage.jsx**
   - Browse all service categories
   - Search categories
   - Click to view providers for specific category
   - Category details: name, description, icon

---

## Complete Provider Profile Example

When provider registers, here's the complete data structure:

```json
{
  "_id": "provider_id_123",
  "userId": {
    "_id": "user_id_456",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "role": "provider"
  },
  "categoryId": {
    "_id": "category_id_789",
    "name": "Plumbing",
    "description": "Professional plumbing services"
  },
  "price": 65,
  "experience": "12 years in residential plumbing",
  "description": "Expert in pipe repairs, installations, and maintenance. Licensed and insured.",
  "availability": [
    {
      "day": "Monday",
      "timeStart": "08:00",
      "timeEnd": "18:00"
    },
    {
      "day": "Wednesday",
      "timeStart": "09:00",
      "timeEnd": "17:00"
    },
    {
      "day": "Saturday",
      "timeStart": "10:00",
      "timeEnd": "14:00"
    }
  ],
  "rating": 4.8,
  "reviewCount": 24,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-20T14:45:00Z"
}
```

---

## Validation Rules

### Provider Registration Validation

| Field | Validation | Error Message |
|-------|-----------|---------------|
| Category | Required, must exist | "Please select a valid category" |
| Price | Required, must be positive number | "Hourly rate must be a positive number" |
| Experience | Required, non-empty string | "Experience cannot be empty" |
| Description | Optional | — |
| Availability | Optional, array of time slots | — |

### Duplicate Prevention
- **System prevents**: Registering as provider for same category twice
- **Error message**: "You are already registered as provider for this category"
- **Fix**: User must update existing profile or choose different category

---

## Security Features

### Authentication
- JWT tokens with 7-day expiration
- Bearer token in Authorization header
- Tokens stored in browser localStorage

### Authorization
- Protected routes require valid JWT token
- Provider update endpoint checks ownership:
  - Can only update own provider profile
  - Returns 401 if unauthorized

### Password Security
- Passwords hashed with bcryptjs
- Never stored in plain text

---

## Troubleshooting

### Issue: Can't find "Become Provider" button
**Solution**: Make sure you're logged in. The button appears in Navbar for authenticated users.

### Issue: "You are already registered as provider for this category"
**Solution**: You're already a provider for that category. Click "Update Provider Profile" to edit instead.

### Issue: Form validation fails
**Solution**: Check that:
- Service Category is selected
- Hourly Rate is a positive number
- Experience field is not empty

### Issue: Profile not saving
**Solution**: 
- Check internet connection
- Verify JWT token hasn't expired (re-login if needed)
- Check browser console for API errors

---

## For Administrators

### Adding New Service Categories

Only admins can add categories (requires authentication):

```
POST /api/categories
Headers: Authorization: Bearer {admin_token}
Body: {
  "name": "Plumbing",
  "description": "Professional plumbing services",
  "keywords": ["pipes", "water", "repair"],
  "icon": "🔧"
}
```

### Viewing All Providers (Admin)
```
GET /api/providers
```

### Filtering Providers by Category
```
GET /api/providers/category/:categoryId
```

---

## Summary

**To add a provider to the City Services platform:**

1. ✅ User registers account
2. ✅ User logs in
3. ✅ User clicks "Become Provider"
4. ✅ Fill out provider form with required fields
5. ✅ Select service category
6. ✅ Set hourly rate and experience
7. ✅ Add availability schedule
8. ✅ Submit form
9. ✅ User's role automatically updated to "provider"
10. ✅ Redirected to dashboard with success message

The provider profile is now live and customers can:
- View the provider on ProvidersPage
- Filter providers by category
- See availability and pricing
- Book services with the provider

---

## Next Steps

- **For Providers**: Update your profile, manage availability, track bookings
- **For Customers**: Browse providers, filter by category, make bookings
- **For Admins**: Add new categories, manage provider listings

