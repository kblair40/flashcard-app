import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";

import { VisibleIcon, NotVisibleIcon } from "utils/icons";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [`${name}`]: value });

    if (errors[name]) {
      // clear all errors on change if the field being edited has an error.
      setErrors(INITIAL_ERROR_STATE);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    let errorObj = { ...INITIAL_ERROR_STATE };
    let foundError = false;
    for (let field in errorObj) {
      if (!formData[field]) {
        errorObj[field] = true;
        foundError = true;
      }
    }

    if (foundError) {
      setErrors({ ...errors, ...errorObj });
      setLoading(false);
      return;
    }

    const {
      first_name,
      last_name,
      email,
      username,
      password,
      confirm_password,
    } = formData;

    const tooShort = (charCount = 3) =>
      `Must be at least ${charCount} characters`;
    const tooLong = (charCount = 28) =>
      `Cannot be longer than ${charCount} characters`;

    if (first_name.length < 3) errorObj["first_name"] = tooShort();
    if (first_name.length > 28) errorObj["first_name"] = tooLong();
    if (last_name.length > 28) errorObj["last_name"] = tooLong();
    if (last_name.length > 28) errorObj["last_name"] = tooLong();
    if (username.length < 5) errorObj["username"] = tooShort(5);
    if (username.length > 24) errorObj["username"] = tooLong(24);
    if (password !== confirm_password) {
      errorObj["password"] = "Password does not match confirm password value";
      errorObj["confirm_password"] = "values must match";
    }
    if (password.length < 6) errorObj["password"] = tooShort(6);
    if (password.length > 24) errorObj["password"] = tooLong(24);

    // TODO - ADD HANDLING TO VALIDATE THAT EMAIL IS LIKELY A VALID EMAIL ADDRESS

    if (Object.values(errorObj).some(Boolean)) {
      console.log("SETTING ERRORS TO:", errorObj);
      setErrors(errorObj);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/signup", {
        ...formData,
      });

      if (response && response.data) {
        const { token, user } = response.data;
        onAuthSuccess(token, user);
      }
    } catch (e) {
      if (e.response.data) {
        const { error_field, error_msg } = e.response.data;

        if (error_field && error_msg) {
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
      <VStack spacing="1rem">
        <HStack w="100%" spacing="1rem">
          <FormControl isRequired isInvalid={!!errors["first_name"]}>
            <FormLabel mb="4px" fontSize="sm">
              First Name
            </FormLabel>
            <Input
              variant="neutral-outline"
              w="100%"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <FormErrorMessage>
              {errors["first_name"] && typeof errors["first_name"] === "boolean"
                ? "First name is required"
                : errors["first_name"]}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors["last_name"]}>
            <FormLabel mb="4px" fontSize="sm">
              Last Name
            </FormLabel>
            <Input
              variant="neutral-outline"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />

            <FormErrorMessage>
              {errors["last_name"] && typeof errors["last_name"] === "boolean"
                ? "Last name is required"
                : errors["last_name"]}
            </FormErrorMessage>
          </FormControl>
        </HStack>

        <FormControl isRequired isInvalid={!!errors["email"]}>
          <FormLabel mb="4px" fontSize="sm">
            Email address
          </FormLabel>
          <Input
            variant="neutral-outline"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <FormErrorMessage>
            {errors["email"] && typeof errors["email"] === "boolean"
              ? "Email is required"
              : errors["email"]}
          </FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors["username"]}>
          <FormLabel mb="4px" fontSize="sm">
            Username
          </FormLabel>
          <Input
            variant="neutral-outline"
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

        <FormControl isRequired isInvalid={!!errors["password"]}>
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
            />

            <InputRightElement w="2.5rem">
              <IconButton
                variant="icon-button"
                onClick={() => setShowPassword(!showPassword)}
                icon={
                  showPassword ? (
                    <NotVisibleIcon boxSize="22px" />
                  ) : (
                    <VisibleIcon boxSize="22px" />
                  )
                }
              />
            </InputRightElement>
          </InputGroup>

          <FormErrorMessage>
            {errors["Password"] && typeof errors["password"] === "boolean"
              ? "Email is required"
              : errors["password"]}
          </FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors["confirm_password"]}>
          <FormLabel mb="4px" fontSize="sm">
            Confirm Password
          </FormLabel>
          <InputGroup>
            <Input
              variant="neutral-outline"
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
            />
            <InputRightElement w="2.5rem">
              <IconButton
                variant="icon-button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                icon={
                  showConfirmPassword ? (
                    <NotVisibleIcon boxSize="20px" />
                  ) : (
                    <VisibleIcon boxSize="20px" />
                  )
                }
              />
            </InputRightElement>
          </InputGroup>

          <FormErrorMessage>
            {errors["confirm_password"] &&
            typeof errors["confirm_password"] === "boolean"
              ? "Please confirm your password"
              : errors["confirm_password"]}
          </FormErrorMessage>
        </FormControl>

        <HStack pt="1.5rem" w="100%" justify="end" spacing="1rem">
          <Button w="50%" onClick={onClose}>
            Cancel
          </Button>

          <Button
            w="50%"
            isLoading={loading}
            onClick={handleSubmit}
            variant="solid-blue"
          >
            Submit
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default SignupForm;
