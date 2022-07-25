import {
  Stack,
  Heading,
  Input,
  Button,
  useToast,
  HStack,
  Text,
  Image,
  InputRightElement,
  InputGroup,
  Checkbox,
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
  const [show, setShow] = React.useState(false);
  const to = useToast();

  async function onSubmit(values: any) {
    const { email, password, rol } = values;
    if (!rol[0] && !rol[1])
      return to({
        title: "Error",
        description: "Debe seleccionar al menos un rol",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    let role = "";
    if (rol[0]) role = "CLIENT";
    if (rol[1]) role = "EMPLOYEE";
    const r = await axios.post("/api/register", {
      email,
    });
    if (r.data.message === "error") {
      await signIn("credentials", {
        email,
        password,
        role,
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
  const handleClick = () => setShow(!show);
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      overflow="hidden"
      position="relative"
      w="full"
    >
      <Stack
        alignItems="start"
        gap={6}
        order={{ base: 2, md: 0 }}
        p={{ base: 4, md: 32 }}
      >
        <Heading
          color="primary.500"
          fontSize={32}
          fontWeight={700}
          lineHeight={1}
        >
          Registrarse
        </Heading>
        <Stack direction="column" spacing={0} w={{ base: "full", md: 400 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              isRequired
              error={
                errors.email &&
                (errors.email.message || "Este campo es requerido")
              }
              help="Nunca compartiremos su correo electrónico con nadie más"
              label="Correo Electrónico"
              name="email"
            >
              <Input
                {...register("email", {
                  required: true,
                  validate: (value) => value !== "",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Correo electrónico inválido",
                  },
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
            <FormControl
              isRequired
              error={errors.rol && "Este campo es requerido"}
              label="Rol"
              name="rol"
            >
              <Checkbox
                id="client"
                mr={4}
                name="rol[0]"
                {...register("rol[0]")}
              >
                Cliente
              </Checkbox>
              <Checkbox id="employee" name="rol[1]" {...register("rol[1]")}>
                Trabajador
              </Checkbox>
            </FormControl>
            <FormControl
              isRequired
              error={errors.poli && "Para continuar, acepte los términos"}
              name="poli"
            >
              <Checkbox
                colorScheme="red"
                fontWeight={600}
                id="politicas"
                size="sm"
                spacing="1rem"
                {...register("poli", {
                  required: true,
                })}
              >
                Para crear la cuenta, usted debe aceptar nuestras{" "}
                <Button color="primary.500" size="sm" variant="link">
                  <Link href="/politics">Políticas de Privacidad</Link>
                </Button>
              </Checkbox>
            </FormControl>
            <Button colorScheme="primary" mt={5} type="submit">
              Registrar
            </Button>
            <HStack fontSize={12} my={2}>
              <Text>Ya tengo una cuenta?</Text>
              <Button color="primary.500" fontSize={12} variant="link">
                <Link href="/auth/login">Iniciar Sesión</Link>
              </Button>
            </HStack>
          </form>
        </Stack>
      </Stack>
      <Image src="../register.svg" w="full" />
    </Stack>
  );
};

export default SignUp;
