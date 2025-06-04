import apiClient from "../config/api-client";
import { AuthRequest } from "../model/AuthRequest";
import { AuthResponse } from "../model/AuthResponse";
import { Profile } from "../model/Profile";

export const createProfile = (profile: Profile) => {
    return apiClient.post<Profile>("/register", profile);
}

export const authenticate = (authRequest: AuthRequest) => {
    return apiClient.post<AuthResponse>("/login", authRequest);
}

export const signout = () => {
  return apiClient.post<void>("/signout");
}

export const refresh = () => {
    const authObject = localStorage.getItem("user");
    if (authObject) {
      const { refreshToken } = JSON.parse(authObject) as AuthResponse;
      return apiClient.post<AuthResponse>("/refresh-token", { refreshToken });
    } else {
      throw new Error("No authentication found");
    }
}