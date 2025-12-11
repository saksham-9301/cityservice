# Complete Testing Guide - City Services Application

## Current Status
- ✅ Backend Server: Running on port 5000
- ✅ Frontend Server: Running on port 5174
- ✅ Database: MongoDB Atlas Connected
- ✅ Service Categories: 8 categories seeded (Cleaning, Plumbing, Electrical, Painting, Carpentry, HVAC, Landscaping, Pest Control)

---

## Testing Flows

### 1. Homepage Services Test
**URL**: `http://localhost:5174/`

**What to test**:
- [ ] Services displayed from backend (not hardcoded)
- [ ] 8 service cards visible
- [ ] Each card shows: Icon, Name, Description
- [ ] "See Providers" button visible (no "Book Now" or price)
- [ ] Click "See Providers" → Navigates to providers page with category filter

**Expected Result**: 
- Services load dynamically from database
- Categories: Cleaning, Plumbing, Electrical, Painting, Carpentry, HVAC, Landscaping, Pest Control

---

### 2. User Registration Test
**URL**: `http://localhost:5174/auth`

**Steps**:
1. Click "Sign Up"
2. Fill form:
   - Name: "John Provider"
   - Email: "johnprovider@test.com"
   - Phone: "555-1234"
   - Password: "password123"
3. Click "Register"

**Expected Result**:
- [ ] Success message displayed
- [ ] Redirected to dashboard or home
- [ ] User stored in database with role: "customer"
- [ ] JWT token generated and stored in localStorage

**API Called**: `POST /api/auth/register`

---

### 3. User Login Test
**URL**: `http://localhost:5174/auth`

**Steps**:
1. Click "Login"
2. Enter credentials:
   - Email: "johnprovider@test.com"
   - Password: "password123"
3. Click "Login"

**Expected Result**:
- [ ] Success message
- [ ] Redirected to dashboard
- [ ] User data stored in localStorage
- [ ] Navbar shows user name and logout icon
- [ ] "Become Provider" button visible in Navbar

**API Called**: `POST /api/auth/login`

---

### 4. Become Provider Test (Create Mode)
**URL**: `http://localhost:5174/become-provider`

**Prerequisites**: 
- User must be logged in
- User should NOT have a provider profile yet

**Steps**:
1. Click "Become Provider" in Navbar
2. Form should show "Create Provider Profile"
3. Fill form:
   - Service Category: Select "Plumbing"
   - Hourly Rate: 65
   - Experience: "15 years in residential plumbing"
   - About You: "Expert in pipe repairs and installations"
   - Availability: Keep default (Monday-Tuesday, 09:00-17:00)
4. Click "Create Profile"

**Expected Results**:
- [ ] Success message: "Profile created successfully!"
- [ ] Redirected to dashboard
- [ ] User role auto-updated to "provider" in database
- [ ] Provider profile created with provided data

**APIs Called**:
- `GET /api/providers/my/profile` (check existing)
- `POST /api/providers` (create new)

---

### 5. Edit Provider Profile Test
**URL**: `http://localhost:5174/become-provider`

**Prerequisites**: 
- User must be logged in
- User MUST have an existing provider profile

**Steps**:
1. Click "Become Provider" in Navbar again
2. Form should show "Update Provider Profile"
3. Form should be pre-filled with existing data
4. Make changes:
   - Change Hourly Rate: 75
   - Update Experience: "18 years in residential and commercial plumbing"
5. Click "Update Profile"

**Expected Results**:
- [ ] Success message: "Profile updated successfully!"
- [ ] Redirected to dashboard
- [ ] Provider profile updated in database
- [ ] Changes reflected when visiting page again

**APIs Called**:
- `GET /api/providers/my/profile` (fetch existing)
- `PUT /api/providers/:providerId` (update)

---

### 6. Browse All Services Test
**URL**: `http://localhost:5174/categories`

**Steps**:
1. Navigate to Categories page
2. See all 8 service categories

**Expected Results**:
- [ ] All 8 categories displayed
- [ ] Search functionality works
- [ ] Click category → Navigate to providers page
- [ ] Category filter applied on providers page

**APIs Called**: `GET /api/categories`

---

### 7. View Providers by Service Test
**URL**: `http://localhost:5174/providers?category=<categoryId>&name=Plumbing`

**Steps**:
1. From homepage, click "See Providers" on Plumbing service
2. OR From categories page, click "View Providers" on Plumbing card

**Expected Results**:
- [ ] Providers page loads
- [ ] "Plumbing" category filter is selected (highlighted button)
- [ ] Shows all plumbing providers
- [ ] Can switch between category filters
- [ ] "All Services" button shows all providers

**APIs Called**: 
- `GET /api/categories` (load filter options)
- `GET /api/providers/category/:categoryId` (fetch filtered providers)
- `GET /api/providers` (fetch all providers)

---

### 8. View All Providers Test
**URL**: `http://localhost:5174/providers`

**Steps**:
1. Navigate to Providers page
2. See category filter buttons at top
3. Click different categories

**Expected Results**:
- [ ] All providers visible initially
- [ ] Category buttons change provider list
- [ ] Each provider shows: name, category, experience, rating, availability
- [ ] Provider details from backend

**APIs Called**: `GET /api/providers`

---

## API Testing Guide

### Test via Browser Console
Open browser console (F12) and use fetch API:

```javascript
// Get all categories
fetch('http://localhost:5000/api/categories')
  .then(r => r.json())
  .then(d => console.log(d))

// Get providers for specific category
fetch('http://localhost:5000/api/providers/category/CATEGORY_ID')
  .then(r => r.json())
  .then(d => console.log(d))

// Get all providers
fetch('http://localhost:5000/api/providers')
  .then(r => r.json())
  .then(d => console.log(d))

// Get logged-in user's provider profile
const token = localStorage.getItem('authToken')
fetch('http://localhost:5000/api/providers/my/profile', {
  headers: { 'Authorization': `Bearer ${token}` }
})
  .then(r => r.json())
  .then(d => console.log(d))
```

---

## Common Issues & Solutions

### Issue: Services not loading on homepage
**Check**:
1. Is backend running? (Port 5000)
2. Are categories seeded? Run: `node seedCategories.js`
3. Check browser console for errors
4. Check backend console for request logs

### Issue: Provider registration fails
**Check**:
1. User must be logged in (check localStorage for authToken)
2. Category ID must be valid (get from `/api/categories`)
3. All required fields filled
4. JWT token not expired (re-login if needed)

### Issue: Cannot see "See Providers" button
**Check**:
1. Services loaded from backend (check console)
2. Component re-rendered after fetch
3. Button styling not hidden

### Issue: Providers not showing
**Check**:
1. Are there any providers in database? 
2. Check category ID in URL matches database
3. Backend `/api/providers` endpoint working
4. Provider data includes categoryId reference

---

## Database Verification

### Check Categories in Database
```javascript
// In MongoDB Atlas or Compass
db.servicecategories.find({})
```

Expected output: 8 documents with fields: name, description, keywords, icon

### Check Providers in Database
```javascript
// In MongoDB Atlas or Compass
db.serviceproviders.find({})
```

Expected: Provider documents with userId, categoryId, price, experience, description, availability

### Check Users in Database
```javascript
// In MongoDB Atlas or Compass
db.users.find({})
```

Expected: User documents with role updated to "provider" after registration

---

## Complete User Journey Test

Follow this complete flow to test everything:

1. **Register** → new user "jane@test.com"
2. **Login** → with jane's credentials
3. **Homepage** → See 8 service categories
4. **Click Service** → "See Providers" on Plumbing
5. **Filter Providers** → Switch between categories
6. **Become Provider** → Register as Plumbing provider (Hourly rate: $50)
7. **Update Profile** → Change rate to $60
8. **Check Categories** → Browse all services
9. **View Providers** → Should now see yourself as provider
10. **Logout** → Click logout icon
11. **Login as different user** → See providers from first user
12. **Book Service** → (Optional: implement booking in future)

---

## Performance Checklist

- [ ] Services load < 1 second
- [ ] No console errors
- [ ] API responses < 500ms
- [ ] Smooth animations/transitions
- [ ] Responsive on mobile/tablet
- [ ] Form validation working
- [ ] Error messages clear

---

## API Status Check

Run this test to verify all endpoints:

```bash
# Categories
curl http://localhost:5000/api/categories

# Providers
curl http://localhost:5000/api/providers

# Auth (with email/password)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass"}'
```

All endpoints should return valid JSON responses.

---

## Deployment Checklist

Before production:

- [ ] All APIs tested and working
- [ ] Database backup created
- [ ] Environment variables configured
- [ ] CORS settings updated for production URL
- [ ] Error handling working
- [ ] All user workflows tested
- [ ] Security: JWT tokens working
- [ ] Security: Passwords hashed
- [ ] Performance: No N+1 queries
- [ ] Monitoring: Logs configured

