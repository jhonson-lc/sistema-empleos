import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Button,
  Stack,
  Input,
  useDisclosure,
  useToast,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import Information from "dashboard/components/Information";

interface Props {
  session: any;
}

const Main: React.FC<Props> = ({ session }) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState<string>("init");
  const [searchPosition, setSearchPosition] = React.useState<string>();
  const [searchCity, setSearchCity] = React.useState<string>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = React.useState();
  const to = useToast();

  React.useEffect(() => {
    const res = async () => {
      const r = await axios.get("/api/getEmployeers");
      if (r.status === 200) {
        setData(r.data);
        setLoading("success");
      }
    };
    res();
  }, []);

  const filteredEmployeers = data.filter((employeer) => {
    if (searchPosition && !searchCity) {
      return employeer.experience[0].position
        .toLowerCase()
        .includes(searchPosition.toLowerCase());
    }
    if (searchCity && !searchPosition) {
      return employeer.city.toLowerCase().includes(searchCity.toLowerCase());
    }
    if (searchPosition && searchCity) {
      return (
        employeer.experience[0].position
          .toLowerCase()
          .includes(searchPosition.toLowerCase()) &&
        employeer.city.toLowerCase().includes(searchCity.toLowerCase())
      );
    }
    return employeer;
  });

  const handleAdd = async (e) => {
    await axios
      .post("/api/addEmployeer", { data: e, session })
      .then(() => {
        to({
          title: "Agregado",
          description: "Se ha agregado correctamente a tu lista",
          status: "success",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch(() => {
        to({
          title: "Error",
          description: "Ya tienes este empleado en tu lista",
          status: "error",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
      });
  };

  return (
    <Stack alignItems="center" direction="column" gap={5} w="full">
      <HStack w="full">
        <Input
          borderLeftColor={"primary.500"}
          borderWidth={4}
          placeholder="Profesión"
          value={searchPosition}
          onChange={(e) => setSearchPosition(e.target.value)}
        />
        <Input
          borderLeftColor={"primary.500"}
          borderWidth={4}
          placeholder="Ciudad"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
      </HStack>
      {loading === "init" && <Spinner m={4} size="xl" />}
      {loading === "success" && (
        <TableContainer maxW="container.lg">
          <Heading color="primary.500" mb={6} textAlign="center">
            Empleados disponibles
          </Heading>
          <Table colorScheme="linkedin" variant="striped">
            <Thead>
              <Tr>
                <Th>Empleado</Th>
                <Th>Profesión</Th>
                <Th>Ciudad</Th>
                <Th isNumeric>N. de servicios</Th>
                <Th isNumeric>Valoración</Th>
                <Th>Contacto</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredEmployeers.map((e) => {
                return (
                  <Tr key={e.employeeId}>
                    <Td>{e.firstname + " " + e.lastname}</Td>
                    <Td>{e.experience[0].position}</Td>
                    <Td>{e.city}</Td>
                    <Td isNumeric>{e.job.length || 0}</Td>
                    <Td isNumeric>{e.job.valoration || 0}/5</Td>
                    <Td>
                      <HStack>
                        <Button
                          color="primary.500"
                          size="sm"
                          variant="link"
                          onClick={() => {
                            setSelected(e);
                            onOpen();
                          }}
                        >
                          Información
                        </Button>
                        <Button
                          color="primary.500"
                          size="sm"
                          variant="link"
                          onClick={() => handleAdd(e)}
                        >
                          Agregar
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Information data={selected} isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default Main;
