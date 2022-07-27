import { DeleteIcon } from "@chakra-ui/icons";
import {
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import FormControl from "ui/form/FormControl";

import Numb from "../Numb";

interface Props {
  errors: any;
  register: any;
  index: number;
  data?: any;
}

const Experiencia: React.FC<Props> = ({ errors, data, register, index }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const to = useToast();
  const router = useRouter();
  React.useEffect(() => {
    if (data) {
      if (data[index]) {
        setShow(true);
      }
    }
  }, [data]);
  return (
    <>
      <HStack justify={"space-between"} w="full">
        <Numb index={index} />
        {show && (
          <IconButton
            aria-label="Eliminar experiencia"
            colorScheme="red"
            icon={<DeleteIcon />}
            onClick={async () => {
              await axios
                .post("/api/deleteReference", {
                  id: data[index].id,
                  ref: "experience",
                })
                .then(() => {
                  to({
                    title: "Experiencia eliminada",
                    description: "La experiencia ha sido eliminada con éxito",
                    status: "success",
                    position: "top-right",
                    duration: 9000,
                    isClosable: true,
                  });
                });
              router.reload();
            }}
          />
        )}
      </HStack>
      <FormControl
        isRequired
        error={
          errors?.experience &&
          errors?.experience[index] !== undefined &&
          errors?.experience[index]?.company !== undefined &&
          (errors?.experience[index]?.company?.message ||
            "Este campo es requerido")
        }
        label="Nombre de la Empresa"
        name={`experience.${index}.company`}
      >
        <Input
          {...register(`experience.${index}.company`, {
            required: true,
            validate: (value) => value !== "",
            maxLength: {
              value: 40,
              message: "El nombre no puede tener más de 40 caracteres",
            },
          })}
          placeholder="Tecnologías Ambato"
        />
      </FormControl>
      <FormControl
        isRequired
        error={
          errors?.experience &&
          errors?.experience[index] !== undefined &&
          errors?.experience[index]?.position !== undefined &&
          (errors?.experience[index]?.position?.message ||
            "Este campo es requerido")
        }
        label="Cargo"
        name={`experience.${index}.position`}
      >
        <Input
          {...register(`experience.${index}.position`, {
            required: true,
            validate: (value) => value !== "",
            maxLength: {
              value: 50,
              message: "El cargo no puede tener más de 50 caracteres",
            },
          })}
          placeholder="Líder de Software"
        />
      </FormControl>
      <FormControl
        isRequired
        error={
          errors?.experience &&
          errors?.experience[index] !== undefined &&
          errors?.experience[index]?.phone !== undefined &&
          (errors?.experience[index]?.phone?.message || "Son 9 dígitos válidos")
        }
        help="Ej: 0987654321 ó 021212345"
        label="Teléfono/Celular"
        name={`experience.${index}.phone`}
      >
        <InputGroup>
          <InputLeftAddon children="+593" pointerEvents="none" />
          <Input
            inputMode="numeric"
            placeholder="987654321"
            {...register(`experience.${index}.phone`, {
              required: true,
              pattern: /^\d{9}$/,
            })}
            type="number"
          />
        </InputGroup>
      </FormControl>
      <FormControl
        isRequired
        error={
          errors?.experience &&
          errors?.experience[index] !== undefined &&
          errors?.experience[index]?.startDate !== undefined &&
          (errors?.experience[index]?.startDate?.message ||
            "Este campo es requerido")
        }
        label="Fecha de Inicio"
        name={`experience.${index}.startDate`}
      >
        <Input
          errors={errors.startDate}
          name={`experience.${index}.startDate`}
          type="date"
          {...register(`experience.${index}.startDate`, {
            required: true,
            validate: (value) => value !== "",
          })}
        />
      </FormControl>
      <FormControl
        isRequired
        error={
          errors?.experience &&
          errors?.experience[index] !== undefined &&
          errors?.experience[index]?.endDate !== undefined &&
          (errors?.experience[index]?.endDate?.message ||
            "Este campo es requerido")
        }
        label="Fecha de fin"
        name={`experience.${index}.endDate`}
      >
        <Input
          errors={errors.startDate}
          name={`experience.${index}.endDate`}
          type="date"
          {...register(`experience.${index}.endDate`, {
            required: true,
            validate: (value) => value !== "",
          })}
          placeholder="dd/mm/yyyy"
        />
      </FormControl>
    </>
  );
};

export default Experiencia;
