import {
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  useToast,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import InputCalendar from "components/InputCalendar";
import React from "react";
import FormControl from "ui/form/FormControl";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
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
      .post("/api/createProfileE", {
        data: {
          values,
          session,
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
        router.push(`/dashboard/${session.user.id}`);
      });
  }
  return (
    <Stack alignItems="center" pt={12} px={4} w="full">
      <Heading color="primary" fontSize={32} fontWeight={700} lineHeight={1}>
        Crear Perfil
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={[1]} pt={12} w="full">
          <Stack>
            <Heading
              color="primary.500"
              fontSize={24}
              fontWeight={700}
              lineHeight={1}
            >
              Información Personal
            </Heading>
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
              error={
                errors.cedula &&
                (errors.cedula.message || "Este campo es requerido")
              }
              label="Cédula"
              name="cedula"
            >
              <Input
                {...register("cedula", {
                  required: true,
                  validate: (value) => value !== "",
                  maxLength: {
                    value: 10,
                    message: "La cédula no puede tener más de 10 dígitos",
                  },
                })}
                placeholder="1726456785"
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
            <FormControl
              isRequired
              error={errors.ciudad && "Este campo es requerido"}
              label="Ciudad"
              name="ciudad"
            >
              <Input
                {...register("ciudad", {
                  required: true,
                  validate: (value) => value !== "",
                })}
                placeholder="Ambato"
              />
            </FormControl>
          </Stack>
          <Stack>
            <Heading
              color="primary.500"
              fontSize={24}
              fontWeight={700}
              lineHeight={1}
              textAlign="center"
            >
              Referencias
            </Heading>
            <FormControl
              isRequired
              error={
                errors.firstNameRe &&
                (errors.firstNameRe.message || "Este campo es requerido")
              }
              label="Nombre"
              name="firstNameRe"
            >
              <Input
                {...register("firstNameRe", {
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
                errors.lastNameRe &&
                (errors.lastNameRe.message || "Este campo es requerido")
              }
              label="Apellido"
              name="lastNameRe"
            >
              <Input
                {...register("lastNameRe", {
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
              error={errors.phoneRe && "Son 9 dígitos válidos"}
              help="Ej: 0987654321 ó 021212345"
              label="Teléfono/Celular"
              name="phoneRe"
            >
              <InputGroup>
                <InputLeftAddon children="+593" pointerEvents="none" />
                <Input
                  inputMode="numeric"
                  placeholder="987654321"
                  {...register("phoneRe", {
                    required: true,
                    pattern: /^\d{9}$/,
                  })}
                  type="number"
                />
              </InputGroup>
            </FormControl>
          </Stack>
          <Stack>
            <Heading
              color="primary.500"
              fontSize={24}
              fontWeight={700}
              lineHeight={1}
              textAlign="center"
            >
              Habilidades
            </Heading>
            <FormControl
              isRequired
              error={
                errors.habilidad &&
                (errors.habilidad.message || "Este campo es requerido")
              }
              label="Nombre de la habilidad"
              name="habilidad"
            >
              <Input
                {...register("habilidad", {
                  required: true,
                  validate: (value) => value !== "",
                  maxLength: {
                    value: 50,
                    message: "La habilidad no puede tener más de 50 caracteres",
                  },
                })}
                placeholder="Tomar fotos"
              />
            </FormControl>
          </Stack>
          <Stack>
            <Heading
              color="primary.500"
              fontSize={24}
              fontWeight={700}
              lineHeight={1}
              textAlign="center"
            >
              Estudios
            </Heading>
            <FormControl
              isRequired
              error={
                errors.nivelE &&
                (errors.nivelE.message || "Este campo es requerido")
              }
              label="Nivel de estudio"
              name="nivelE"
            >
              <Input
                {...register("nivelE", {
                  required: true,
                  validate: (value) => value !== "",
                  maxLength: {
                    value: 20,
                    message: "El nivel no puede tener más de 20 caracteres",
                  },
                })}
                placeholder="Primaria"
              />
            </FormControl>
            <FormControl
              isRequired
              error={
                errors.insti &&
                (errors.insti.message || "Este campo es requerido")
              }
              label="Institución"
              name="insti"
            >
              <Input
                {...register("insti", {
                  required: true,
                  validate: (value) => value !== "",
                  maxLength: {
                    value: 20,
                    message:
                      "El nombre de la institución no puede tener más de 20 caracteres",
                  },
                })}
                placeholder="Escuela Ambato"
              />
            </FormControl>
            <FormControl
              isRequired
              error={
                errors.titleO &&
                (errors.titleO.message || "Este campo es requerido")
              }
              label="Título obtenido"
              name="titleO"
            >
              <Input
                {...register("titleO", {
                  required: true,
                  validate: (value) => value !== "",
                  maxLength: {
                    value: 50,
                    message:
                      "El nombre del título obtenido no puede tener más de 50 caracteres",
                  },
                })}
                placeholder="Bachiller en Ciencias"
              />
            </FormControl>
          </Stack>
          <Stack>
            <Heading
              color="primary.500"
              fontSize={24}
              fontWeight={700}
              lineHeight={1}
              textAlign="center"
            >
              Experiencia
            </Heading>
            <FormControl
              isRequired
              error={
                errors.nameEx &&
                (errors.nameEx.message || "Este campo es requerido")
              }
              label="Nombre de la Empresa"
              name="nameEx"
            >
              <Input
                {...register("nameEx", {
                  required: true,
                  validate: (value) => value !== "",
                  maxLength: {
                    value: 40,
                    message: "El nombre no puede tener más de 40 caracteres",
                  },
                })}
                placeholder="Tecnologías Ambato"
              />
            </FormControl>
            <FormControl
              isRequired
              error={
                errors.cargo &&
                (errors.cargo.message || "Este campo es requerido")
              }
              label="Cargo"
              name="cargo"
            >
              <Input
                {...register("cargo", {
                  required: true,
                  validate: (value) => value !== "",
                  maxLength: {
                    value: 50,
                    message: "El cargo no puede tener más de 50 caracteres",
                  },
                })}
                placeholder="Líder de Software"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.phoneEx && "Son 9 dígitos válidos"}
              help="Ej: 0987654321 ó 021212345"
              label="Teléfono/Celular"
              name="phoneEx"
            >
              <InputGroup>
                <InputLeftAddon children="+593" pointerEvents="none" />
                <Input
                  inputMode="numeric"
                  placeholder="987654321"
                  {...register("phoneEx", {
                    required: true,
                    pattern: /^\d{9}$/,
                  })}
                  type="number"
                />
              </InputGroup>
            </FormControl>
            <FormControl
              isRequired
              error={errors.startDate && "Este campo es requerido"}
              label="Fecha de Inicio"
              name="startDate"
            >
              <InputCalendar
                control={control}
                errors={errors.startDate}
                name="startDate"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.endDate && "Este campo es requerido"}
              label="Fecha de fin"
              name="endDate"
            >
              <InputCalendar
                control={control}
                errors={errors.endDate}
                name="endDate"
              />
            </FormControl>
          </Stack>
          <Button colorScheme="primary" m={12} type="submit">
            Guardar Perfil
          </Button>
        </SimpleGrid>
      </form>
    </Stack>
  );
};

export default ProfileClient;
