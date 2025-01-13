import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
       
     
        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            setuser(response.data.user);
          }
        } else {
          setuser(null);
          setLoading(false);
        }
      } catch (e) {
        if (e.response && !e.response.data.success) {
          setuser(null);
      
        }
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = (user) => {
    setuser(user);
  };

  const logout = () => {
    setuser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
export const useAuth = () => useContext(UserContext);
export default AuthContext;
