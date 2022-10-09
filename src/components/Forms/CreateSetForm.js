import React, { useState } from "react";
import {
  FormControl,
  Input,
  FormLabel,
  VStack,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import api from "api";

const INITIAL_ERROR_STATE = { title: false };

const CreateSetForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(INITIAL_ERROR_STATE);

  const handleSubmit = async () => {
    setLoading(true);
    const { title, description } = formData;

    if (!title) {
      setErrors({ ...errors, title: true });
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/flashcard_set", {
        title,
        description,
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
        w="100%"
        spacing="1.5rem"
        maxW={{ base: "90%", sm: "450px", md: "540px" }}
      >
        <FormControl isRequired>
          <FormLabel>Set Title</FormLabel>
          <Input
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
              if (errors.title) setErrors(INITIAL_ERROR_STATE);
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </FormControl>

        <Button w="100%" onClick={handleSubmit} isLoading={loading}>
          Create
        </Button>
      </VStack>
    </Flex>
  );
};

export default CreateSetForm;