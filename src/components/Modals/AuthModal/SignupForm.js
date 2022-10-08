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
  // FormErrorMessage,
  // FormHelperText,q
} from "@chakra-ui/react";

import api from "api";

const SignupForm = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    // console.log("NAME:", e.target.name);
    // console.log("VALUE:", e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [`${name}`]: value });
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
    }

    setLoading(false);
  };

  return (
    <Box>
      <VStack>
        <Heading mb="2rem">Sign Up</Heading>

        <HStack>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input name="email" value={formData.email} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </FormControl>

        <HStack>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
            />
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
