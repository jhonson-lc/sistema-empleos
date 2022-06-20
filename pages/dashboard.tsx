import React from "react";
import axios from "axios";
import { Button, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

interface Props {
  session: any;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

type item = {
  text: string;
  value: string;
};

const ItemInformation = ({ text, value }: item) => {
  return (
    <HStack w={600}>
      <Text fontSize={16} fontWeight={600} minW={200}>
        {text}
      </Text>
      <Input value={value} />
    </HStack>
  );
};

const Dashboard: React.FC<Props> = () => {
  const [data, setData] = React.useState<any>([]);

  React.useEffect(() => {
    const data = async () => {
      await axios.get("/api/user").then((res) => {
        setData(res.data);
      });
    };
    data();
  }, []);

  return (
    <Stack direction="row" h="85vh" w="full">
      <Stack bg="primary.500" color="white" minW="250px">
        <Text p={5}>Página principal</Text>
        <Text bg="white" color="primary.500" p={5}>
          Información personal
        </Text>
        <Text p={5}>Tus empleados</Text>
      </Stack>
      <Stack alignItems={"start"} direction="column" gap={12} p={24} w="full">
        <Stack gap={6}>
          <ItemInformation text="Nombre" value={data[0].firstname} />
          <ItemInformation text="Apellido" value={data[0].lastname} />
          <ItemInformation text="Correo" value={data[0].email} />
          <ItemInformation text="Celular" value={data[0].phone} />
          <ItemInformation text="Fecha de Nacimiento" value={data[0].date} />
        </Stack>
        <Button colorScheme="primary" mt={5} type="submit">
          Guardar Perfil
        </Button>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
