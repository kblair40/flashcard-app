import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { VisibleIcon, NotVisibleIcon } from "utils/icons";
import api from "api";

const SigninForm = ({ onClose, onAuthSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [`${name}`]: value });

    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await api.post("/signin", {
        ...formData,
      });

      if (response && response.data) {
        const { token, user } = response.data;
        console.log("\nUSER RESPONSE:", user);
        onAuthSuccess(token, user);
      }
    } catch (e) {
      console.error("FAILED SIGNING UP:", e);
      setErrorMsg("Username and/or password is incorrect");
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const errorTextColor = useColorModeValue("red.500", "red.300");

  return (
    <Box data-testid="signinForm">
      <VStack spacing="1rem">
        <FormControl isRequired>
          <FormLabel mb="4px" fontSize="sm">
            Username
          </FormLabel>
          <Input
            variant="neutral-outline"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel mb="4px" fontSize="sm">
            Password
          </FormLabel>
          <InputGroup>
            <Input
              variant="neutral-outline"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />

            <InputRightElement w="2.5rem">
              <IconButton
                variant="icon-button"
                onClick={() => setShowPassword(!showPassword)}
                icon={
                  showPassword ? (
                    <NotVisibleIcon boxSize="20px" />
                  ) : (
                    <VisibleIcon boxSize="20px" />
                  )
                }
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Text
          color={errorTextColor}
          h="1.5rem"
          fontSize="sm"
          textAlign="center"
          fontWeight={500}
        >
          {errorMsg}
        </Text>

        <HStack w="100%" justify="end" spacing="1rem">
          <Button w="50%" onClick={onClose}>
            Cancel
          </Button>
          <Button
            isDisabled={
              formData.username.length < 3 || !formData.password.length
            }
            variant="solid-blue"
            w="50%"
            isLoading={loading}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default SigninForm;
