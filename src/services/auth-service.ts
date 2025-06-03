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

export const refresh = () => {
    const authObject = localStorage.getItem("user");
    if (authObject) {
      const { refreshToken } = JSON.parse(authObject) as AuthResponse;
    //   console.log(refreshToken);
      return apiClient.post<AuthResponse>("/refresh-token", { refreshToken });
    } else {
      return null;
    }
}