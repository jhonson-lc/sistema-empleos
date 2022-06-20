import {
  Stack,
  Heading,
  Input,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";
import { signIn, getSession } from "next-auth/react";

import FormControl from "../ui/form/FormControl";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};

interface Props {
  session: any;
}

const Login: NextPage<Props> = ({ session }) => {
  const [show, setShow] = React.useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  async function onSubmit(values: any) {
    const res = await signIn("credentials", {
      redirect: false,
      username: values.name,
      email: values.email,
      password: values.password,
    });
    console.log(res);
  }
  const handleClick = () => setShow(!show);

  return (
    <Stack direction="row" h="82vh" position="relative" w="full">
      <Stack alignItems="start" gap={6} p={32}>
        <Heading color="primary" fontSize={32} fontWeight={700} lineHeight={1}>
          Iniciar Sesión
        </Heading>
        <Stack direction="column" spacing={0} w={400}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              isRequired
              error={errors.email && "Este campo es requerido"}
              help="Nunca compartiremos su correo electrónico con nadie más"
              label="Correo Electrónico"
              name="email"
            >
              <Input
                {...register("email", {
                  required: true,
                  validate: (value) => value !== "",
                })}
                placeholder="juanperez@yahoo.com"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.password && "Este campo es requerido"}
              label="Contraseña"
              name="password"
            >
              <InputGroup size="md">
                <Input
                  {...register("password", {
                    required: true,
                  })}
                  placeholder="Enter password"
                  type={show ? "text" : "password"}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    colorScheme="primary"
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button colorScheme="primary" mt={5} type="submit">
              Iniciar Sesión
            </Button>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
