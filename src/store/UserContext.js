import { createContext, useEffect, useState } from "react";

import api from "api";

const isAuthenticated = Boolean(window.localStorage.getItem("auth-token"));

const UserContext = createContext({ isAuthenticated, loading: true });

const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [isSignedIn, setIsSignedIn] = useState(isAuthenticated);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user", {
          params: { flashcard_sets: true },
        });
        console.log("\nUSER RESPONSE:", response.data);
        setUserData(response.data.user);
      } catch (e) {
        console.error("FAILED FETCHING USER:", e);
      }

      setLoading(false);
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, []);

  const handleSignIn = () => setIsSignedIn(true);
  const handleSignOut = () => {
    window.localStorage.removeItem("auth-token");

    setIsSignedIn(false);
  };

  return (
    <UserContext.Provider
      value={{ handleSignIn, handleSignOut, userData, isSignedIn, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { UserProvider };
