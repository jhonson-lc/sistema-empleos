import React from "react";
import { Box, Container } from "@chakra-ui/react";

import NavBar from "../../components/header/NavBar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box as="main">
      <NavBar />

      <Container maxW="full" overflow="hidden" p={0}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
