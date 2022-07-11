import { DeleteIcon } from "@chakra-ui/icons";
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
  IconButton,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";

interface Props {
  session: any;
}

const ListEmployees: React.FC<Props> = ({ session }) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState<string>("init");
  const to = useToast();
  React.useEffect(() => {
    setLoading("init");
    const res = async () => {
      const r = await axios.post("/api/myEmployeers", session);
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
          No tienes empleados
        </Heading>
      )}
      {data.length > 0 && (
        <TableContainer maxW="container.lg">
          <Heading color="primary.500" mb={6} textAlign="center">
            Tus Empleados
          </Heading>
          <Table colorScheme="teal" variant="striped">
            <Thead>
              <Tr>
                <Th>Empleado</Th>
                <Th>Ciudad</Th>
                <Th>Estado</Th>
                <Th isNumeric>Valoración</Th>
                <Th isNumeric>N. de servicios</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((e) => {
                return (
                  <Tr key={e.employeer.employeeId}>
                    <Td>
                      {e.employeer.firstname + " " + e.employeer.lastname}
                    </Td>
                    <Td>{e.employeer.city}</Td>
                    <Td>{e.state}</Td>
                    <Td>{e.valoration}</Td>
                    <Td isNumeric>{e.employeer.jobs.length}</Td>
                    <Td>
                      <HStack>
                        <Link
                          isExternal
                          href={`https://wa.me/5930${e.employeer.phone}`}
                        >
                          <Button colorScheme="red" size="sm" variant="outline">
                            Contactar
                          </Button>
                        </Link>
                        <IconButton
                          aria-label="Eliminar empleado"
                          colorScheme="red"
                          icon={<DeleteIcon />}
                          onClick={async () => {
                            await axios
                              .post("/api/deleteEmployeer", {
                                id: e.id,
                              })
                              .then(() => {
                                setData(
                                  data.filter(
                                    (employee) => employee.id !== e.id,
                                  ),
                                );
                                to({
                                  title: "Eliminado",
                                  description: "El empleado ha sido eliminado",
                                  status: "success",
                                  position: "top-right",
                                  duration: 4000,
                                  isClosable: true,
                                });
                              });
                          }}
                        />
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

export default ListEmployees;
