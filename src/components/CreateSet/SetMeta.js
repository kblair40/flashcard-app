import React, { useState, useEffect } from "react";
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";

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
      <Flex h={{ base: "max-content" }} w="100%" maxWidth="700px">
        <Flex
          w={{ base: "35%" }}
          direction="row"
          flexWrap="wrap"
          align="center"
          mr="1.25rem"
        >
          <Text fontWeight={600} mr="6px" noOfLines={1}>
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

        <Flex
          w={{ base: "35%" }}
          direction="row"
          flexWrap="wrap"
          align="center"
        >
          <Text fontWeight={600} mr="6px" noOfLines={1}>
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

        <Flex
          w={{ base: "30%" }}
          direction="row"
          flexWrap="wrap"
          align="center"
          justify="end"
        >
          <IconButton
            onClick={() => setShowEditModal((prev) => !prev)}
            variant="icon-button"
            icon={<EditIcon boxSize="18px" />}
          />
        </Flex>
      </Flex>

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
