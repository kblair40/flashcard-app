import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import UserContext from "store/UserContext";

function useDetectLogout() {
  const { isSignedIn } = useContext(UserContext);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== "/" && !isSignedIn) {
      console.log("PATH/SIGNED IN:", { pathname, isSignedIn });
      navigate("/");
    }
  }, [navigate, pathname, isSignedIn]);
}

export default useDetectLogout;
