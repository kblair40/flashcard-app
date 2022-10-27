import React, { useContext, useState } from "react";
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

import api from "api";
import UserContext from "store/UserContext";
import SettingsForm from "components/Forms/SettingsForm";

const Settings = () => {
  const [saving, setSaving] = useState(false);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { userData, setUserData } = useContext(UserContext);

  const handleSubmit = async (cardSide, data) => {
    if (!userData || !userData.default_styles) return;

    setSaving(true);

    try {
      const response = await api.patch("/styles", {
        side: cardSide.toLowerCase(),
        styles: data,
      });
      console.log("\n\nSTYLE PATCH RESPONSE:", response.data.default_styles);

      if (response.data) {
        const { default_styles } = response.data;
        if (!default_styles.front || !default_styles.back) return;
        console.log("DEFAULT STYLES:", default_styles);
        setUserData({ ...userData, default_styles });
      }
    } catch (e) {
      console.log("FAILED TO PATCH USER DEFAULT STYLES:", e);
    }
    setSaving(false);
  };

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
              {userData &&
              userData.default_styles &&
              userData.default_styles.front &&
              userData.default_styles.back ? (
                <SettingsForm
                  saving={saving}
                  cardSide={"Front"}
                  defaultData={userData.default_styles.front}
                  onSubmit={handleSubmit}
                />
              ) : null}
            </TabPanel>
            <TabPanel>
              {userData && userData.default_styles ? (
                <SettingsForm
                  saving={saving}
                  cardSide={"Back"}
                  defaultData={userData.default_styles.back}
                  onSubmit={handleSubmit}
                />
              ) : null}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default Settings;
