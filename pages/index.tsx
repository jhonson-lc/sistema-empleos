import { Stack, Text, Heading, HStack, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";

import Button from "../components/Button";

const Home: NextPage = () => {
  return (
    <Stack
      _after={{
        content: "''",
        display: "block",
        height: "100%",
        width: "100%",
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
      h={["100vh", "80vh"]}
      position="relative"
      w="full"
    >
      <Stack
        alignItems="center"
        flexDirection={"column"}
        gap={6}
        h={"full"}
        justifyContent="center"
        textAlign={"center"}
        w={"100%"}
      >
        <Heading
          color="primary.500"
          fontSize={[32, 48]}
          fontWeight={700}
          lineHeight={1}
          maxW={800}
          textAlign="center"
        >
          Busca el empleo que se adapte a tus necesidades
        </Heading>
        <Text color="#ffffff" fontSize={[16]} fontWeight={300} maxW={700}>
          El trabajo en equipo es la habilidad de trabajar juntos con un
          objetivo en común. La habilidad de lograr logros personales
          relacionados con los objetivos empresariales.
        </Text>
        <HStack display={{ base: "none", md: "flex" }} spacing={6}>
          <Button
            bg="primary.500"
            color="#ffffff"
            href="/help"
            text="Mira como funciona"
          />
          <Button
            bg="whiteAlpha.900"
            color="primaru.500"
            href="/auth/register"
            text="Empezar"
          />
        </HStack>
        <VStack display={{ base: "flex", md: "none" }} spacing={6}>
          <Button
            bg="primary.500"
            color="#ffffff"
            href="/auth/register"
            text="Crear una cuenta"
          />
          <Button
            bg="whiteAlpha.900"
            color="primaru.500"
            href="/auth/login"
            text="Iniciar Sesión"
          />
        </VStack>
      </Stack>
    </Stack>
  );
};

export default Home;
