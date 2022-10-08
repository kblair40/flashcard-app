import React, { useState } from "react";
import {
  Box,
  Heading,
  Button,
  VStack,
  HStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

import api from "api";

const INITIAL_ERROR_STATE = {
  first_name: false,
  last_name: false,
  email: false,
  username: false,
  password: false,
  confirm_password: false,
};

const SignupForm = ({ onClose, onAuthSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState(INITIAL_ERROR_STATE);

  const handleChange = (e) => {
    // console.log("NAME:", e.target.name);
    // console.log("VALUE:", e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [`${name}`]: value });

    if (errors[name]) {
      // clear all errors on change if the field being edited has an error.
      setErrors(INITIAL_ERROR_STATE);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await api.post("/signup", {
        ...formData,
      });
      console.log("RESPONSE:", response.data);

      if (response && response.data) {
        onClose();
      }
    } catch (e) {
      console.error("FAILED SIGNING UP:", e);
      console.log("ERROR RESPONSE:", e.response);
      if (e.response.data) {
        const { error_field, error_msg } = e.response.data;
        console.log("yes");

        if (error_field && error_msg) {
          console.log("yes2");
          let errorMsg = ["email", "username"].includes(error_field)
            ? error_msg
            : true;
          setErrors({ ...errors, [`${error_field}`]: errorMsg });
        }
      }
    }

    setLoading(false);
  };

  return (
    <Box>
      <VStack>
        <Heading mb="2rem">Sign Up</Heading>

        <HStack>
          <FormControl isRequired isInvalid={!!errors["first_name"]}>
            <FormLabel>First Name</FormLabel>
            <Input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <FormErrorMessage>First name is required</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors["last_name"]}>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />

            <FormErrorMessage>Last name is required</FormErrorMessage>
          </FormControl>
        </HStack>

        <FormControl isRequired isInvalid={!!errors["email"]}>
          <FormLabel>Email address</FormLabel>
          <Input name="email" value={formData.email} onChange={handleChange} />

          <FormErrorMessage>
            {errors["email"] && typeof errors["email"] === "boolean"
              ? "Email is required"
              : errors["email"]}
          </FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors["username"]}>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <FormErrorMessage>
            {errors["username"] && typeof errors["username"] === "boolean"
              ? "Username is required"
              : errors["username"]}
          </FormErrorMessage>
        </FormControl>

        <HStack>
          <FormControl isRequired isInvalid={!!errors["password"]}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormErrorMessage>Password is required</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors["confirm_password"]}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
            />
            <FormErrorMessage>Confirm password is required</FormErrorMessage>
          </FormControl>
        </HStack>

        <HStack pt="1.5rem" w="100%" justify="end">
          <Button>Cancel</Button>
          <Button isLoading={loading} onClick={handleSubmit}>
            Submit
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default SignupForm;
