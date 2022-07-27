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

const Habilidades: React.FC<Props> = ({ data, errors, register, index }) => {
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
            aria-label="Eliminar habilidad"
            colorScheme="red"
            icon={<DeleteIcon />}
            onClick={async () => {
              await axios
                .post("/api/deleteReference", {
                  id: data[index].id,
                  ref: "skills",
                })
                .then(() => {
                  to({
                    title: "Habilidad eliminada",
                    description: "La habilidad ha sido eliminada con éxito",
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
          errors?.skills &&
          errors?.skills[index] !== undefined &&
          (errors?.skills[index]?.description?.message ||
            "Este campo es requerido")
        }
        label="Nombre de la habilidad"
        name={`skills.${index}.description`}
      >
        <Input
          {...register(`skills.${index}.description`, {
            required: true,
            validate: (value) => value !== "",
            maxLength: {
              value: 50,
              message: "La habilidad no puede tener más de 50 caracteres",
            },
          })}
          placeholder="Tomar fotos"
        />
      </FormControl>
    </>
  );
};

export default Habilidades;
