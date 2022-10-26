import React, { useContext } from "react";
import {
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
} from "@chakra-ui/react";

import UserContext from "store/UserContext";
import SettingsForm from "components/Forms/SettingsForm";

const Settings = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { userData } = useContext(UserContext);
  console.log("USER DATA:", userData);

  return (
    <Flex justifyContent="center" pt="61px">
      <Flex
        direction="column"
        align="center"
        mt="2rem"
        w="100%"
        maxW={{ md: "900px" }}
        minW={{ base: "320px" }}
        px={{ base: "16px", sm: "24px", md: "64px" }}
      >
        <Text
          textAlign={{ sm: "center" }}
          lineHeight="1.4"
          fontSize="lg"
          fontWeight="500"
        >
          Change the default styles applied to a flashcard you are
          editing/creating.
        </Text>

        <Text textAlign={{ sm: "center" }} mt="8px" lineHeight={1.4}>
          For example, if you typically use bold, large-font text that is
          center-aligned, change the settings below to reflect that. When you go
          to edit or create a new card, the styles will be applied
          automatically. Don't worry, you can override your default settings
          when you are creating/editing your card
        </Text>

        <Tabs align="center" mt="1.5rem" isFitted>
          <TabList w="300px" fontWeight="400">
            <Tab
              _selected={{
                fontWeight: "600",
                color: isDark ? "blue.300" : "blue.600",
                borderBottomColor: isDark ? "blue.300" : "blue.600",
              }}
            >
              Card Front
            </Tab>
            <Tab
              _selected={{
                fontWeight: "600",
                color: isDark ? "blue.300" : "blue.600",
                borderBottomColor: isDark ? "blue.300" : "blue.600",
              }}
            >
              Card Back
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {userData && userData.default_styles ? (
                <SettingsForm cardSide={"Front"} />
              ) : null}
            </TabPanel>
            <TabPanel>
              {userData && userData.default_styles ? (
                <SettingsForm cardSide={"Back"} />
              ) : null}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default Settings;
