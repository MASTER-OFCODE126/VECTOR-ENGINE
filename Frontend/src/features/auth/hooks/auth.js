import { useContext } from "react";
import { AuthContext } from "../services/auth.context";
import { loginUser, registerUser, getCurrentUser, logoutUser } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setuser, loading, setloading } = context;

    const handleLogin = async ({ email, password }) => {
        setloading(true);
        try {
            const data = await loginUser({ email, password });
            if (data) setuser(data.user);
            return data;
        } catch (error) {
            console.error("handleLogin error:", error);
            throw error;
        } finally {
            setloading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        setloading(true);
        try {
            const data = await registerUser({ username, email, password });
            if (data) setuser(data.user);
            return data;
        } catch (error) {
            console.error("handleRegister error:", error);
            throw error;
        } finally {
            setloading(false);
        }
    };

    const handleLogout = async () => {
        setloading(true);
        try {
            const data = await logoutUser();
            setuser(null);
            return data;
        } catch (error) {
            console.error("handleLogout error:", error);
            throw error;
        } finally {
            setloading(false);
        }
    };

    return { user, loading, handleLogin, handleRegister, handleLogout };
};