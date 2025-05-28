import { useState } from "react"
import { authenticate } from "../services/auth-service";
import { AuthRequest } from "../model/AuthRequest";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const login = (authRequest: AuthRequest) => {
        setLoading(true);
        authenticate(authRequest)
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/");
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }
    return {error, isLoading, login};
}