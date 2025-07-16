import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import api from '../api/index';
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
    const [loading, setLoading] = useState(false); // Initialize loading to true
    const [username, setUsername] = useState();
    const [isGuest, setIsGuest] = useState(false);
    const [token, setToken] = useState(() => localStorage.getItem(`token${username}`));
    const navigate = useNavigate();


    useLayoutEffect(() => {
        setToken(localStorage.getItem(`token${username}`))
       
    }, [username, token, setToken]);




    if (loading) {
        return (
            <div>
                <div className="text-center mt-5">
                    <i className="fas fa-spinner fa-spin fa-3x"></i>
                    <p className="mt-2">Loading ...</p>
                </div>
            </div>
        );
    }

    let contextObject = {
        username,
        token,
        loading,
        isGuest,
        setLoading,
        setUsername,
        setToken
    };

    return (
        <AuthContext.Provider value={contextObject}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;