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
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
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
      // console.log("RESPONSE:", response.data);

      if (response && response.data) {
        onAuthSuccess(response.data.token);
      }
    } catch (e) {
      console.error("FAILED SIGNING UP:", e.response);
      setErrorMsg("Username and/or password is incorrect");
    }

    setLoading(false);
  };

  const iconButtonProps = {
    size: "sm",
    position: "relative",
    bottom: "4px",
    width: "100%",
    borderRadius: "4px",
    bg: "transparent",
    transitionDuration: "0.3s",
    _hover: { bg: "gray.50" },
    _active: { bg: "gray.100" },
  };

  return (
    <Box>
      <VStack spacing="1rem">
        <Heading mb="2rem">Sign In</Heading>

        <FormControl isRequired>
          <FormLabel fontSize="sm">Username</FormLabel>
          <Input
            size="sm"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm">Password</FormLabel>
          <InputGroup>
            <Input
              size="sm"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <InputRightElement w="2.5rem">
              <IconButton
                {...iconButtonProps}
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
          color="red"
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
            variant="solid-blue"
            w="50%"
            isLoading={loading}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default SigninForm;
