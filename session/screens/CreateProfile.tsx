import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
  Image,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import InputCalendar from "../../components/InputCalendar";
import FormControl from "../../ui/form/FormControl";

interface Props {
  session: any;
}

const createProfile: React.FC<Props> = ({ session }) => {
  const [show, setShow] = React.useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset,
  } = useForm();

  const router = useRouter();
  const to = useToast();

  async function onSubmit(values: any) {
    await axios
      .post("/api/createProfile", {
        data: {
          firstname: values.firstName,
          lastname: values.lastName,
          email: session.user.email,
          phone: values.phone,
          password: values.password,
          date: values.date,
          user: session.user,
        },
      })
      .then(() => {
        to({
          title: "Perfil creado",
          description: "Tu perfil ha sido creado con éxito",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push("/dashboard");
      });
    reset();
  }

  const handleClick = () => setShow(!show);

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

export default createProfile;
