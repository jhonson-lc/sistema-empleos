import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { differenceInYears, parseISO } from "date-fns";
import React from "react";

import ItemInformation from "./ItemInformation";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  data: any;
}

const Information: React.FC<Props> = ({ isOpen, data, onClose }) => {
  if (!data) return;
  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="2xl"
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Datos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2}>
              <Stack>
                <Heading color="primary.500" my={2} size="md">
                  Información Personal
                </Heading>
                <ItemInformation text="Cédula" value={data.identification} />
                <ItemInformation
                  text="Nombre"
                  value={data.firstname + " " + data.lastname}
                />
                <ItemInformation text="Email" value={data.email} />
                <ItemInformation text="Telefóno" value={data.phone} />
                <ItemInformation text="Ciudad" value={data.city} />
                <ItemInformation
                  text="Edad"
                  value={
                    "" +
                    differenceInYears(new Date(), parseISO(data.date)) +
                    " años"
                  }
                />
              </Stack>
              <Stack>
                <Heading color="primary.500" my={2} size="md">
                  Experiencia
                </Heading>
                {data.experience.map((ex) => {
                  return (
                    <div key={ex.text}>
                      <ItemInformation text="Empresa" value={ex.company} />
                      <ItemInformation text="Cargo" value={ex.position} />
                      <ItemInformation text="Teléfono" value={data.phone} />
                    </div>
                  );
                })}
              </Stack>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Volver
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Information;
