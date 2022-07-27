import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import {
  Text,
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
  Icon,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import StateButton from "dashboard/components/StateButton";
import { format, parseISO } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import oneDecimal from "utils/oneDecimal";

interface Props {
  session: any;
}

const MainE: React.FC<Props> = ({ session }) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState<string>("init");
  const [order, setOrder] = React.useState<boolean>(false);
  const [stateEmployee, setStateEmployee] = React.useState("todos");

  const filteredData = React.useMemo(() => {
    if (stateEmployee === "todos") {
      return data;
    }
    return data.filter((employee) => employee.state === stateEmployee);
  }, [data, stateEmployee]);
  const TrM = motion(Tr);

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

  return (
    <Stack alignItems="center" direction="column" minH="56vh" w="full">
      {data.length === 0 && loading !== "init" ? (
        <Heading color="primary.500" mb={6} textAlign="center">
          No tienes contratos
        </Heading>
      ) : (
        <Heading color="primary.500" textAlign="center">
          Tus contratos
        </Heading>
      )}
      <Badge colorScheme={"black"} pb={6}>
        Tu valoración{" "}
        {oneDecimal(
          data.reduce((valoration, e) => {
            return valoration + e.valoration;
          }, 0) / data.length || 0,
        )}
        {" / 10"}
      </Badge>
      <StateButton setState={setStateEmployee} state={stateEmployee} />
      {loading === "init" && <Spinner m={4} size="xl" />}
      {data.length > 0 && (
        <TableContainer>
          <Table colorScheme="linkedin" variant="striped">
            <Thead>
              <Tr>
                <Th>Cliente</Th>
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
                <Th textAlign="center">Valoración</Th>
                <Th textAlign="center">Observación</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.length > 0 ? (
                filteredData.map((e) => {
                  return (
                    <AnimatePresence
                      key={e.client.id + self.crypto.randomUUID()}
                    >
                      <TrM
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                      >
                        <Td>{e.client.firstname + " " + e.client.lastname}</Td>
                        <Td>{format(parseISO(e.createdAt), "dd/MM/yyyy")}</Td>
                        <Td>{e.state}</Td>
                        <Td textAlign="center">
                          {e.valoration === 0
                            ? "No hay valoración"
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
                      </TrM>
                    </AnimatePresence>
                  );
                })
              ) : (
                <Tr
                  left={[0, 24]}
                  m={[0, 12]}
                  pos="absolute"
                  right={0}
                  textAlign={"center"}
                  w="full"
                >
                  <Text>
                    No hay empleados <br /> en estado {stateEmployee}
                  </Text>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default MainE;
