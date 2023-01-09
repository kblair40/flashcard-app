import React from "react";
import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { LogoutIcon, SettingsIcon } from "utils/icons";

const AvatarMenu = ({ handleClickSignout }) => {
  const bg = useColorModeValue("blue.300", "blue.800");
  const menuBg = useColorModeValue("gray.50", "gray.700");
  return (
    <Flex alignItems={"center"} display={{ base: "none", md: "flex" }}>
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Avatar size={"sm"} bg={bg} />
        </MenuButton>

        <MenuList py={0} bg={menuBg}>
          <Link to="/settings">
            <MenuItem fontWeight="600" icon={<SettingsIcon boxSize="18px" />}>
              Settings
            </MenuItem>
          </Link>

          <MenuItem
            fontWeight="600"
            icon={<LogoutIcon boxSize="18px" />}
            onClick={handleClickSignout}
          >
            Signout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default AvatarMenu;
