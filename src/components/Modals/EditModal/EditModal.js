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
  HStack,
} from "@chakra-ui/react";

import { categories } from "utils/constants";
import api from "api";

const EditModal = ({ isOpen, onClose, setData, onPatchSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
  });

  useEffect(() => {
    if (setData) {
      setFormData(setData);
    }
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
      const response = await api.patch(`/flashcard_set/patch/${setData.id}`, {
        description: formData.desc,
        title: formData.title,
        category: formData.category,
      });
      console.log("\nPATCH RESPONSE:", response.data);

      onPatchSuccess(response.data.set);
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

            <HStack w="100%" justify="end" pt="8px">
              <Button variant="icon-button">Cancel</Button>
              <Button
                isLoading={loading}
                onClick={handleSubmit}
                variant="solid-blue"
              >
                Save Changes
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
