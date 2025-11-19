import axios from 'axios';
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants.js";

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    timeout: import.meta.env.VITE_API_TIMEOUT || 30000,
});

// Request interceptor - Add auth token to requests
Api.interceptors.request.use(
    config => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor - Handle token refresh on 401
Api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // If 401 error and not already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem(REFRESH_TOKEN);

                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Attempt to refresh token
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/myapp/token/refresh/`,
                    { refresh: refreshToken }
                );

                const newAccessToken = response.data.access;
                localStorage.setItem(ACCESS_TOKEN, newAccessToken);

                // Update authorization header
                Api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Retry original request
                return Api(originalRequest);
            } catch (refreshError) {
                // Refresh failed - clear tokens and redirect to login
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default Api;