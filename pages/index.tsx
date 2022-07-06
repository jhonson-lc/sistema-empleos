import { Stack, Text, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";

import Button from "../components/Button";

const Home: NextPage = () => {
  return (
    <Stack
      _after={{
        content: "''",
        display: "block",
        height: "100%",
        width: "100vw",
        backgroundImage: "url(../home.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
      direction="row"
      h="82vh"
      position="relative"
      w="full"
    >
      <Stack
        alignItems="start"
        gap={6}
        p={[12, 32]}
        w={{ base: "100%", md: "50%" }}
      >
        <Heading
          color="primary.500"
          fontSize={[36, 48]}
          fontWeight={700}
          lineHeight={1}
          textAlign="center"
        >
          Busca el empleo que se adapte a tus necesidades
        </Heading>
        <Text color="#ffffff" fontSize={[18]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </Text>
        <Button
          bg="primary.500"
          color="#ffffff"
          href="/auth/register"
          text="Crear una cuenta"
        />
      </Stack>
    </Stack>
  );
};

export default Home;
