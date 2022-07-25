import { CheckCircleIcon, NotAllowedIcon } from "@chakra-ui/icons";
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
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Valoracion from "dashboard/components/Valoración";
import React from "react";

interface Props {
  session: any;
}

const ListEmployees: React.FC<Props> = ({ session }) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState<string>("init");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = React.useState();

  const to = useToast();
  React.useEffect(() => {
    setLoading("init");
    const res = async () => {
      await axios.post("/api/myEmployeers", session).then((res) => {
        setData(res.data.filter((e) => e !== null));
        setLoading("success");
      });
    };
    res();
  }, [to]);

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
          <Table colorScheme="linkedin" variant="striped">
            <Thead>
              <Tr>
                <Th>Empleado</Th>
                <Th>Ciudad</Th>
                <Th>Estado</Th>
                <Th>Valoración</Th>
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
                    <Td textAlign="center">
                      {e.valoration === 0 ? (
                        <Button
                          colorScheme="linkedin"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelected(e);
                            onOpen();
                          }}
                        >
                          Valorar
                        </Button>
                      ) : (
                        e.valoration + " / 10"
                      )}
                    </Td>
                    <Td isNumeric>{e.employeer.jobs.length}</Td>
                    <Td>
                      <HStack justify="end">
                        {e.state === "pendiente" && (
                          <Link
                            isExternal
                            href={`https://wa.me/5930${e.employeer.phone}`}
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
                        {e.state !== "finalizado" && (
                          <>
                            <IconButton
                              aria-label="Cancelar empleado"
                              colorScheme="red"
                              icon={<NotAllowedIcon />}
                              onClick={async () => {
                                await axios
                                  .post("/api/deleteEmployeer", {
                                    id: e.id,
                                  })
                                  .then(() => {
                                    to({
                                      title: "Cancelado",
                                      description:
                                        "El empleado ha sido cancelado",
                                      status: "success",
                                      position: "top-right",
                                      duration: 4000,
                                      isClosable: true,
                                    });
                                    setData(
                                      data.map((em) => {
                                        if (em.id === e.id) {
                                          em.state = "cancelado";
                                        }
                                        return em;
                                      }),
                                    );
                                  });
                              }}
                            />
                            <IconButton
                              aria-label="Contratar empleado"
                              colorScheme="green"
                              icon={<CheckCircleIcon />}
                              onClick={async () => {
                                await axios
                                  .post("/api/asignEmployeer", {
                                    id: e.id,
                                  })
                                  .then(() => {
                                    to({
                                      title: "Contratado",
                                      description:
                                        "El empleado ha sido contratado",
                                      status: "success",
                                      position: "top-right",
                                      duration: 4000,
                                      isClosable: true,
                                    });
                                    setData(
                                      data.map((em) => {
                                        if (em.id === e.id) {
                                          em.state = "pendiente";
                                        }
                                        return em;
                                      }),
                                    );
                                  });
                              }}
                            />
                          </>
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
      <Valoracion data={selected} isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default ListEmployees;
