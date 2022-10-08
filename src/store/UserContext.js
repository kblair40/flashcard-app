import { createContext, useEffect, useState } from "react";

const isAuthenticated = Boolean(window.localStorage.getItem("auth-token"));

const UserContext = createContext({ isAuthenticated, loading: true });

const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(isAuthenticated);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSignIn = () => setIsSignedIn(true);
  const handleSignOut = () => {
    window.localStorage.removeItem("auth-token");

    setIsSignedIn(false);
  };

  return (
    <UserContext.Provider
      value={{ handleSignIn, handleSignOut, isSignedIn, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { UserProvider };
