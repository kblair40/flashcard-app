import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Button,
  Text,
  useColorMode,
} from "@chakra-ui/react";

const ConfirmDeleteSetModal = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  confirming,
}) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Modal
      size={{ base: "xs", sm: "sm", md: "md" }}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg={isDark ? "gray.800" : "gray.50"}>
        <ModalHeader pt="2rem">
          <Text textAlign="center" fontSize="xl" fontWeight="600">
            Are you sure you want to delete?
          </Text>
          <Text fontSize="md" fontWeight="500" textAlign="center">
            This cannot be undone.
          </Text>
        </ModalHeader>
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
              variant="solid-blue"
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

export default ConfirmDeleteSetModal;
