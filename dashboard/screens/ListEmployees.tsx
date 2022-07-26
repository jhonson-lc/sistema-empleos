import { ArrowDownIcon, ArrowUpIcon, NotAllowedIcon } from "@chakra-ui/icons";
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
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import StateButton from "dashboard/components/StateButton";
import Valoracion from "dashboard/components/Valoración";
import { format, parseISO } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface Props {
  session: any;
}

const ListEmployees: React.FC<Props> = ({ session }) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState<string>("init");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = React.useState();
  const [stateEmployee, setStateEmployee] = React.useState<string>("todos");
  const [order, setOrder] = React.useState<boolean>(false);
  const TrM = motion(Tr);

  const filteredData = React.useMemo(() => {
    if (stateEmployee === "todos") {
      return data;
    }
    return data.filter((employee) => employee.state === stateEmployee);
  }, [data, stateEmployee]);

  React.useMemo(() => {
    return filteredData.sort((a, b) => {
      return parseISO(a.createdAt) > parseISO(b.createdAt)
        ? order
          ? -1
          : 1
        : parseISO(a.createdAt) < parseISO(b.createdAt)
        ? order
          ? 1
          : -1
        : 0;
    });
  }, [order]);

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
        <TableContainer>
          <Heading color="primary.500" mb={6} textAlign="center">
            Tus Empleados
          </Heading>
          <StateButton setState={setStateEmployee} state={stateEmployee} />
          <Table colorScheme="linkedin" variant="striped">
            <Thead>
              <Tr>
                <Th>Empleado</Th>
                <Th>Ciudad</Th>
                <Th
                  alignItems="center"
                  display={"flex"}
                  justifyContent={"space-evenly"}
                >
                  Fecha{" "}
                  <Icon
                    as={order ? ArrowUpIcon : ArrowDownIcon}
                    cursor="pointer"
                    onClick={() => setOrder(!order)}
                  />
                </Th>
                <Th>Estado</Th>
                <Th>Valoración</Th>
                <Th isNumeric>N. de servicios</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.length > 0 ? (
                filteredData.map((e) => {
                  return (
                    <AnimatePresence
                      key={e.employeer.employeeId + self.crypto.randomUUID()}
                    >
                      <TrM
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                      >
                        <Td>
                          {e.employeer.firstname + " " + e.employeer.lastname}
                        </Td>
                        <Td>{e.employeer.city}</Td>
                        <Td>{format(parseISO(e.createdAt), "MM/dd/yyyy")}</Td>
                        <Td>{e.state}</Td>
                        <Td textAlign="center">
                          {e.valoration === 0 && e.state !== "cancelado" ? (
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
                            {e.state === "pendiente" && (
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
                              </>
                            )}
                          </HStack>
                        </Td>
                      </TrM>
                    </AnimatePresence>
                  );
                })
              ) : (
                <Tr
                  left={20}
                  m={12}
                  pos="absolute"
                  right={0}
                  textAlign={"center"}
                  w="full"
                >
                  No hay empleados en estado {stateEmployee}
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Valoracion data={selected} isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default ListEmployees;
