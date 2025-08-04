import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContext;
};

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const navigate = useNavigate();

    const saveToken = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    
    const removeToken = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <i className="fas fa-spinner fa-spin fa-3x"></i>
                <p className="mt-2">Loading ...</p>
            </div>
        );
    }

    const contextObject = {
        token,
        loading,
        setLoading,
        saveToken,
        removeToken
    };

    return (
        <AuthContext.Provider value={contextObject}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
