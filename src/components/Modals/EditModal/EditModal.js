import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  VStack,
  Button,
  Select,
  Input,
  useColorMode,
  Flex,
} from "@chakra-ui/react";

import { categories } from "utils/constants";
import api from "api";

const EditModal = ({ isOpen, onClose, setData }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
  });

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  useEffect(() => {
    // if (setData) {
    //   setFormData(setData);
    // }
  }, [setData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [`${id}`]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await api.patch(`/flashcard_set/patch/${setData.id}`);
      console.log("\nPATCH RESPONSE:", response.data);
    } catch (e) {
      console.error("FAILED TO PATCH SET:", e);
    }
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent p={0}>
        <ModalCloseButton />

        <ModalBody p={"3rem 1rem 2rem"}>
          <VStack spacing="1rem">
            <Input
              variant="neutral-outline"
              value={formData.title}
              id="title"
              onChange={handleChange}
              placeholder="Set Title"
            />

            <Input
              variant="neutral-outline"
              value={formData.desc}
              id="desc"
              onChange={handleChange}
              placeholder="Description"
            />

            <Select
              id="category"
              variant="neutral-outline"
              onChange={handleChange}
              placeholder="Category"
              value={formData.category}
            >
              {categories.map((cat, i) => {
                return (
                  <option key={i} value={cat.value}>
                    {cat.label}
                  </option>
                );
              })}
            </Select>

            <Flex>
              <Button pt="8px" variant="ghost">
                Cancel
              </Button>
              <Button isLoading={loading} pt="8px" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
