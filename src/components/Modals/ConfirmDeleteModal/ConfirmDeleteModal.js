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
  Text,
} from "@chakra-ui/react";

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  confirming,
}) => {
  return (
    <Modal
      size={{ base: "xs", sm: "sm", md: "md" }}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pt="2rem">
          <Text textAlign="center" fontSize="xl" fontWeight="600">
            Are you sure you want to delete?
          </Text>
          <Text fontSize="md" fontWeight="500" textAlign="center">
            This cannot be undone.
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p="8px 24px 24px">
          <Flex
            w="100%"
            align="center"
            direction={{ base: "column", sm: "row-reverse" }}
          >
            <Button
              w={{ base: "100%", sm: "50%" }}
              mb={{ base: "1rem", sm: 0 }}
              ml={{ sm: "1rem" }}
              // size="sm"
              isLoading={confirming}
              onClick={onConfirm}
            >
              Confirm
            </Button>

            <Button
              w={{ base: "100%", sm: "50%" }}
              // size="sm"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteModal;
