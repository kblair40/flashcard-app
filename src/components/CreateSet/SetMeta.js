import React, { useState, useEffect } from "react";
import { Box, Flex, Text, IconButton, Stack } from "@chakra-ui/react";

import { EditIcon } from "utils/icons";
import EditModal from "components/Modals/EditModal";

const SetMeta = ({ setData, width = "100%" }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [localData, setLocalData] = useState();

  let category, title;
  let data = {};

  let border = "1px solid #ccc";

  useEffect(() => {
    if (setData) setLocalData(setData);
  }, [setData]);

  if (!localData) {
    return <Box h="70px" border={border} />;
  }

  if (localData) {
    category = localData.category;
    title = localData.title;

    data = {
      category: localData.category,
      title: localData.title,
      desc: localData.description,
      id: localData._id,
    };
  }

  return (
    <Flex
      h={{ base: "100%", sm: "70px" }}
      align="center"
      width={width}
      pr={{ base: "8px", sm: "16px" }}
      pl={{ base: "8px", sm: "0" }}
      flexWrap="wrap"
      justifyContent="center"
    >
      <Stack
        h={{ base: "max-content" }}
        w="100%"
        maxWidth="700px"
        direction="row"
        spacing={{ base: "1rem" }}
        align={{ md: "center" }}
        justify={{ base: "center" }}
      >
        <Flex direction={{ base: "column", md: "row" }} mr="1.25rem">
          <Text fontWeight={700} mr="6px" noOfLines={1}>
            Category:
          </Text>
          <Text
            fontWeight={500}
            fontSize="sm"
            textTransform="capitalize"
            noOfLines={1}
          >
            {category}
          </Text>
        </Flex>

        <Flex direction={{ base: "column", md: "row" }}>
          <Text fontWeight={700} mr="6px" noOfLines={1}>
            Title:
          </Text>
          {title && (
            <Text
              fontWeight={500}
              fontSize="sm"
              textTransform="capitalize"
              noOfLines={1}
            >
              {title}
            </Text>
          )}
        </Flex>

        <Flex pl={{ base: "2rem" }}>
          <IconButton
            onClick={() => setShowEditModal((prev) => !prev)}
            variant="icon-button"
            icon={<EditIcon boxSize="17px" />}
            size="sm"
            rounded="full"
          />
        </Flex>
      </Stack>

      {showEditModal && (
        <EditModal
          setData={data}
          onPatchSuccess={({ category, title }) => {
            setLocalData({ ...localData, category, title });
          }}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </Flex>
  );
};

export default SetMeta;
