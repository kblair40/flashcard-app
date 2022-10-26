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
  Checkbox,
  useColorMode,
  Button,
} from "@chakra-ui/react";

import { toTitleCase } from "utils/helpers";
import { options } from "./settings-options";
import UserContext from "store/UserContext";

const SettingsForm = ({ cardSide }) => {
  const [formData, setFormData] = useState({
    textAlign: "left",
    fontSize: "medium",
    isBold: false,
    isItalic: false,
    isUnderlined: false,
  });

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { userData } = useContext(UserContext);

  const handleChangeCheck = (e) => {
    const { value, checked } = e.target;
    console.log("VALUE/CHECKED:", { value, checked });

    setFormData({ ...formData, [`${value}`]: checked });
  };

  const handleChangeSelect = (e) => {
    const { id, value } = e.target;

    console.log("VALUE/ID:", { value, id });

    setFormData({ ...formData, [`${id}`]: value });
  };

  // CHECKBOX GROUP FOR BOLD, ITALIC AND UNDERLINE SETTINGS
  // SELECT FOR DEFAULT FONT SIZE
  // SELECT FOR ALIGNMENT
  const checkboxProps = {
    colorScheme: "gray",
    onChange: (e) => handleChangeCheck(e),
  };

  return (
    <Flex direction="column" align="center">
      <Stack
        p={{ base: "1.5rem 1rem", sm: "1.5rem" }}
        bg={isDark ? "gray.800" : "#fff"}
        borderRadius="10px"
        boxShadow="md"
        align="center"
        justify="center"
        w="100%"
        spacing="1.5rem"
      >
        <Flex direction="column">
          <Text fontWeight="500" mb="6px" fontSize="md">
            Text Styles
          </Text>
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            <Checkbox
              {...checkboxProps}
              isChecked={formData.isBold}
              value="isBold"
              fontWeight="700"
            >
              Bold
            </Checkbox>
            <Checkbox
              {...checkboxProps}
              isChecked={formData.isItalic}
              value="isItalic"
              fontStyle="italic"
            >
              Italic
            </Checkbox>
            <Checkbox
              {...checkboxProps}
              isChecked={formData.isUnderlined}
              value="isUnderlined"
              textDecoration="underline"
            >
              Underlined
            </Checkbox>
          </Stack>
        </Flex>

        <FormControl>
          <FormLabel fontSize="md" mb="6px">
            Text Size
          </FormLabel>
          <Select
            variant="neutral-outline"
            onChange={handleChangeSelect}
            value={formData.fontSize}
            id="fontSize"
          >
            {options.sizes.map((opt, i) => {
              return (
                <option key={i} value={opt}>
                  {toTitleCase(opt)}
                </option>
              );
            })}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel fontSize="md" mb="6px">
            Text Alignment
          </FormLabel>
          <Select
            variant="neutral-outline"
            onChange={handleChangeSelect}
            value={formData.textAlign}
            id="textAlign"
          >
            {options.alignment.map((opt, i) => {
              return (
                <option key={i} value={opt}>
                  {toTitleCase(opt)}
                </option>
              );
            })}
          </Select>
        </FormControl>

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
