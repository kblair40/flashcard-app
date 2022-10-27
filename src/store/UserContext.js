import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import api from "api";

const isAuthenticated = Boolean(window.localStorage.getItem("auth-token"));

const UserContext = createContext({ isAuthenticated, loading: true });

const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [isSignedIn, setIsSignedIn] = useState(isAuthenticated);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let authToken = window.localStorage.getItem("auth-token");
    if (!authToken) {
      setUserData(undefined);
    }
  }, [pathname]);

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

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    if (!isSignedIn) {
      setUserData(undefined);
    } else {
      if (isAuthenticated) {
        fetchUser();
      }
    }
  }, [isSignedIn]);

  const handleSignIn = (initialData) => {
    setUserData(initialData);
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    window.localStorage.removeItem("auth-token");

    navigate("/");

    setIsSignedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        handleSignIn,
        handleSignOut,
        userData,
        isSignedIn,
        loading,
        fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { UserProvider };
