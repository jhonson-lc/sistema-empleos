import {
  Stack,
  Heading,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  InputLeftAddon,
  Image,
  useToast,
  HStack,
  Text,
} from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";
import { signIn, getSession } from "next-auth/react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import { useRouter } from "next/router";

import FormControl from "../../ui/form/FormControl";
import InputCalendar from "../../components/InputCalendar";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

const SignUp: NextPage = ({ session }: any) => {
  const [show, setShow] = React.useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset,
  } = useForm();

  const to = useToast();
  const router = useRouter();

  async function onSubmit(values: any) {
    if (session) {
      values = { ...values, email: session.user.email, user: session.user };
      await axios.post("/api/createProfile", values).catch(() => {
        router.push("/dashboard");
      });
      reset();
      return;
    }
    const r = await axios.post("/api/register", {
      email: values.email,
    });
    const { email } = values;
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
  const handleClick = () => setShow(!show);

  if (!session)
    return (
      <Stack direction="column" h="82vh" position="relative" w="full">
        <Stack alignItems="start" gap={6} p={32}>
          <Heading
            color="primary"
            fontSize={32}
            fontWeight={700}
            lineHeight={1}
          >
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

  return (
    <Stack
      alignItems="center"
      direction="row"
      position="relative"
      px={12}
      w="full"
    >
      <Stack alignItems="start" gap={6} pt={12} px={48}>
        <Heading color="primary" fontSize={32} fontWeight={700} lineHeight={1}>
          Registrarse
        </Heading>
        <Stack direction="column" spacing={0} w={400}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              isRequired
              error={errors.firstName && "Este campo es requerido"}
              label="Nombre"
              name="firstName"
            >
              <Input
                {...register("firstName", {
                  required: true,
                  validate: (value) => value !== "",
                })}
                placeholder="Juan"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.lastName && "Este campo es requerido"}
              label="Apellido"
              name="lastName"
            >
              <Input
                {...register("lastName", {
                  required: true,
                  validate: (value) => value !== "",
                })}
                placeholder="Peréz"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.date && "Este campo es requerido"}
              help="NOTA: Se comprueba disponibilidad de la fecha de ingreso"
              label="Fecha de nacimiento"
              name="date"
            >
              <InputCalendar
                control={control}
                errors={errors.date}
                name="date"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.phone && "Son 9 ó 10 dígitos válidos"}
              help="Ej: 0987654321 ó 021212345"
              label="Teléfono/Celular"
              name="phone"
            >
              <InputGroup>
                <InputLeftAddon children="+593" pointerEvents="none" />
                <Input
                  inputMode="numeric"
                  placeholder="0987654321"
                  {...register("phone", {
                    required: true,
                    pattern: /^\d{9,10}$/,
                  })}
                  type="number"
                />
              </InputGroup>
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
              Guardar Perfil
            </Button>
          </form>
        </Stack>
      </Stack>
      <Stack pr={24}>
        <Image src="/register.svg" />
      </Stack>
    </Stack>
  );
};

export default SignUp;
