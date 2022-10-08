import React, { useState } from "react";
import {
  FormControl,
  Input,
  FormLabel,
  Box,
  Text,
  VStack,
  Flex,
  Button,
} from "@chakra-ui/react";

const INITIAL_ERROR_STATE = { title: false };

const CreateSetForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState(INITIAL_ERROR_STATE);

  const handleSubmit = () => {
    //
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

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </FormControl>

        <Button w="100%" onClick={handleSubmit}>
          Create
        </Button>
      </VStack>
    </Flex>
  );
};

export default CreateSetForm;
