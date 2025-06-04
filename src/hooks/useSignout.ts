import { useState } from "react"
import { signout } from "../services/auth-service";
import { useAuthContext } from "./useAuthContext";

export const useSignout = () => {
    const { updateAuth } = useAuthContext();
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);

    const logout = () => {
        setLoading(true);
        signout()
            .then((response) => {
                if (response && response.status === 200) {
                    localStorage.clear();
                    updateAuth(false);
                }
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }
    return {error, isLoading, logout};
}