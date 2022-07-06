import {
  Heading,
  Input,
  Image,
  InputGroup,
  InputLeftAddon,
  Stack,
  useToast,
  Button,
} from "@chakra-ui/react";
import InputCalendar from "components/InputCalendar";
import React from "react";
import FormControl from "ui/form/FormControl";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInYears } from "date-fns";

interface Props {
  session: any;
}

const ProfileClient: React.FC<Props> = ({ session }) => {
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
    if (differenceInYears(new Date(), values.date) < 18) {
      return to({
        title: "Error",
        description: "Debes ser mayor de edad para registrarte",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    }
    await axios
      .post("/api/createProfile", {
        data: {
          firstname: values.firstName,
          lastname: values.lastName,
          email: session.user.email,
          phone: values.phone,
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
        router.reload();
      });
    reset();
  }
  return (
    <Stack
      alignItems="center"
      direction={{ base: "column", md: "row" }}
      position="relative"
      px={{ base: 4, lg: 12 }}
      w="full"
    >
      <Stack
        alignItems="center"
        gap={6}
        order={{ base: 2, lg: 0 }}
        pt={12}
        px={{ base: 4, lg: 48 }}
      >
        <Heading color="primary" fontSize={32} fontWeight={700} lineHeight={1}>
          Crear Perfil
        </Heading>
        <Stack direction="column" spacing={0} w={{ base: "full", lg: 400 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              isRequired
              error={
                errors.firstName &&
                (errors.firstName.message || "Este campo es requerido")
              }
              label="Nombre"
              name="firstName"
            >
              <Input
                {...register("firstName", {
                  required: true,
                  validate: (value) => value !== "",
                  maxLength: {
                    value: 20,
                    message: "El nombre no puede tener más de 20 caracteres",
                  },
                })}
                placeholder="Juan"
              />
            </FormControl>
            <FormControl
              isRequired
              error={
                errors.lastName &&
                (errors.lastName.message || "Este campo es requerido")
              }
              label="Apellido"
              name="lastName"
            >
              <Input
                {...register("lastName", {
                  required: true,
                  validate: (value) => value !== "",
                  maxLength: {
                    value: 20,
                    message: "El apellido no puede tener más de 20 caracteres",
                  },
                })}
                placeholder="Peréz"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.date && "Este campo es requerido"}
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
              error={errors.phone && "Son 9 dígitos válidos"}
              help="Ej: 0987654321 ó 021212345"
              label="Teléfono/Celular"
              name="phone"
            >
              <InputGroup>
                <InputLeftAddon children="+593" pointerEvents="none" />
                <Input
                  inputMode="numeric"
                  placeholder="987654321"
                  {...register("phone", {
                    required: true,
                    pattern: /^\d{9}$/,
                  })}
                  type="number"
                />
              </InputGroup>
            </FormControl>
            <Button colorScheme="primary" mt={5} type="submit">
              Guardar Perfil
            </Button>
          </form>
        </Stack>
      </Stack>
      <Stack pr={{ base: 0, lg: 24 }} w={{ base: "full", md: "50%" }}>
        <Image src="../register.svg" />
      </Stack>
    </Stack>
  );
};

export default ProfileClient;
