import type { GetServerSideProps } from "next";
import React from "react";
import { getSession, signOut } from "next-auth/react";
import { Button, Stack, Text } from "@chakra-ui/react";

import LoginScreen from "../../session/screens/Login";

const Login = ({ session }: any) => {
  if (!session) return <LoginScreen login={session} />;
  return (
    <Stack>
      <Text>Estas logueado</Text>
      <Button onClick={() => signOut()}>Cerrar Sesión</Button>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
export default Login;
