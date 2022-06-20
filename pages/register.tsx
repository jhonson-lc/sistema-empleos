import {
  Stack,
  Heading,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  InputLeftAddon,
  Image,
} from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";
import { signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

import FormControl from "../ui/form/FormControl";
import InputCalendar from "../components/InputCalendar";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

const SignUp: NextPage = ({ session }: any) => {
  const [show, setShow] = React.useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm();
  async function onSubmit(values: any) {
    if (session) {
      values = { ...values, email: session.user.email };
      await axios.post("/api/register", values);
      return;
    }
    const { email } = values;
    const res = await signIn("email", {
      email,
    });
  }
  const handleClick = () => setShow(!show);

  const handleSignOut = async () => {
    const res = await signOut({
      redirect: false,
      callbackUrl: `${window.location.origin}/register`,
    });
    router.push(res.url);
  };

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
