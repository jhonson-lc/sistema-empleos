import {
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  useToast,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

import "react-datepicker/dist/react-datepicker.css";
import { User } from "../types";

interface Props {
  data: User;
  session: any;
}

const Main: React.FC<Props> = ({ data, session }) => {
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [date, setDate] = React.useState<any>("");
  React.useEffect(() => {
    if (data) {
      setFirstName(data.firstname);
      setLastName(data.lastname);
      setPhone(data.phone);
      setDate(data.date);
      setEmail(data.email);
    }
  }, [data]);
  const { handleSubmit, register } = useForm();
  const router = useRouter();
  const to = useToast();
  async function onSubmit() {
    await axios
      .post("/api/updateProfile", {
        data: {
          session,
          firstname: firstName,
          lastname: lastName,
          phone,
          date,
        },
      })
      .then(() => {
        to({
          title: "Perfil actuazlizado",
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
      <Stack gap={6}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={{ base: 4, lg: 8 }}>
            <Stack
              direction={{ base: "column", lg: "row" }}
              w={{ base: 290, lg: 600 }}
            >
              <Text fontSize={16} fontWeight={600} minW={200}>
                Nombre
              </Text>
              <Input
                {...register("firstName", {
                  pattern: /^[a-zA-Z]+$/,
                  maxLength: 10,
                })}
                placeholder="Juan"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Stack>
            <Stack
              direction={{ base: "column", lg: "row" }}
              w={{ base: 290, lg: 600 }}
            >
              <Text fontSize={16} fontWeight={600} minW={200}>
                Apellido
              </Text>
              <Input
                {...register("lastName")}
                placeholder="Peréz"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Stack>
            <Stack
              direction={{ base: "column", lg: "row" }}
              w={{ base: 290, lg: 600 }}
            >
              <Text fontSize={16} fontWeight={600} minW={200}>
                Email
              </Text>
              <Input isReadOnly placeholder="Peréz" value={email} />
            </Stack>
            <Stack
              direction={{ base: "column", lg: "row" }}
              w={{ base: 290, lg: 600 }}
            >
              <Text fontSize={16} fontWeight={600} minW={200}>
                Fecha de Nacimiento
              </Text>
              <Input
                {...register("date")}
                placeholder="dd/mm/aaaa"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Stack>
            <Stack
              direction={{ base: "column", lg: "row" }}
              w={{ base: 290, lg: 600 }}
            >
              <Text fontSize={16} fontWeight={600} minW={200}>
                Teléfono/Celular
              </Text>
              <InputGroup>
                <InputLeftAddon children="+593" pointerEvents="none" />
                <Input
                  inputMode="numeric"
                  placeholder="0987654321"
                  {...register("phone", {
                    pattern: /^\d{9,10}$/,
                  })}
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup>
            </Stack>
          </Stack>
          <Button colorScheme="primary" mt={5} type="submit">
            Guardar Perfil
          </Button>
        </form>
      </Stack>
    </Stack>
  );
};

export default Main;
