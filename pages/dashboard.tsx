import React from "react";
import axios from "axios";
import { Button, HStack, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

interface Props {
  session: any;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

type item = {
  text: string;
  value: string;
  onChange?: any;
};

const ItemInformation = ({ text, value, onChange }: item) => {
  return (
    <HStack w={600}>
      <Text fontSize={16} fontWeight={600} minW={200}>
        {text}
      </Text>
      <Input value={value} onChange={onChange} />
    </HStack>
  );
};

interface User {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  date: string;
}

const Dashboard: React.FC<Props> = ({ session }) => {
  const [data, setData] = React.useState<User>();
  const [loading, setLoading] = React.useState("init");
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [date, setDate] = React.useState<string>("");

  React.useEffect(() => {
    const data = async () => {
      const res = await axios.post("/api/user", session.user);
      if (res.status === 200) {
        setData(res.data);
        setLoading("success");
      }
    };
    data();
  }, []);

  React.useEffect(() => {
    if (data) {
      setFirstName(data.firstname);
      setLastName(data.lastname);
      setEmail(data.email);
      setPhone(data.phone);
      setDate(data.date);
    }
  }, [data]);

  return (
    <Stack direction="row" h="85vh" w="full">
      <Stack direction="row" h="85vh" w="full">
        <Stack bg="primary.500" color="white" minW="250px">
          <Text p={5}>Página principal</Text>
          <Text bg="white" color="primary.500" p={5}>
            Información personal
          </Text>
          <Text p={5}>Tus empleados</Text>
        </Stack>
        <Stack alignItems={"start"} direction="column" gap={12} p={24} w="full">
          {loading === "init" && <Spinner size="xl" />}
          {data && (
            <Stack gap={6}>
              <ItemInformation
                text="Nombre"
                value={firstName || ""}
                onChange={(e: any) => setFirstName(e.target.value)}
              />
              <ItemInformation
                text="Apellido"
                value={lastName || ""}
                onChange={(e: any) => setLastName(e.target.value)}
              />
              <ItemInformation
                text="Correo"
                value={email || ""}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <ItemInformation
                text="Celular"
                value={phone || ""}
                onChange={(e: any) => setPhone(e.target.value)}
              />
              <ItemInformation
                text="Fecha de Nacimiento"
                value={date || ""}
                onChange={(e: any) => setDate(e.target.value)}
              />
            </Stack>
          )}
          <Button colorScheme="primary" mt={5} type="submit">
            Guardar Perfil
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
