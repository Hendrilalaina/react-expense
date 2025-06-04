import { useState } from "react"
import { authenticate } from "../services/auth-service";
import { AuthRequest } from "../model/AuthRequest";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const { updateAuth } = useAuthContext();
    const navigate = useNavigate();
    const login = (authRequest: AuthRequest) => {
        setLoading(true);
        authenticate(authRequest)
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                updateAuth(true);
                navigate("/");
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError(error.message);
                }
            })
            .finally(() => setLoading(false));
    }
    return {error, isLoading, login};
}