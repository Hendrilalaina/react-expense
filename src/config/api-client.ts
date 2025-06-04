import axios from "axios";
import { AuthResponse } from "../model/AuthResponse";

const apiClient = axios.create({
  baseURL: "http://localhost:8081/api/v1"
})

apiClient.interceptors.request.use(config => {
  if (!config.url?.includes("/login") && !config.url?.includes("/register") && !config.url?.includes("/refresh-token")) {
    const authObject = localStorage.getItem("user");
    if (authObject) {
      const { token } = JSON.parse(authObject) as AuthResponse;
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, error => Promise.reject(error));

// Response interceptor
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Get the refresh token from storage
        const authObject = localStorage.getItem("user");
        if (!authObject) {
          window.location.href = "/login";
          console.log("Not auth object")
          return Promise.reject(error);
        }
        
        const { refreshToken } = JSON.parse(authObject) as AuthResponse;
        
        // Call refresh token endpoint
        console.log("Call /refresh-token");
        const response = await axios.post(`${apiClient.defaults.baseURL}/refresh-token`, {
          refreshToken
        });
        
        // Update the stored tokens
        const newAuthData = {
          ...JSON.parse(authObject),
          token: response.data.token,
          refreshToken: response.data.refreshToken // if a new refresh token is returned
        };
        localStorage.setItem("user", JSON.stringify(newAuthData));
        
        // Update the Authorization header
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
        
        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear storage and redirect to login
        console.log("Refresh Error", refreshError);
        localStorage.removeItem("user");
        window.location.href = "/login";
        // You might want to redirect to login page here
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
export default apiClient;