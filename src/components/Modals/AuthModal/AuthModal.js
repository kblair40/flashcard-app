import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";

import UserContext from "store/UserContext";
import Tabs from "./Tabs";

const AuthModal = ({ isOpen, onClose, defaultTab }) => {
  const { handleSignIn } = useContext(UserContext);

  const onAuthSuccess = (token, user) => {
    window.localStorage.setItem("auth-token", token);
    handleSignIn(user);
    onClose();
  };

  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      px={{ base: "1rem", sm: 0 }}
      size={{ base: "xs", sm: "md", md: "lg" }}
    >
      <ModalOverlay />
      <ModalContent px="1rem" pt="2rem" bg={bg}>
        <ModalCloseButton />
        <ModalBody px={0}>
          <Tabs
            onClose={onClose}
            onAuthSuccess={onAuthSuccess}
            defaultTab={defaultTab}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
