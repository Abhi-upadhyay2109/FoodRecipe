import axios from "axios";
import { createContext, useState } from "react";
import { SERVER } from "../App";

export const ContextProvider = createContext();

const ContextAPI = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || null;
        } catch {
            return null; // If parsing fails, return null
        }
    });
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [popup, setPopup] = useState(false);

    const addFav = async (data) => {
        try {
            const res = await axios.post(`${SERVER}/fav`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPopup(true);
            setMessage(res.data.message);

            setTimeout(() => {
                setPopup(false);
                setMessage("");
            }, 2000);
        } catch (error) {
            console.log(error);
            setPopup(true);
            setError(error.response?.data?.message || "An error occurred");

            setTimeout(() => {
                setPopup(false);
                setError("");
            }, 2000);
        }
    };

    return (
        <ContextProvider.Provider value={{ 
            addFav, token, setToken, user, setUser, isAuth, setIsAuth, 
            message, setMessage, error, setError, popup, setPopup 
        }}>
            {children}
        </ContextProvider.Provider>
    );
};

export default ContextAPI;
