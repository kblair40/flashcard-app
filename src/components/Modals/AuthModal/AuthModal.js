import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import UserContext from "store/UserContext";
import Tabs from "./Tabs";

const AuthModal = ({ isOpen, onClose, defaultTab }) => {
  const { handleSignIn } = useContext(UserContext);

  const onAuthSuccess = (token) => {
    window.localStorage.setItem("auth-token", token);
    handleSignIn();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      px={{ base: "1rem", sm: 0 }}
      size={{ base: "xs", sm: "md", md: "lg" }}
    >
      <ModalOverlay />
      <ModalContent px={{ base: "1.25rem", sm: "1.5rem" }} pt="2rem">
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
