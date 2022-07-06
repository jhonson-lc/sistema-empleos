import { Stack, Text, Image, VStack } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import React from "react";

import Button from "../../components/Button";
import Register from "../../session/screens/Register";

interface Props {
  session: Session;
}

const SignUp: NextPage<Props> = ({ session }) => {
  if (!session) return <Register />;
  return (
    <Stack display="grid" h="80vh" placeItems="center" w="full">
      <VStack>
        <Image maxW={100} src="/logo.png" />
        <Text>Ya tienes un perfil creado</Text>
        <Button
          bg="primary.500"
          href={`/dashboard/${session.user.id}`}
          text="Ir a mi perfil"
        />
      </VStack>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};

export default SignUp;
