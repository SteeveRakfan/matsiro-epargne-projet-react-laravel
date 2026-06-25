import { createContext, useEffect, useState } from "react";
import ApiService from "../services/apiService";

const UserContext = createContext();
export default UserContext;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getCurrentUser();
      if (response && response.user) {
        setUser(response.user);
      }
    } catch (error) {
      console.log("error");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, refreshUser: fetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
