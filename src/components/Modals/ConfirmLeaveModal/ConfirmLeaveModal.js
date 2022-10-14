import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Button,
} from "@chakra-ui/react";

const ConfirmLeaveModal = ({ isOpen, onClose, onConfirm, onCancel }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={0} m={0}>
        <ModalHeader>
          Are you sure you want to leave? Leaving will end the session.
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p="24px">
          <Flex w="100%" align="center">
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={onConfirm}>Confirm</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmLeaveModal;
