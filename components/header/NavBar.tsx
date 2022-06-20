import React from "react";
import { Box, Container, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import Button from "../../components/Button";
import MenuMobile from "../../components/header/MenuMobile";
import Logo from "../../ui/static/Logo";

import { LINKS_NAV } from "./constants";
import LinkItem from "./LinkItem";

const Navbar: React.FC = () => {
  const { pathname } = useRouter();
  return (
    <Box
      as={motion.nav}
      bg="primary.500"
      css={{ backdropFilter: "blur(20px)" }}
      position="relative"
      py={5}
      top="0"
      width="100%"
      zIndex="1"
    >
      <Container
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        maxW="container.xl"
        pos="relative"
      >
        <Logo size={28} />
        <Stack
          align="center"
          color="paragraph"
          direction="row"
          display={{ base: "none", lg: "flex" }}
          justify="center"
          spacing={8}
          wrap="wrap"
        >
          {LINKS_NAV.map(({ href, text }) => {
            return (
              <LinkItem
                key={href}
                external={text === "View Source" && true}
                font={{ weight: 400, size: 15 }}
                href={href}
                path={pathname}
              >
                {text}
              </LinkItem>
            );
          })}
        </Stack>
        <Stack alignItems="center" direction="row" spacing={5}>
          <Stack
            alignItems="center"
            direction="row"
            display={{ base: "none", md: "flex" }}
          >
            <LinkItem font={{ weight: 400, size: 15 }} href="/login">
              Iniciar Sesión
            </LinkItem>
            <Button
              bg="#ffffff"
              color="primary"
              href="/register"
              text="Crear cuenta"
            />
          </Stack>
          <MenuMobile path={pathname} />
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
