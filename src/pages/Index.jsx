import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Heading, FormControl, FormLabel, Input, Button, Text, useToast } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-2mky.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setIsLoggedIn(true);
        toast({
          title: "Login successful.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        throw new Error("Invalid login credentials.");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <VStack spacing={4} align="flex-start">
          <Heading as="h1">Interactive API Client</Heading>
          {!isLoggedIn ? (
            <Box>
              <Heading as="h2" size="lg">
                Login
              </Heading>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired mt={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button leftIcon={<FaSignInAlt />} colorScheme="teal" mt={4} onClick={handleLogin}>
                Login
              </Button>
            </Box>
          ) : (
            <Box>
              <Text>Welcome, you are logged in!</Text>
              {/* TODO: Implement permissions and roles display */}
              {/* TODO: Implement health check feature */}
            </Box>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
