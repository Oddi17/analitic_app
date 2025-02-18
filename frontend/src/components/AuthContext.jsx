import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [role,setRole] = useState("")
    const [name,setName] = useState("")
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = () => {
        axios
            .get("http://10.50.50.2/api/auth/", { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    setIsAuth(true);
                    setRole(response.data.role)
                    setName(response.data.username)
                }
            })
            .catch(() => {
                setIsAuth(false);
                setRole("")
                setName("")
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading, setIsLoading, role, setRole, name, setName}}>
            {children}
        </AuthContext.Provider>
    );
};
