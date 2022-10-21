import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";

import SignupForm from "../SignupForm";
import SigninForm from "../SigninForm";

const AuthModalTabs = ({ onClose, onAuthSuccess, defaultTab }) => {
  const selectedStyles = {
    fontWeight: 600,
    borderBottom: "1px solid",
    borderColor: useColorModeValue("blue.700", "blue.300"),
    color: useColorModeValue("blue.700", "blue.300"),
  };

  return (
    <Tabs isFitted defaultIndex={defaultTab}>
      <TabList mb="1rem">
        <Tab _selected={selectedStyles}>Sign Up</Tab>
        <Tab _selected={selectedStyles}>Sign In</Tab>
      </TabList>

      <TabPanels>
        <TabPanel px={{ base: ".25rem", sm: ".5rem" }}>
          <SignupForm onClose={onClose} onAuthSuccess={onAuthSuccess} />
        </TabPanel>
        <TabPanel px={{ base: ".25rem", sm: ".5rem" }}>
          <SigninForm onClose={onClose} onAuthSuccess={onAuthSuccess} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AuthModalTabs;
