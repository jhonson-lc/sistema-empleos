import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Footer from "components/Footer";

import NavBar from "../../components/header/NavBar";

interface Props {
  children: React.ReactNode;
  session: any;
}

const Layout: React.FC<Props> = ({ children, session }) => {
  return (
    <Box as="main">
      <NavBar session={session} />

      <Container maxW="full" overflow="hidden" p={0}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
