import React from "react";
import { Flex } from "@chakra-ui/react";
// import { useLocation, useNavigate } from "react-router-dom";

import UserContext from "store/UserContext";

const Account = () => {
  // const { isSignedIn } = useContext(UserContext);

  // const { pathname } = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isSignedIn && !)
  // }, [pathname, navigate, isSignedIn]);

  return (
    <Flex justify="center">
      <Flex
        direction="column"
        w="100%"
        pt="2rem"
        maxW={{ base: "300px", sm: "400px" }}
      ></Flex>
    </Flex>
  );
};

export default Account;
