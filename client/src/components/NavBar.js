import React from 'react'
import { useHistory, NavLink } from "react-router-dom";
import {Heading, Box, Flex, Text, Button, Stack, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';


function NavBar({ setIsAuthenticated, setUser, isAuthenticated }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const history = useHistory();

  function handleLogin() {
    history.push("/login");
  }

  function handleSignup() {
    history.push("/signup");
  }

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE"
    })
    .then(() => {
        setIsAuthenticated(false);
        setUser(null);
        history.push("/")
    });
  }

  function handleMyPage() {
    history.push("/mypage");
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="orange.300"
      color="white"
    >
      <Flex align="center" mr={5}>
        <img src="../image/tshirt-icon.png" alt="logo" style={{height: "30px"}} />
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          <NavLink to="/" >
            T-studio 
          </NavLink>
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      {/* <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Text>Docs</Text>
        <Text>Examples</Text>
        <Text>Blog</Text>
      </Stack> */}

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {isAuthenticated ? 
        <Button
          variant="outline"
          _hover={{ bg: "orange.200", borderColor: "orange.200" }}
          mr={5}
          onClick={handleLogout}
        >
          Logout
        </Button> : 
        <Button
          variant="outline"
          _hover={{ bg: "orange.200", borderColor: "orange.200" }}
          mr={5}
          onClick={handleLogin}
        >
          Login
        </Button>}
        {isAuthenticated ? 
        <Button
          variant="outline"
          _hover={{ bg: "orange.200", borderColor: "orange.200" }}
          onClick={handleMyPage}
        >
          My page
        </Button> :
        <Button
          variant="outline"
          _hover={{ bg: "orange.200", borderColor: "orange.200" }}
          onClick={handleSignup}
        >
          Sgin Up
        </Button>}
      </Box>
    </Flex>
  );
}

export default NavBar