import { Stack, Text, Image, VStack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import React from "react";

import Button from "../../components/Button";
import CreateProfile from "../../session/screens/CreateProfile";
import Register from "../../session/screens/Register";

interface Props {
  session: Session;
  user: any;
}

const SignUp: NextPage<Props> = ({ session, user }) => {
  if (!session) return <Register />;
  if (!user) return <CreateProfile session={session} />;
  return (
    <Stack display="grid" h="80vh" placeItems="center" w="full">
      <VStack>
        <Image maxW={100} src="/logo.png" />
        <Text>Ya tienes un perfil creado</Text>
        <Button bg="primary.500" href="/dashboard" text="Ir a mi perfil" />
      </VStack>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  let user = null;

  if (session) {
    if (session.user?.name) {
      user = session.user?.name;
    }
  }
  return {
    props: {
      session,
      user,
    },
  };
};

export default SignUp;
