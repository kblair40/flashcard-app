import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Button,
  Text,
  useColorMode,
} from "@chakra-ui/react";

const ConfirmDeleteFavoriteModal = ({ isOpen, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Modal
      size={{ base: "xs", sm: "sm" }}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />

      <ModalContent p={0} bg={isDark ? "gray.800" : "gray.50"}>
        <ModalBody p="1.5rem 1rem 1rem">
          <Text textAlign="center" fontWeight="500" fontSize="lg" mb="1.25rem">
            Please confirm you want to remove this set from your favorites
          </Text>

          <Flex align="center" w="100%" justify="end">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button ml="1rem" variant="solid-red" onClick={handleConfirm}>
              Confirm
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteFavoriteModal;
