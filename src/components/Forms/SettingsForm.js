import React, { useState, useContext } from "react";
import {
  Flex,
  Stack,
  Text,
  Box,
  Input,
  FormControl,
  FormLabel,
  Select,
  CheckboxGroup,
  Checkbox,
  useColorMode,
} from "@chakra-ui/react";

import UserContext from "store/UserContext";

const SettingsForm = ({ cardSide = "front" }) => {
  const [formData, setFormData] = useState({
    textAlign: "left",
    isBold: false,
    isItalic: false,
    isUnderlined: false,
  });

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { userData } = useContext(UserContext);
  // CHECKBOX GROUP FOR BOLD, ITALIC AND UNDERLINE SETTINGS
  // SELECT FOR DEFAULT FONT SIZE
  // SELECT FOR ALIGNMENT
  return (
    <Flex direction="column" align="center">
      <Stack
        p={{ base: "1.5rem 1rem", sm: "1.5rem" }}
        bg={isDark ? "gray.800" : "#fff"}
        borderRadius="10px"
        // borderRadius={{ base: "10px", sm: "12px" }}
        boxShadow="md"
        align="center"
        justify="center"
        w="100%"
        spacing="1.5rem"
        maxW={{ base: "90%", sm: "450px", md: "540px" }}
      >
        <CheckboxGroup colorScheme="green">
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            <Checkbox value="bold" fontWeight="700">
              Bold
            </Checkbox>
            <Checkbox value="italic" fontStyle="italic">
              Italic
            </Checkbox>
            <Checkbox value="underlined" textDecoration="underline">
              Underlined
            </Checkbox>
          </Stack>
        </CheckboxGroup>
        {/* <FormControl isRequired>
          <FormLabel>Set Title</FormLabel>
          <Input
            variant="neutral-outline"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
              if (errors.title) setErrors(INITIAL_ERROR_STATE);
            }}
          />
        </FormControl> */}

        {/* <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            variant="neutral-outline"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </FormControl> */}

        {/* <FormControl isRequired>
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
        </FormControl> */}

        {/* <Tooltip
          placement="right"
          openDelay={500}
          label="If public, your set will be searchable by other users"
          shouldWrapChildren={true}
          hasArrow
        > */}
        {/* <Checkbox
            colorScheme="gray"
            spacing=".75rem"
            isChecked={formData.is_public}
            onChange={(e) =>
              setFormData({ ...formData, is_public: e.target.checked })
            }
            fontWeight={500}
          >
            Make Set Public
          </Checkbox> */}
        {/* </Tooltip> */}
      </Stack>
    </Flex>
  );
};

export default SettingsForm;
