import {
  Stack,
  Heading,
  Input,
  Button,
  useToast,
  HStack,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";

import FormControl from "../../ui/form/FormControl";

const SignUp: NextPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const to = useToast();

  async function onSubmit(values: any) {
    const { email } = values;
    const r = await axios.post("/api/register", {
      email,
    });
    if (r.data.message === "error") {
      await signIn("email", {
        email,
      });
    } else if (r.data.message === "success") {
      to({
        title: "Correo registrado",
        description: "Ya tienes una cuenta, prueba a iniciar sesión",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <Stack direction="column" h="82vh" position="relative" w="full">
      <Stack alignItems="start" gap={6} p={32}>
        <Heading color="primary" fontSize={32} fontWeight={700} lineHeight={1}>
          Registrarse
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
            <HStack fontSize={12} my={2}>
              <Text>Ya tengo una cuenta?</Text>
              <Button color="primary.500" fontSize={12} variant="link">
                <Link href="/auth/login">Iniciar Sesión</Link>
              </Button>
            </HStack>
            <Button colorScheme="primary" mt={5} type="submit">
              Registrar
            </Button>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SignUp;
