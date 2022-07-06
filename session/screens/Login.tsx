import {
  HStack,
  Stack,
  Heading,
  Input,
  InputGroup,
  Text,
  InputRightElement,
  Button,
  useToast,
  Image,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import FormControl from "../../ui/form/FormControl";

const LoginScreen: React.FC = () => {
  const [show, setShow] = React.useState(false);
  const router = useRouter();
  const toast = useToast();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  async function onSubmit(values: any) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (!res) return;
    if (res.status === 401) {
      toast({
        title: "Error",
        description: "Usuario o contraseña incorrectos",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
    if (res.status === 200) {
      router.reload();
    }
  }
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
          textAlign="center"
        >
          Bienvenido a WorkSearch!
        </Heading>
        <Text textAlign="center">
          En WorkSearch puedes buscar miles de empleos en línea para encontrar
          tu próximo reto profesional. Contamos con herramientas para búsqueda
          de empleo.
        </Text>
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
                    onClick={() => setShow(!show)}
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <HStack fontSize={12} my={2}>
              <Text>No tienes cuenta?</Text>
              <Button color="primary.500" fontSize={12} variant="link">
                <Link href="/auth/register">Registrarse</Link>
              </Button>
            </HStack>
            <Button colorScheme="primary" mt={5} type="submit">
              Iniciar Sesión
            </Button>
          </form>
        </Stack>
      </Stack>
      <Image src="../register.svg" w="full" />
    </Stack>
  );
};

export default LoginScreen;
