import React, { useContext, useEffect, useState } from "react";
import { Flex, Text, IconButton, Box, Grid, GridItem } from "@chakra-ui/react";

import { EditIcon } from "utils/icons";
import SetContext from "store/SetContext";
import Sidebar from "./Sidebar";
import Editors from "./Editors";
import EditModal from "components/Modals/EditModal";

const CreateSet = () => {
  const { flashcardSetData: setData } = useContext(SetContext);

  return (
    <Grid
      boxSizing="border-box"
      w="100vw"
      maxW="100vw"
      h="calc(100vh - 62px)"
      overflow="hidden"
      justifyContent="center"
      templateRows={{
        base: ".8fr 6fr 1.6fr",
        sm: "1fr 8fr",
      }}
      templateColumns={{
        base: "1fr",
        sm: "1fr 3fr",
      }}
      templateAreas={{
        base: `"meta"
               "editors"
               "sidebar"`,
        sm: `"sidebar meta"
             "sidebar editors"`,
      }}
      rowGap={{ base: "8px", sm: "1rem" }}
      columnGap={{ base: "8px", sm: "16px" }}
    >
      <GridItem area="sidebar">
        <Sidebar />
      </GridItem>

      <GridItem area="meta">
        <SetMeta setData={setData} width="100%" />
      </GridItem>

      <GridItem area="editors" h="100%" overflowY="auto" mb="8px">
        <Editors />
      </GridItem>
    </Grid>
  );
};

export default CreateSet;

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
