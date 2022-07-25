import { Heading, Stack, useToast, Button, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { differenceInYears, parseISO } from "date-fns";
import Referencias from "session/components/form/Referencias";
import Habilidades from "session/components/form/Habilidades";
import Botones from "session/components/Botones";
import Estudios from "session/components/form/Estudios";
import Experiencia from "session/components/form/Experiencia";
import Personal from "session/components/form/Personal";
import { User } from "dashboard/types";

interface Props {
  session: any;
}

const ProfileEmployee: React.FC<Props> = ({ session }) => {
  const [referencias, setReferencias] = React.useState(1);
  const [habilidades, setHabilidades] = React.useState(1);
  const [estudios, setEstudios] = React.useState(1);
  const [experiencia, setExperiencia] = React.useState(1);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const router = useRouter();
  const to = useToast();
  async function onSubmit(values: any) {
    const data: User = {
      firstname: values.firstName,
      lastname: values.lastName,
      identification: values.cedula,
      email: session.user.email,
      date: values.date,
      phone: values.phone,
      city: values.ciudad,
      profession: values.profesion,
      references: values.references,
      skills: values.skills,
      studies: values.studies,
      experience: Array.from({ length: experiencia }, (_, index) => ({
        company: values.experience[index].company,
        position: values.experience[index].position,
        phone: values.experience[index].phone,
        startDate: parseISO(values.experience[index].startDate),
        endDate: parseISO(values.experience[index].endDate),
      })),
    };
    if (differenceInYears(new Date(), parseISO(values.date)) < 18) {
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
        data,
        session,
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
  }
  return (
    <Stack alignItems="center" pt={12} px={4} w="full">
      <Heading color="primary" fontSize={32} fontWeight={700} lineHeight={1}>
        Crear Perfil
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={[1]} gap={6} pt={12} w="full">
          <Stack bg="whiteAlpha.900" boxShadow="md" p={4} rounded="lg">
            <Heading
              color="primary.500"
              fontSize={24}
              fontWeight={700}
              lineHeight={2}
              textAlign="center"
            >
              Información Personal
            </Heading>
            <Personal errors={errors} register={register} />
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
            {Array.from({ length: referencias }, (_, index) => {
              return (
                <Referencias
                  key={index}
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
            {Array.from({ length: habilidades }, (_, index) => {
              return (
                <Habilidades
                  key={index}
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
            {Array.from({ length: estudios }, (_, index) => {
              return (
                <Estudios
                  key={index}
                  errors={errors}
                  index={index}
                  register={register}
                />
              );
            })}
            <Botones setState={setEstudios} state={estudios} />
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
            {Array.from({ length: experiencia }, (_, index) => {
              return (
                <Experiencia
                  key={index}
                  errors={errors}
                  index={index}
                  register={register}
                />
              );
            })}
            <Botones setState={setExperiencia} state={experiencia} />
          </Stack>
          <Button colorScheme="primary" m={12} type="submit">
            Guardar Perfil
          </Button>
        </SimpleGrid>
      </form>
    </Stack>
  );
};

export default ProfileEmployee;
