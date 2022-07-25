import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Button,
  Link,
  Heading,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { format } from "date-fns";
import React from "react";

interface Props {
  session: any;
}

const MainE: React.FC<Props> = ({ session }) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState<string>("init");

  React.useEffect(() => {
    setLoading("init");
    const res = async () => {
      const r = await axios.post("/api/myClients", session);
      if (r.status === 200) {
        setData(r.data.filter((e) => e !== null));
        setLoading("success");
      }
    };
    res();
  }, []);

  return (
    <Stack alignItems="center" direction="column" w="full">
      {loading === "init" && <Spinner m={4} size="xl" />}
      {data.length === 0 && loading !== "init" && (
        <Heading color="primary.500" mb={6} textAlign="center">
          No tienes contratos
        </Heading>
      )}
      {data.length > 0 && (
        <TableContainer>
          <Heading color="primary.500" mb={6} textAlign="center">
            Tus contratos
          </Heading>
          <Table colorScheme="linkedin" variant="striped">
            <Thead>
              <Tr>
                <Th>Cliente</Th>
                <Th>Fecha</Th>
                <Th>Estado</Th>
                <Th textAlign="center">Valoración</Th>
                <Th textAlign="center">Observación</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((e) => {
                return (
                  <Tr key={e.client.id}>
                    <Td>{e.client.firstname + " " + e.client.lastname}</Td>
                    <Td>{format(new Date(e.createdAt), "dd/MM/yyyy")}</Td>
                    <Td>{e.state}</Td>
                    <Td textAlign="center">
                      {e.valoration === 0
                        ? "Aún no hay valoración"
                        : e.valoration + " / 10"}
                    </Td>
                    <Td textAlign="center">
                      {e.description || "No tiene observación"}
                    </Td>
                    <Td>
                      <HStack justify="end">
                        {e.state === "pendiente" && (
                          <Link
                            isExternal
                            href={`https://wa.me/5930${e.client.phone}`}
                          >
                            <Button
                              colorScheme="red"
                              size="sm"
                              variant="outline"
                            >
                              Contactar
                            </Button>
                          </Link>
                        )}
                      </HStack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default MainE;
