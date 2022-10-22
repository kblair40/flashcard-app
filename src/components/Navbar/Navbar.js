import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Link,
  useColorMode,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { Link as RRLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { HamburgerIcon, CloseIcon } from "utils/icons";
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

  const { isOpen, onToggle, onClose } = useDisclosure();
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
      console.log("SIGN OUT");
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
    <Box
    // position="fixed"
    // top={0}
    // left={0}
    // right={0}
    //
    >
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        px={{ base: 4 }}
        shadow="sm"
        align={"center"}
        // position="relative"
        position="fixed"
        top={0}
        left={0}
        right={0}
        justify={{ base: "space-between", md: "unset" }}
        zIndex={1000}
      >
        {/* START MOBILE NAV */}
        <Flex
          display={{ base: "flex", md: "none" }}
          justify="space-between"
          align="center"
          w="100%"
        >
          <IconButton
            isDisabled={!isSignedIn}
            zIndex={1000}
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
            <SetSearch isDark={isDark} isDisabled={!isSignedIn} />
          </Box>

          <AvatarMenu
            handleClickSignout={() => handleClickSignInOrSignOut("signout")}
          />

          {!isSignedIn ? (
            <Button
              color={"white"}
              bg={"blue.400"}
              _hover={{ bg: "blue.500" }}
              _active={{ bg: "blue.600" }}
              size="sm"
              onClick={onAuthModalOpen}
            >
              Log In
            </Button>
          ) : (
            <RRLink to="/">
              <Image
                maxWidth={"243px"}
                src={logo_img}
                w={{ base: "32px", md: "119px", lg: "140px" }}
              />
            </RRLink>
          )}
        </Flex>

        <Box display={{ md: "none" }}>
          <AuthButtons
            isSignedIn={isSignedIn}
            onClick={handleClickSignInOrSignOut}
          />
        </Box>

        <Flex
          display={{ base: "none", md: "flex" }}
          align="center"
          mr={{ base: 2 }}
          // border="1px solid white"
        >
          <RRLink to="/">
            <Image
              maxWidth={"243px"}
              src={logo_img}
              w={{ base: "32px", md: "119px", lg: "140px" }}
            />
          </RRLink>

          <Flex display={{ base: "none", md: "flex" }} ml={{ md: 6, lg: 10 }}>
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
          pr={{ lg: "1rem" }}
        >
          <Box
            w={{ lg: "80%" }}
            mx={{ md: "auto" }}
            px={{ md: "1rem", lg: "4rem" }}
            border="1px solid transparent"
          >
            <Box w="100%" maxW={"400px"}>
              <SetSearch isDark={isDark} isDisabled={!isSignedIn} />
            </Box>
          </Box>

          <ThemeToggle
            mr={{ md: "1rem", lg: "2rem" }}
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
              px="14px"
              size="sm"
              fontSize={"sm"}
              fontWeight={600}
              variant="solid-blue"
              onClick={() =>
                handleClickSignInOrSignOut(isSignedIn ? "signout" : "signup")
              }
            >
              {isSignedIn ? "Sign Out" : "Sign Up"}
            </Button>
          )}
        </Flex>
      </Flex>

      <MobileNav
        show={isOpen}
        onToggle={onToggle}
        onClose={onClose}
        isSignedIn={isSignedIn}
        signout={() => handleClickSignInOrSignOut("signout")}
      />
    </Box>
  );
}

const shadows = {
  xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
  inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
  "dark-lg":
    "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px",
};

const MobileNav = ({ show, onToggle, signout, isSignedIn, onClose }) => {
  const isMd = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    if (isMd) {
      if (show) onToggle();
    }
  }, [isMd, show, onToggle]);

  useEffect(() => {
    if (!isSignedIn) onClose();
  }, [onClose, isSignedIn]);

  return (
    <motion.div
      style={{
        position: "fixed",
        backgroundColor: "white",
        boxShadow: shadows["sm"],
        zIndex: 100,
      }}
      initial={{ y: "-100%" }}
      animate={show && !isMd ? { y: 0 } : { y: -180 }}
      transition={{ duration: 0.25 }}
    >
      <Stack
        zIndex={10000000}
        bg={useColorModeValue("white", "gray.800")}
        p={4}
        display={{ md: "none" }}
        w="100vw"
      >
        {MOBILE_NAV_ITEMS.map((navItem) => {
          if (isSignedIn && navItem.label === "Sign In") return null;
          else if (!isSignedIn && navItem.label === "Sign Out") return null;

          return (
            <MobileNavItem
              onClick={navItem.label === "Sign Out" ? signout : null}
              key={navItem.label}
              {...navItem}
            />
          );
        })}
      </Stack>
    </motion.div>
  );
};

const MobileNavItem = ({ label, href, onClick }) => {
  return (
    <Flex
      py={2}
      as={href ? Link : undefined}
      href={href ?? "#"}
      justify={"center"}
      align={"center"}
      onClick={onClick ? onClick : null}
      _hover={{
        textDecoration: "none",
        bg: "gray.50",
      }}
      _active={{
        // textDecoration: "none",
        bg: "gray.100",
      }}
      w="100%"
      border="1px solid #ccc"
      cursor="pointer"
      // isDisabled={!isSignedIn}
      // w={href ? undefined : "100%"}
      // variant={href ? "ghost" : undefined}
    >
      <Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
        {label}
      </Text>
    </Flex>
  );
};

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
      variant="solid-blue"
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
  // console.log("PATHNAME:", pathname);

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

const MOBILE_NAV_ITEMS = [...NAV_ITEMS, { label: "Sign Out", href: null }];
