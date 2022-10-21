import React from "react";
import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Avatar,
} from "@chakra-ui/react";

import { LogoutIcon } from "utils/icons";

const AvatarMenu = ({ handleClickSignout }) => {
  return (
    <Flex
      alignItems={"center"}
      display={{ base: "none", md: "flex" }}
      //
    >
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Avatar size={"sm"} bg="primary.300" />
        </MenuButton>

        <MenuList py={0}>
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
