import axios from "axios";
import { AuthResponse } from "../model/AuthResponse";
import { refresh } from "../services/auth-service";

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
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const authObject = localStorage.getItem("user");
        if (!authObject) {
          return Promise.reject(error);
        }
        console.log("Calling Refresh token API");
        const response = await refresh();
        if (response) {
          const newAuthData = {
            ...JSON.parse(authObject),
            token: response.data.token,
            refreshToken: response.data.refreshToken
          };
          localStorage.setItem("user", JSON.stringify(newAuthData));
          
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
          originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
        }
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
export default apiClient;