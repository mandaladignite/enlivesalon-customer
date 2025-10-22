export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";

// API Response interface
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
}

// Enhanced API request function with automatic token refresh
export async function apiRequest<T = any>(
  path: string, 
  options: RequestInit = {},
  retryOptions: { maxRetries?: number; retryDelay?: number } = {}
): Promise<ApiResponse<T>> {
  const { maxRetries = 3, retryDelay = 1000 } = retryOptions;
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  const config: RequestInit = {
    ...options,
    headers: {
      // Only set Content-Type for non-FormData requests
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
    credentials: "include",
  };

  let lastError: Error | null = null;
  let hasTriedRefresh = false;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
      }

      
      const res = await fetch(`${API_BASE_URL}${path}`, config);

      // Handle different response types
      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error Response:', {
          status: res.status,
          statusText: res.statusText,
          body: errorText
        });
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || 'Unknown error occurred' };
        }
        
        // If we get a 401 and haven't tried refreshing the token yet, try to refresh
        if (res.status === 401 && !hasTriedRefresh && typeof window !== 'undefined') {
          hasTriedRefresh = true;
          
          try {
            const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            if (refreshResponse.ok) {
              const refreshData = await refreshResponse.json();
              if (refreshData.data && refreshData.data.accessToken) {
                localStorage.setItem('accessToken', refreshData.data.accessToken);
                // Update the token in the config for the retry
                config.headers = {
                  ...config.headers,
                  Authorization: `Bearer ${refreshData.data.accessToken}`
                };
                continue; // Retry the original request with new token
              }
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // Clear invalid tokens
            localStorage.removeItem('accessToken');
            // Don't redirect automatically - let the auth context handle it
          }
        }
        
        throw new Error(errorData.message || `HTTP ${res.status}: ${res.statusText}`);
      }

      const contentType = res.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      return data;
    } catch (error) {
      lastError = error as Error;
      console.error(`API Request failed (attempt ${attempt + 1}/${maxRetries + 1}):`, error);
      
      // If this is the last attempt, throw the error
      if (attempt === maxRetries) {
        throw lastError;
      }
    }
  }
  
  throw lastError || new Error('API request failed after all retries');
}

// Auth APIs
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (userData: any) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  logout: () =>
    apiRequest('/auth/logout', { method: 'POST' }),

  refreshToken: () =>
    apiRequest('/auth/refresh-token', { method: 'POST' }),

  forgotPassword: (email: string) =>
    apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token: string, password: string) =>
    apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    }),

  getProfile: () =>
    apiRequest('/auth/profile'),

  updateProfile: (userData: any) =>
    apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
};

// Service APIs
export const serviceAPI = {
  getAll: (params?: any) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest(`/services${queryString}`);
  },

  getById: (id: string) =>
    apiRequest(`/services/${id}`),

  getByCategory: (category: string, params?: any) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest(`/services/category/${category}${queryString}`);
  },

  getCategories: () =>
    apiRequest('/services/categories/list'),
};

// Stylist APIs
export const stylistAPI = {
  getAll: (params?: any) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest(`/stylists${queryString}`);
  },

  getById: (id: string) =>
    apiRequest(`/stylists/${id}`),

  getByService: (serviceId: string) =>
    apiRequest(`/stylists/service/${serviceId}`),

  getAvailability: (stylistId: string, date: string) =>
    apiRequest(`/stylists/${stylistId}/availability?date=${date}`),
};

// Appointment APIs
export const appointmentAPI = {
  create: (appointmentData: any) =>
    apiRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    }),

  getMyAppointments: (params?: any) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest(`/appointments/my${queryString}`);
  },

  getById: (id: string) =>
    apiRequest(`/appointments/${id}`),

  update: (id: string, updateData: any) =>
    apiRequest(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    }),

  cancel: (id: string, reason?: string) =>
    apiRequest(`/appointments/${id}/cancel`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    }),

  reschedule: (id: string, newDateTime: string) =>
    apiRequest(`/appointments/${id}/reschedule`, {
      method: 'PATCH',
      body: JSON.stringify({ newDateTime }),
    }),

  getAvailableSlots: (stylistId: string, date: string) =>
    apiRequest(`/appointments/slots/available?stylistId=${stylistId}&date=${date}`),

  getAvailableDates: (stylistId: string) =>
    apiRequest(`/appointments/dates/available?stylistId=${stylistId}`),
};

// Package APIs
export const packageAPI = {
  getAll: (params?: any) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest(`/packages${queryString}`);
  },

  getById: (id: string) =>
    apiRequest(`/packages/${id}`),

  getByCategory: (category: string) =>
    apiRequest(`/packages/category/${category}`),
};

// Membership APIs
export const membershipAPI = {
  getAll: (params?: any) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest(`/memberships${queryString}`);
  },

  getById: (id: string) =>
    apiRequest(`/memberships/${id}`),

  getMyMemberships: (params?: any) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest(`/memberships/my${queryString}`);
  },

  purchase: (membershipData: any) =>
    apiRequest('/memberships/purchase', {
      method: 'POST',
      body: JSON.stringify(membershipData),
    }),

  verifyPayment: (paymentData: any) =>
    apiRequest('/memberships/verify-payment', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    }),

  cancel: (id: string, reason?: string) =>
    apiRequest(`/memberships/${id}/cancel`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    }),

  getStats: () =>
    apiRequest('/memberships/my/stats'),

  extend: (membershipId: string, additionalDays: number) =>
    apiRequest(`/memberships/${membershipId}/extend`, {
      method: 'PATCH',
      body: JSON.stringify({ additionalDays }),
    }),

  useAppointment: (membershipId: string) =>
    apiRequest(`/memberships/${membershipId}/use-appointment`, {
      method: 'POST',
    }),
};

// Gallery APIs
export const galleryAPI = {
  getAll: (params?: any) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest(`/gallery${queryString}`);
  },

  getById: (id: string) =>
    apiRequest(`/gallery/${id}`),

  getFeatured: () =>
    apiRequest('/gallery/featured'),

  getStats: () =>
    apiRequest('/gallery/stats'),
};

// Review APIs
export const reviewAPI = {
  create: (reviewData: any) =>
    apiRequest('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    }),

  getAll: (params?: any) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest(`/reviews${queryString}`);
  },

  getById: (id: string) =>
    apiRequest(`/reviews/${id}`),

  update: (id: string, updateData: any) =>
    apiRequest(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    }),

  delete: (id: string) =>
    apiRequest(`/reviews/${id}`, { method: 'DELETE' }),

  getByService: (serviceId: string) =>
    apiRequest(`/reviews/service/${serviceId}`),

  getByUser: (userId: string) =>
    apiRequest(`/reviews/user/${userId}`),

  getStats: () =>
    apiRequest('/reviews/stats'),
};

// Address APIs
export const addressAPI = {
  create: (addressData: any) =>
    apiRequest('/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    }),

  getAll: () =>
    apiRequest('/addresses'),

  getById: (id: string) =>
    apiRequest(`/addresses/${id}`),

  update: (id: string, updateData: any) =>
    apiRequest(`/addresses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    }),

  delete: (id: string) =>
    apiRequest(`/addresses/${id}`, { method: 'DELETE' }),

  setDefault: (id: string) =>
    apiRequest(`/addresses/${id}/default`, { method: 'PATCH' }),

  duplicate: (id: string, newLabel: string) =>
    apiRequest(`/addresses/${id}/duplicate`, {
      method: 'POST',
      body: JSON.stringify({ newLabel }),
    }),
};

// Enquiry APIs
export const enquiryAPI = {
  create: (enquiryData: any) =>
    apiRequest('/enquiries', {
      method: 'POST',
      body: JSON.stringify(enquiryData),
    }),

  getMyEnquiries: (params?: any) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest(`/enquiries/my${queryString}`);
  },
};