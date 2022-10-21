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
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { Link as RRLink, useLocation } from "react-router-dom";

import { HamburgerIcon, ChevronIcon, CloseIcon } from "utils/icons";
import logo from "assets/images/logo.svg";
import logo_dk from "assets/images/logo-dk.svg";
import logo_sm from "assets/images/logo-sm.svg";
import UserContext from "store/UserContext";
import AvatarMenu from "./AvatarMenu";
import SetSearch from "./SetSearch";
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
      let defaultTab = signInOrSignOut === "signin" ? 1 : 0;
      setAuthModalDefaultTab(defaultTab);

      onAuthModalOpen();
    } else if (signInOrSignOut === "signout") {
      handleSignOut();
    } else {
      throw new Error("Invalid value: must be 'signin' or 'signout'");
    }
  };

  const logo_img = useBreakpointValue({
    base: logo_sm,
    md: isDark ? logo_dk : logo,
  });

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        px={{ base: 4 }}
        shadow="sm"
        align={"center"}
        position="relative"
        justify={{ base: "space-between", md: "unset" }}
      >
        {/* START MOBILE NAV */}
        <Flex
          // border="1px solid"
          // borderColor={"rgba(0,0,255, 0.2)"}
          display={{ base: "flex", md: "none" }}
          justify="space-between"
          align="center"
          w="100%"
        >
          <IconButton
            zIndex={100000}
            display={{ md: "none" }}
            mr={{ base: 2, sm: 6 }}
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />

          <Box
            mx={{ base: "1.5rem", sm: "2.5rem" }}
            w={{ base: "100%" }}
            maxW={{ base: "220px", sm: "260px" }}
          >
            <SetSearch isDisabled={!isSignedIn} />
          </Box>

          <RRLink to="/">
            <Image
              // border="1px solid red"
              maxWidth={"243px"}
              src={logo_img}
              w={{ base: "32px", md: "119px", lg: "140px" }}
            />
          </RRLink>
        </Flex>
        {/* END MOBILE NAV */}

        <Box
          display={{ md: "none" }}
          // w="fit-content"
          // border="1px solid #ccc"
        >
          <AuthButtons
            isSignedIn={isSignedIn}
            onClick={handleClickSignInOrSignOut}
          />
        </Box>

        <Flex
          display={{ base: "none", md: "flex" }}
          align="center"
          // flex={{ base: 1, lg: 0.5 }}
          mr={{ base: 2 }}
          // border="1px solid green"
        >
          <RRLink to="/">
            <Image
              // border="1px solid green"
              maxWidth={"243px"}
              src={logo_img}
              w={{ base: "32px", md: "119px", lg: "140px" }}
            />
          </RRLink>

          <Flex
            // border="1px solid red"
            display={{ base: "none", md: "flex" }}
            ml={{ md: 6, lg: 10 }}
          >
            <DesktopNav isDark={isDark} isSignedIn={isSignedIn} />
          </Flex>

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={onAuthModalClose}
            defaultTab={authModalDefaultTab}
          />
        </Flex>

        <Flex
          display={{ base: "none", md: "flex" }}
          flex={1}
          justify={"flex-end"}
          align="center"
          // border="1px solid #ccc"
        >
          <Box
            w={{ lg: "90%" }}
            ml={{ md: ".5rem", lg: "2rem" }}
            border="1px solid transparent"
            mr={{ md: "1rem", lg: "2rem" }}
          >
            <SetSearch isDisabled={!isSignedIn} />
          </Box>

          <ThemeToggle
            mr={{ md: "1rem" }}
            display={{ base: "none", md: "block" }}
          />

          {!isSignedIn && (
            <Button
              mr={{ md: "1.5rem", lg: "2rem" }}
              size="sm"
              fontSize={"sm"}
              fontWeight={500}
              variant={"link"}
              color={isDark ? "gray.50" : "gray.800"}
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
              // border="1px solid red"
              px="12px"
              size="sm"
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"blue.400"}
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
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const AuthButtons = ({ isSignedIn, handleClickSignInOrSignOut }) => {
  return isSignedIn ? (
    <AvatarMenu
      handleClickSignout={() => handleClickSignInOrSignOut("signout")}
    />
  ) : (
    <Button
      minW="max-content"
      display={{ base: "none", md: "block" }}
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
  );
};

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
            whiteSpace="nowrap"
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
    label: "Create Set",
    href: "/create",
  },
  {
    label: "Manage Sets",
    href: "/manage-sets",
  },
];
