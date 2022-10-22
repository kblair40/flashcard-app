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
} from "@chakra-ui/react";

import { categories } from "utils/constants";

const EditModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
  });

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [`${id}`]: value,
    });
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
            {/* <Input id="title" onChange={handleChange} placeholder="Set Title" /> */}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
