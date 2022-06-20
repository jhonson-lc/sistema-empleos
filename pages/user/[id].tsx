import React from "react";
import { useSession, signIn } from "next-auth/react";
import { Button, Heading, Stack } from "@chakra-ui/react";

const User: React.FC = () => {
  const { data: session } = useSession();
  if (session) {
    return <Heading>Has iniciado sesión</Heading>;
  }
  return (
    <div>
      <Stack>
        <Heading>No has iniciado sesión</Heading>
        <Button onClick={() => signIn()}>Sign In</Button>
      </Stack>
    </div>
  );
};

export default User;
