import { Text, Container, Stack } from "@chakra-ui/react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Stack bg="primary.500" mt={6} py={6} w="full">
      <Container maxW="container.xl">
        <Text color="white" textAlign="center">
          Copyright © 2022. All rights reserved.
        </Text>
      </Container>
    </Stack>
  );
};

export default Footer;
