import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import SignupForm from "../SignupForm";
import SigninForm from "../SigninForm";

const AuthModalTabs = ({ onClose, onAuthSuccess, defaultTab }) => {
  return (
    <Tabs isFitted defaultIndex={defaultTab}>
      <TabList mb="1rem">
        <Tab>Sign Up</Tab>
        <Tab>Sign In</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <SignupForm onClose={onClose} onAuthSuccess={onAuthSuccess} />
        </TabPanel>
        <TabPanel>
          <SigninForm onClose={onClose} onAuthSuccess={onAuthSuccess} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AuthModalTabs;
