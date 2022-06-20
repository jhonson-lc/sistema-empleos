import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";

import theme from "../../lib/theme";

interface ChakraProps {
  cookies?: string;
  children: React.ReactNode;
}

const Chakra: React.FC<ChakraProps> = ({ children, cookies }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export function getServerSideProps({ req }: GetServerSidePropsContext) {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  };
}

export default Chakra;
