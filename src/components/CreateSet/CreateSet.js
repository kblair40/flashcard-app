import React, { useContext, useState } from "react";
import { Flex, Text, IconButton } from "@chakra-ui/react";

import { EditIcon } from "utils/icons";
import SetContext from "store/SetContext";
import Sidebar from "./Sidebar";
import Editors from "./Editors";
import EditModal from "components/Modals/EditModal";

const CreateSet = () => {
  const { flashcardSetData: setData } = useContext(SetContext);

  return (
    <Flex justify="center" w="100%" h="calc(100vh - 64px)" overflowY="hidden">
      <Sidebar width={{ base: "100%", sm: "30%", md: "25%" }} />

      <Flex
        direction="column"
        h="100%"
        width={{ base: "100%", sm: "70%", md: "75%" }}
      >
        <SetMeta setData={setData} />
        <Editors width={{ base: "100%" }} />
      </Flex>
    </Flex>
  );
};

export default CreateSet;

const SetMeta = ({ setData, width = "100%" }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  let category, title;

  if (setData) {
    category = setData.category;
    title = setData.title;
  }
  return (
    <Flex
      mt="1rem"
      h="70px"
      width={width}
      px={{ base: "8px", md: "16px" }}
      flexWrap="wrap"
      justifyContent="center"
    >
      <Flex h="max-content" w="100%" maxWidth="700px">
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
              ml={{ base: 0, md: "6px" }}
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
          justify="center"
        >
          <IconButton
            onClick={() => setShowEditModal((prev) => !prev)}
            variant="icon-button"
            icon={<EditIcon boxSize="18px" />}
          />
        </Flex>
      </Flex>

      {showEditModal && <EditModal isOpen={showEditModal} />}
    </Flex>
  );
};
