import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Button,
  Avatar,
} from "@chakra-ui/react";

const AvatarMenu = ({ handleClickSignout }) => {
  const navigate = useNavigate();

  return (
    <Flex alignItems={"center"}>
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Avatar size={"sm"} bg="blue.400" />
        </MenuButton>
        <MenuList>
          <MenuItem>Link 1</MenuItem>
          <MenuItem>Link 2</MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleClickSignout}>Signout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default AvatarMenu;
