# 🧪 Quick Testing Guide

## 🚀 Getting Started

### Prerequisites
1. **Backend running**: `cd server && npm start`
   - Should be running on `http://localhost:5000`
2. **Frontend running**: `cd frontend && npm run dev`
   - Should be running on `http://localhost:5175` (or 5174/5173)

---

## 📋 Test Scenarios

### Test 1: User Registration ✅
**Route**: `/auth`

1. Click "Register" tab
2. Fill form:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
   - Phone: `+1234567890`
   - Address: `123 Main St`
   - Role: `Customer`
3. Click "Sign Up"
4. Expected: Success message → Auto-switch to Login

### Test 2: User Login ✅
**Route**: `/auth`

1. Click "Login" tab
2. Fill form:
   - Email: `john@example.com`
   - Password: `password123`
3. Click "Login"
4. Expected: Success message → Redirect to home → Navbar shows greeting

### Test 3: Browse Categories ✅
**Route**: `/categories`

1. Click "Categories" in navbar
2. Page loads showing all categories
3. Try search:
   - Type "cleaning" in search box
   - Categories filter in real-time
4. Expected: Categories display, search works

### Test 4: Browse Providers ✅
**Route**: `/providers`

1. Click "Providers" in navbar
2. Page loads showing all providers
3. Each provider shows:
   - Name (from userId)
   - Category
   - Experience
   - Price per hour
   - Rating (stars)
   - Availability
4. Expected: All provider info visible

### Test 5: Book a Service ✅
**Route**: `/providers` → Click "Book Now"

1. On Providers page, click "Book Now" button
2. Modal pops up with provider info
3. Fill form:
   - Date: Pick tomorrow or later
   - Time Slot: `10:00-11:00` or `2PM-3PM`
4. Click "Confirm Booking"
5. Expected: Success message → Modal closes

### Test 6: View Dashboard ✅
**Route**: `/dashboard`

1. Login first (if not logged in)
2. Click "Dashboard" in navbar
3. Page shows:
   - Welcome message with user name
   - Statistics (Total, Pending, Completed)
   - List of all user bookings
4. Each booking shows:
   - Provider name
   - Service category
   - Booking date & time
   - Status badge
5. Expected: All bookings displayed

### Test 7: Become a Service Provider ✅
**Route**: `/become-provider`

1. Login first (required)
2. Click "Become Provider" in navbar
3. Fill form:
   - Category: Select from dropdown
   - Hourly Rate: `50`
   - Experience: `5 years in plumbing`
   - About: Your description
   - Availability: Add/remove time slots
4. Click "Create Profile"
5. Expected: Success message → Redirect to dashboard

### Test 8: Provider Appears in List ✅
**Route**: `/providers`

1. After creating provider profile
2. Go to Providers page
3. Your new provider should appear in the list
4. Expected: New provider visible with all details

### Test 9: Logout ✅
**Route**: Anywhere after login

1. Click logout button in navbar (red button)
2. Expected: Page reloads, navbar shows "Login/SignUp"

### Test 10: Protected Routes ✅
**Route**: `/dashboard` or `/become-provider` (without login)

1. Don't login
2. Try accessing `/dashboard`
3. Expected: Auto-redirects to `/auth`

---

## 🔍 What to Look For

### ✅ Correct Behavior
- [ ] Forms submit and call APIs
- [ ] Data appears from backend
- [ ] Animations are smooth
- [ ] Navigation works
- [ ] Auth token saved in localStorage
- [ ] Error messages appear for failures
- [ ] Success messages appear for successes
- [ ] Loading spinners show during API calls
- [ ] Empty states display when no data
- [ ] Mobile menu works on small screens

### ⚠️ Things That Might Need Backend Data
- Categories appear only if created in database
- Providers appear if provider profiles exist
- Bookings appear if already created
- Search works if categories exist with matching names

---

## 🐛 Debugging Tips

### Check Browser Console
- Press `F12` in browser
- Go to "Console" tab
- Look for red errors

### Check Network Tab
- Press `F12` → "Network" tab
- Click action (e.g., click "Book Now")
- See if API call is made
- Check response (should be JSON)

### Check localStorage
- Press `F12` → "Application" tab
- Find "localStorage"
- Look for:
  - `authToken` (should have JWT)
  - `user` (should have user object)

### Backend API Test
- Use Postman or cURL
- Test API endpoints directly
- Example:
  ```bash
  curl http://localhost:5000/api/categories
  ```

---

## 📊 Test Data Examples

### Creating a Category (via backend/Postman)
```json
POST http://localhost:5000/api/categories
Headers: Authorization: Bearer <token>

{
  "name": "Cleaning",
  "description": "Home and office cleaning services",
  "icon": "🧹"
}
```

### Creating a Booking
```json
POST http://localhost:5000/api/bookings
Headers: Authorization: Bearer <token>

{
  "providerId": "provider_id_here",
  "date": "2025-12-15",
  "timeSlot": "10:00-11:00"
}
```

---

## ✨ Expected Results Summary

| Test | Expected Outcome |
|------|------------------|
| Register | Account created, success message |
| Login | Logged in, token saved, navbar updated |
| Browse Categories | All categories display, search works |
| Browse Providers | All providers visible with details |
| Book Service | Booking modal opens, can submit |
| Dashboard | User bookings list shown |
| Become Provider | Profile created, appears in providers |
| Logout | User logged out, navbar reset |
| Protected Routes | Redirects to auth if not logged in |

---

## 🎯 Complete Flow Test (Start to Finish)

1. Open `http://localhost:5175`
2. See home page with all sections
3. Click "Categories" → See categories
4. Click "Providers" → See providers
5. Try to click "Book Now" → Redirected to login ✓
6. Register new account
7. Login with same credentials
8. Go to Providers → Click "Book Now"
9. Fill booking form → Success
10. Go to Dashboard → See booking listed
11. Click "Become Provider" → Create profile
12. Go to Providers → See your profile in list
13. Logout → Navbar resets

**If all 13 steps work → All APIs integrated successfully!** 🎉

---

## 📱 Mobile Testing

Test on small screens (use browser DevTools):
- Click hamburger menu
- All navigation items visible
- Forms are readable
- Buttons clickable
- No horizontal scroll

---

**Ready to test? Start with Test 1!** 🚀
