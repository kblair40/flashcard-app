import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import SignupForm from "../SignupForm";
import SigninForm from "../SigninForm";

const AuthModalTabs = ({ onClose }) => {
  return (
    <Tabs isFitted>
      <TabList mb="1rem">
        <Tab>Sign Up</Tab>
        <Tab>Sign In</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <SignupForm onClose={onClose} />
        </TabPanel>
        <TabPanel>
          <SigninForm onClose={onClose} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AuthModalTabs;
