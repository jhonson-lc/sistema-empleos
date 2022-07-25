import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Stack,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import Info from "components/form/Info";
import React from "react";
import axios from "axios";
import FormControl from "ui/form/FormControl";
import { useForm } from "react-hook-form";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  data: any;
}

const Valoracion: React.FC<Props> = ({ isOpen, data, onClose }) => {
  const [sliderValue, setSliderValue] = React.useState(5);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const to = useToast();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = async (values: any) => {
    data = { ...data, obs: values.obs };
    await axios.post("/api/rateEmployeer", { data, sliderValue }).then(() => {
      to({
        title: "Calificado",
        description: "El empleado ha sido valorado",
        status: "success",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      onClose();
    });
  };
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid alignItems="center" columns={2}>
                <Stack>
                  <Heading color="primary.500" my={2} size="md">
                    Calificar al empleado
                  </Heading>
                  <Info />
                </Stack>
                <Stack p={4} spacing={8}>
                  <Text fontSize="sm" fontWeight={500}>
                    Valoración
                  </Text>
                  <Slider
                    colorScheme="red"
                    defaultValue={5}
                    id="slider"
                    max={10}
                    min={1}
                    step={0.1}
                    onChange={(v) => setSliderValue(v)}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <SliderMark fontSize="sm" ml="-1" mt="2.5" value={5}>
                      5
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      bg="red.500"
                      color="white"
                      isOpen={showTooltip}
                      label={`${sliderValue}`}
                      placement="top"
                    >
                      <SliderThumb />
                    </Tooltip>
                  </Slider>
                  <FormControl
                    error={errors.obs && "Este campo es requerido"}
                    label="Observación"
                    name="obs"
                  >
                    <Textarea
                      {...register("obs", {
                        required: true,
                        validate: (value) => value !== "",
                      })}
                      fontSize={12}
                      fontWeight={500}
                      lineHeight={7}
                      overflowY="auto"
                      placeholder="Qué opinas del servicio ofrecido?"
                      resize={"none"}
                      rows={3}
                      variant="filled"
                    />
                  </FormControl>
                </Stack>
              </SimpleGrid>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="blue" type="submit" variant="ghost">
                Enviar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Valoracion;
