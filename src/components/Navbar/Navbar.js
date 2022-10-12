import React, { useContext, useState } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { Link as RRLink, useLocation } from "react-router-dom";

import { HamburgerIcon, ChevronIcon, CloseIcon } from "utils/icons";
import logo from "assets/images/logo.svg";
import logo_dk from "assets/images/logo-dk.svg";
import UserContext from "store/UserContext";
import AvatarMenu from "./AvatarMenu";
import ThemeToggle from "./ThemeToggle";
import AuthModal from "components/Modals/AuthModal";

export default function WithSubnavigation() {
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState(0);
  const { handleSignOut, isSignedIn } = useContext(UserContext);
  console.log("IS SIGNED IN:", isSignedIn);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: isAuthModalOpen,
    onClose: onAuthModalClose,
    onOpen: onAuthModalOpen,
  } = useDisclosure();

  const handleClickSignInOrSignOut = (signInOrSignOut) => {
    if (signInOrSignOut === "signin" || signInOrSignOut === "signup") {
      // TODO: add/pass arg to modal to tell it which tab to show onMount
      let defaultTab = signInOrSignOut === "signin" ? 1 : 0;
      setAuthModalDefaultTab(defaultTab);

      onAuthModalOpen();
    } else if (signInOrSignOut === "signout") {
      handleSignOut();
    } else {
      throw new Error("Invalid value: must be 'signin' or 'signout'");
    }
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        px={{ base: 4 }}
        shadow="sm"
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <RRLink to="/">
            <Image
              maxWidth={"243px"}
              src={isDark ? logo_dk : logo}
              w={{ base: "170px", sm: "200px" }}
            />
          </RRLink>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav isDark={isDark} isSignedIn={isSignedIn} />
          </Flex>

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={onAuthModalClose}
            defaultTab={authModalDefaultTab}
          />
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <ThemeToggle display={{ base: "none", md: "block" }} />

          {!isSignedIn && (
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={500}
              variant={"link"}
              color={isDark ? "gray.50" : "gray.800"}
              href={"#"}
              onClick={() => handleClickSignInOrSignOut("signin")}
            >
              Sign In
            </Button>
          )}

          {isSignedIn ? (
            <AvatarMenu
              handleClickSignout={() => handleClickSignInOrSignOut("signout")}
            />
          ) : (
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"blue.400"}
              href={"#"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={() =>
                handleClickSignInOrSignOut(isSignedIn ? "signout" : "signup")
              }
            >
              {isSignedIn ? "Sign Out" : "Sign Up"}
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ isSignedIn, isDark }) => {
  const linkColor = useColorModeValue("gray.700", "gray.100");
  const linkHoverColor = useColorModeValue("gray.900", "white");

  const { pathname } = useLocation();
  console.log("PATHNAME:", pathname);

  return (
    <Stack align="center" direction={"row"} spacing={{ base: 2, sm: 4 }}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} p={2}>
          <Link
            cursor={!isSignedIn ? "not-allowed" : "pointer"}
            position="relative"
            display="inline-block"
            as={RRLink}
            to={(isSignedIn && navItem.href) ?? "#"}
            fontSize={"sm"}
            fontWeight={600}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,

              _after: {
                transform: "scaleX(1)",
              },
            }}
            _after={{
              content: `""`,
              width: "100%",
              bottom: 0,
              left: 0,
              position: "absolute",
              transform: pathname === navItem.href ? "scaleX(1)" : "scaleX(0)",
              transition: "all 0.2s",
              height: "1px",
              bg: isDark ? "gray.100" : "gray.700",
            }}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <ChevronIcon
            boxSize="20px"
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(270deg)" : "rotate(90deg)"}
            fill={"gray.600"}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Create New Set",
    href: "/create",
  },
  {
    label: "Manage Sets",
    href: "/manage-sets",
  },
  // {
  //   label: "Study",
  //   href: "/study",
  // },
];
