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

  const tabStyles = {
    px: "2.5rem",
    _selected: selectedStyles,
  };

  return (
    <Tabs
      variant="unstyled"
      align="center"
      defaultIndex={defaultTab}
      data-testid="authTabs"
    >
      <TabList mb="1rem">
        <Tab {...tabStyles}>Sign Up</Tab>
        <Tab {...tabStyles}>Sign In</Tab>
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
