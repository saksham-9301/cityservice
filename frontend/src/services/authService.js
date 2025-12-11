// API Service for Authentication
const API_BASE = 'http://localhost:5000/api';

// Register a new user
export async function registerUser(userData) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  return data;
}

// Login user
export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  
  // Save token and user info if login successful
  if (data.token) {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  return data;
}

// Logout user
export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
}

// Get current user from localStorage
export function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Check if user is logged in
export function isLoggedIn() {
  return !!localStorage.getItem('authToken');
}

// Get auth token
export function getAuthToken() {
  return localStorage.getItem('authToken');
}
