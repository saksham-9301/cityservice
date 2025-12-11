// Complete API Service for all endpoints
const API_BASE = 'http://localhost:5000/api';

// ============ HELPER FUNCTION ============
function getHeaders(includeAuth = false) {
  const headers = { 'Content-Type': 'application/json' };
  if (includeAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
}

// ============ CATEGORIES APIS ============
export async function getCategories() {
  try {
    const response = await fetch(`${API_BASE}/categories`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function searchCategories(query) {
  try {
    const response = await fetch(`${API_BASE}/categories/search?name=${query}`);
    return await response.json();
  } catch (error) {
    console.error('Error searching categories:', error);
    return [];
  }
}

export async function createCategory(categoryData) {
  try {
    const response = await fetch(`${API_BASE}/categories`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(categoryData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating category:', error);
    return { error: error.message };
  }
}

// ============ SERVICE PROVIDERS APIS ============
export async function getProviders() {
  try {
    const response = await fetch(`${API_BASE}/providers`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
}

export async function getProvidersByCategory(categoryId) {
  try {
    const providers = await getProviders();
    return providers.filter(p => p.categoryId?._id === categoryId);
  } catch (error) {
    console.error('Error filtering providers:', error);
    return [];
  }
}

export async function createProvider(providerData) {
  try {
    const response = await fetch(`${API_BASE}/providers`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(providerData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating provider:', error);
    return { error: error.message };
  }
}

// ============ BOOKING APIS ============
export async function createBooking(bookingData) {
  try {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(bookingData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating booking:', error);
    return { error: error.message };
  }
}

export async function getUserBookings() {
  try {
    const response = await fetch(`${API_BASE}/bookings/my`, {
      headers: getHeaders(true),
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
}

// ============ AUTH HELPERS ============
export function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function isLoggedIn() {
  return !!localStorage.getItem('authToken');
}

export function getAuthToken() {
  return localStorage.getItem('authToken');
}
