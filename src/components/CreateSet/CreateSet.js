import React, { useContext } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import SetContext from "store/SetContext";
import Sidebar from "./Sidebar";
import Editors from "./Editors";
import SetMeta from "./SetMeta";

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
