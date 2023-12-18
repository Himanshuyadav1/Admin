import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [ token, setToken ] = useState(localStorage.getItem("token"));
    const [ user, setUser ] = useState("");
    const [ services, setServices ] = useState([]);
    const isLoggedIn = !!token;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    }

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    // JWT AUTHENTICATION - to get the currently loggedIn user data

    const userAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if(response.ok) {
                const data = await response.json();
                console.log("User Data==>", data.userData);
                setUser(data.userData);
            }
        } catch (error) {
            console.log("Error fetching user data");
        }
    }

    // to fetch the services data from the database
    const getServices = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/data/service", {
                method: "GET"
            });

            if(response.ok) {
                const data = await response.json();
                setServices(data.message);
            }
        } catch (error) {
            console.log(`Services frontend error ${error}`);
        }
    }
    
    useEffect(() => {
        getServices();
        userAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{isLoggedIn, user, services, storeTokenInLS, LogoutUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};