import { Heading, Stack, Spinner as SpinnerChakra } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

const Spinner: NextPage = ({ session }: any) => {
  const router = useRouter();

  React.useEffect(() => {
    if (session) {
      router.push("/register");
    }
  }, [session]);

  return (
    <Stack direction="column" h="82vh" position="relative" w="full">
      <Stack alignItems="start" gap={6} p={32}>
        <SpinnerChakra
          color="blue.500"
          emptyColor="gray.200"
          size="xl"
          speed="0.65s"
          thickness="4px"
        />
        <Heading color="primary" fontSize={32} fontWeight={700} lineHeight={1}>
          Se envió un correo de confirmación, revisa tu bandeja de entrada o
          correo no deseado
        </Heading>
      </Stack>
    </Stack>
  );
};

export default Spinner;
