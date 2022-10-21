import React, { useState } from "react";
import {
  FormControl,
  Input,
  FormLabel,
  VStack,
  Flex,
  Button,
  Checkbox,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { categories } from "utils/constants";
import api from "api";

const INITIAL_ERROR_STATE = { title: false };

const CreateSetForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    is_public: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(INITIAL_ERROR_STATE);

  const handleSubmit = async () => {
    setLoading(true);
    const { title, description, is_public, category } = formData;

    if (!title) {
      setErrors({ ...errors, title: true });
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/flashcard_set", {
        title,
        description,
        category,
        public: is_public,
      });
      console.log("\nCREATE RESPONSE:", response.data);

      if (response.data && response.data.flashcardSet) {
        const { _id } = response.data.flashcardSet;
        navigate(`/create/${_id}`);
      }
    } catch (e) {
      console.error("FAILED CREATING SET:", e);
    }

    setLoading(false);
  };

  return (
    <Flex w="100%" justify="center" pt="2rem">
      <VStack
        align="start"
        w="100%"
        spacing="1.5rem"
        maxW={{ base: "90%", sm: "450px", md: "540px" }}
      >
        <FormControl isRequired>
          <FormLabel>Set Title</FormLabel>
          <Input
            variant="neutral-outline"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
              if (errors.title) setErrors(INITIAL_ERROR_STATE);
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            variant="neutral-outline"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            variant="neutral-outline"
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
            placeholder="Select Category"
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
        </FormControl>

        <Checkbox
          colorScheme="gray"
          spacing=".75rem"
          isChecked={formData.is_public}
          onChange={(e) =>
            setFormData({ ...formData, is_public: e.target.checked })
          }
          fontWeight={500}
        >
          Make Set Public
        </Checkbox>

        <Button
          isDisabled={!formData.category || !formData.title}
          w="100%"
          onClick={handleSubmit}
          isLoading={loading}
          variant="solid-blue"
        >
          Create
        </Button>
      </VStack>
    </Flex>
  );
};

export default CreateSetForm;
