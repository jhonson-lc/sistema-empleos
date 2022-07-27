import {
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  useToast,
  Button,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Estudios from "session/components/form/Estudios";
import Botones from "session/components/Botones";
import Habilidades from "session/components/form/Habilidades";
import Referencias from "session/components/form/Referencias";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Experiencia from "session/components/form/Experiencia";
import FormControl from "ui/form/FormControl";

import { User } from "../types";

interface Props {
  data: User;
  session: any;
}

const PersonalE: React.FC<Props> = ({ data, session }) => {
  const [referencias, setReferencias] = React.useState(data.references.length);
  const [habilidades, setHabilidades] = React.useState(data.skills.length);
  const [estudios, setEstudios] = React.useState(data.studies.length);
  const [experiencia, setExperiencia] = React.useState(data.experience.length);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });
  const router = useRouter();
  const to = useToast();
  async function onSubmit(values: any) {
    await axios
      .post("/api/updateEmployee", {
        values,
        session,
      })
      .then(() => {
        to({
          title: "Perfil actualizado",
          description: "Tu perfil ha sido actualizado con éxito",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.reload();
      });
  }
  return (
    <Stack alignItems="start" gap={8} w="full">
      <Stack gap={6} w="full">
        <Heading
          color="primary.800"
          fontSize={32}
          fontWeight={700}
          textAlign="center"
        >
          Información Personal
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid alignItems="start" columns={[1, 1, 2]} gap={6} w="full">
            <Stack bg="whiteAlpha.900" boxShadow="md" p={4} rounded="lg">
              <Heading
                color="primary.500"
                fontSize={24}
                fontWeight={700}
                lineHeight={2}
                textAlign="center"
              >
                Datos Personales
              </Heading>
              <FormControl
                isRequired
                error={
                  errors.identification &&
                  (errors.identification.message || "Este campo es requerido")
                }
                label="Cédula"
                name="identification"
              >
                <Input
                  {...register("identification", {
                    validate: (value) => value !== "",
                    maxLength: {
                      value: 10,
                      message: "La cédula no puede tener más de 10 dígitos",
                    },
                  })}
                  placeholder="1724859645"
                />
              </FormControl>
              <FormControl
                isRequired
                error={
                  errors.firstname &&
                  (errors.firstname.message || "Este campo es requerido")
                }
                label="Nombre"
                name="firstname"
              >
                <Input
                  {...register("firstname", {
                    pattern: /^[a-zA-Z]+$/,
                    maxLength: 10,
                  })}
                  placeholder="Juan"
                />
              </FormControl>
              <FormControl
                isRequired
                error={
                  errors.lastname &&
                  (errors.lastname.message || "Este campo es requerido")
                }
                label="Apellido"
                name="lastname"
              >
                <Input
                  {...register("lastname", {
                    pattern: /^[a-zA-Z]+$/,
                    maxLength: 10,
                  })}
                  placeholder="Peréz"
                />
              </FormControl>
              <FormControl label="Email" name="email">
                <Input isReadOnly {...register("email")} placeholder="Peréz" />
              </FormControl>
              <FormControl
                isRequired
                error={errors.date && "Este campo es requerido"}
                label="Fecha de nacimiento"
                name="date"
              >
                <Input
                  type="date"
                  {...register("date", {
                    validate: (value) => value !== "",
                  })}
                  defaultValue={format(new Date(data.date), "yyyy-MM-dd")}
                  placeholder="dd/mm/aaaa"
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
                    placeholder="0987654321"
                    {...register("phone", {
                      pattern: /^\d{9,10}$/,
                    })}
                    type="number"
                  />
                </InputGroup>
              </FormControl>
              <FormControl
                isRequired
                error={errors.city && "Este campo es requerido"}
                label="Ciudad"
                name="city"
              >
                <Input
                  {...register("city", {
                    required: true,
                    validate: (value) => value !== "",
                  })}
                  placeholder="Ambato"
                />
              </FormControl>
              <FormControl
                isRequired
                error={errors.profession && "Este campo es requerido"}
                label="Profesión"
                name="profession"
              >
                <Input
                  {...register("profession", {
                    required: true,
                    validate: (value) => value !== "",
                  })}
                  placeholder="Scrum Master"
                />
              </FormControl>
            </Stack>
            <Stack bg="whiteAlpha.900" boxShadow="md" p={4} rounded="lg">
              <Heading
                color="primary.500"
                fontSize={24}
                fontWeight={700}
                lineHeight={2}
                textAlign="center"
              >
                Experiencia
              </Heading>
              {Array.from({ length: experiencia }).map((_, index) => {
                return (
                  <Experiencia
                    key={index}
                    data={data.experience}
                    errors={errors}
                    index={index}
                    register={register}
                  />
                );
              })}
              <Botones setState={setExperiencia} state={experiencia} />
            </Stack>
            <Stack bg="whiteAlpha.900" boxShadow="md" p={4} rounded="lg">
              <Heading
                color="primary.500"
                fontSize={24}
                fontWeight={700}
                lineHeight={2}
                textAlign="center"
              >
                Referencias
              </Heading>
              {Array.from({ length: referencias }).map((_, index) => {
                return (
                  <Referencias
                    key={index}
                    data={data.references}
                    errors={errors}
                    index={index}
                    register={register}
                  />
                );
              })}
              <Botones setState={setReferencias} state={referencias} />
            </Stack>
            <Stack bg="whiteAlpha.900" boxShadow="md" p={4} rounded="lg">
              <Heading
                color="primary.500"
                fontSize={24}
                fontWeight={700}
                lineHeight={2}
                textAlign="center"
              >
                Habilidades
              </Heading>
              {Array.from({ length: habilidades }).map((_, index) => {
                return (
                  <Habilidades
                    key={index}
                    data={data.skills}
                    errors={errors}
                    index={index}
                    register={register}
                  />
                );
              })}
              <Botones setState={setHabilidades} state={habilidades} />
            </Stack>
            <Stack bg="whiteAlpha.900" boxShadow="md" p={4} rounded="lg">
              <Heading
                color="primary.500"
                fontSize={24}
                fontWeight={700}
                lineHeight={2}
                textAlign="center"
              >
                Estudios
              </Heading>
              {Array.from({ length: estudios }).map((_, index) => {
                return (
                  <Estudios
                    key={index}
                    data={data.studies}
                    errors={errors}
                    index={index}
                    register={register}
                  />
                );
              })}
              <Botones setState={setEstudios} state={estudios} />
            </Stack>
            <Button colorScheme="primary" mt={5} type="submit">
              Guardar Perfil
            </Button>
          </SimpleGrid>
        </form>
      </Stack>
    </Stack>
  );
};

export default PersonalE;
