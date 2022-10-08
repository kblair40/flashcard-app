import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
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
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
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
