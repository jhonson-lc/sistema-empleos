import { DeleteIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Input, useToast } from "@chakra-ui/react";
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

const Estudios: React.FC<Props> = ({ data, errors, register, index }) => {
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
            aria-label="Eliminar estudio"
            colorScheme="red"
            icon={<DeleteIcon />}
            onClick={async () => {
              await axios
                .post("/api/deleteReference", {
                  id: data[index].id,
                  ref: "studies",
                })
                .then(() => {
                  to({
                    title: "Estudio eliminado",
                    description: "El estudio ha sido eliminado con éxito",
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
          errors.nivelE && (errors.nivelE.message || "Este campo es requerido")
        }
        label="Nivel de estudio"
        name={`studies.${index}.level`}
      >
        <Input
          {...register(`studies.${index}.level`, {
            required: true,
            validate: (value) => value !== "",
            maxLength: {
              value: 20,
              message: "El nivel no puede tener más de 20 caracteres",
            },
          })}
          placeholder="Primaria"
        />
      </FormControl>
      <FormControl
        isRequired
        error={
          errors.insti && (errors.insti.message || "Este campo es requerido")
        }
        label="Institución"
        name={`studies.${index}.school`}
      >
        <Input
          {...register(`studies.${index}.school`, {
            required: true,
            validate: (value) => value !== "",
            maxLength: {
              value: 20,
              message:
                "El nombre de la institución no puede tener más de 20 caracteres",
            },
          })}
          placeholder="Escuela Ambato"
        />
      </FormControl>
      <FormControl
        isRequired
        error={
          errors.titleO && (errors.titleO.message || "Este campo es requerido")
        }
        label="Título obtenido"
        name={`studies.${index}.academic`}
      >
        <Input
          {...register(`studies.${index}.academic`, {
            required: true,
            validate: (value) => value !== "",
            maxLength: {
              value: 50,
              message:
                "El nombre del título obtenido no puede tener más de 50 caracteres",
            },
          })}
          placeholder="Bachiller en Ciencias"
        />
      </FormControl>
    </>
  );
};

export default Estudios;
