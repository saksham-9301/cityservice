# 🔐 Authentication Components - Beginner's Guide

## 📁 Files Created

1. **`src/services/authService.js`** - Handles API calls to the backend
2. **`src/components/Login.jsx`** - Login form component
3. **`src/components/Register.jsx`** - Registration form component
4. **`src/pages/AuthPage.jsx`** - Main page that combines both components

---

## 🎯 How It Works (Simple Explanation)

### `authService.js`
Think of this as a "helper file" that communicates with the backend:
- `registerUser()` - Sends registration data to backend
- `loginUser()` - Sends login credentials to backend
- Stores the token (like a "key") in browser's localStorage
- Other helpful functions to check if user is logged in

### `Login.jsx`
A form component with:
- Two input fields: email and password
- Shows error/success messages
- Saves token automatically when login succeeds
- Can redirect to home page after login

### `Register.jsx`
A form component with:
- Five input fields: name, email, password, phone, address
- Role selection: Customer or Service Provider
- Shows validation messages
- Clear form after successful registration

### `AuthPage.jsx`
The main page that:
- Shows toggle buttons to switch between Login/Register
- Displays Login form by default
- After successful registration, shows Login form
- After successful login, redirects to home page

---

## 🚀 How to Use These Components

### Step 1: Update App.jsx to include routing

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// ... other imports

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        {/* Add other routes here */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
```

### Step 2: Add react-router-dom (if not already installed)

Run in terminal:
```bash
npm install react-router-dom
```

### Step 3: Update Navbar to include Login/SignUp link

In your `Navbar.jsx`, change the login button to:
```javascript
<Link to="/auth" className="text-blue-500 hover:text-blue-700">
  Login/SignUp
</Link>
```

---

## 📊 Data Flow Diagram

```
User types email and password
              ↓
User clicks "Login" button
              ↓
handleSubmit() function runs
              ↓
Calls loginUser() from authService.js
              ↓
authService sends data to backend: POST /api/auth/login
              ↓
Backend checks email/password and sends back token
              ↓
Token saved to localStorage
              ↓
Success message shown
              ↓
Redirects to home page
```

---

## 🔑 Key Concepts for Beginners

### State Management
```javascript
const [formData, setFormData] = useState({
  email: '',
  password: '',
});
```
- `formData` = Current form values
- `setFormData` = Function to update form values

### Form Handling
```javascript
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};
```
- Runs when user types in an input field
- Updates the corresponding field in `formData`

### API Calls
```javascript
const result = await loginUser(formData.email, formData.password);
if (result.token) {
  // Login successful
} else {
  // Login failed
}
```
- Calls the backend API
- Waits for response with `await`
- Checks if `token` exists in response

### LocalStorage (Saving Data)
```javascript
localStorage.setItem('authToken', data.token);
localStorage.setItem('user', JSON.stringify(data.user));
```
- Saves token in browser's memory
- Token stays even if user closes the page
- Use this token for authenticated API calls

---

## 🧪 Testing the Components

### Test Registration:
1. Click "Register" button
2. Fill all fields:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Phone: +1234567890
   - Address: 123 Main St
3. Click "Sign Up"
4. You should see "Registration successful!" message

### Test Login:
1. Click "Login" button
2. Enter the same email and password from registration
3. Click "Login"
4. You should see "Login successful! Redirecting..." and be redirected home

---

## 🛠️ Common Issues & Fixes

### Issue: "API is not responding"
**Solution:** Make sure backend server is running
```bash
cd server
npm start
```

### Issue: "Cannot GET /auth"
**Solution:** Make sure you're using React Router and route is defined in App.jsx

### Issue: Form doesn't work
**Solution:** Check browser console for errors (Press F12)

---

## 📝 Next Steps

After auth works, you'll want to:
1. Add protected routes (only logged-in users can access)
2. Display user info in Navbar when logged in
3. Add logout button
4. Show user's bookings page
5. Create provider profile page

All of these will use the token saved in localStorage!

---

**Everything is beginner-friendly and easy to understand!** 🎉
