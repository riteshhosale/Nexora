import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const { data } = await loginUser(credentials); 

        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));

        return data;
    };

    const register = async (userData) => {
        const { data } = await registerUser(userData);

        return data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);