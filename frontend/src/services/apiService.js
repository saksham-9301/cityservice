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

export async function getCategoryById(categoryId) {
  try {
    const response = await fetch(`${API_BASE}/categories/${categoryId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
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

export async function updateCategory(categoryId, categoryData) {
  try {
    const response = await fetch(`${API_BASE}/categories/${categoryId}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(categoryData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating category:', error);
    return { error: error.message };
  }
}

export async function deleteCategory(categoryId) {
  try {
    const response = await fetch(`${API_BASE}/categories/${categoryId}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting category:', error);
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
    const response = await fetch(`${API_BASE}/providers/category/${categoryId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching providers by category:', error);
    return [];
  }
}

export async function getProviderProfile(providerId) {
  try {
    const response = await fetch(`${API_BASE}/providers/profile/${providerId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching provider profile:', error);
    return null;
  }
}

export async function getMyProviderProfile() {
  try {
    const response = await fetch(`${API_BASE}/providers/my/profile`, {
      headers: getHeaders(true),
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching my provider profile:', error);
    return null;
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

export async function updateProvider(providerId, providerData) {
  try {
    const response = await fetch(`${API_BASE}/providers/${providerId}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(providerData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating provider:', error);
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