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

const Referencias: React.FC<Props> = ({ data, errors, register, index }) => {
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
                  ref: "references",
                })
                .then(() => {
                  to({
                    title: "Referencia eliminada",
                    description: "La referencia ha sido eliminada con éxito",
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
          errors.firstNameRe &&
          (errors.firstNameRe.message || "Este campo es requerido")
        }
        label="Nombre"
        name={`references.${index}.firstname`}
      >
        <Input
          {...register(`references.${index}.firstname`, {
            required: true,
            validate: (value) => value !== "",
            maxLength: {
              value: 20,
              message: "El nombre no puede tener más de 20 caracteres",
            },
          })}
          placeholder="Juan"
        />
      </FormControl>
      <FormControl
        isRequired
        error={
          errors.lastNameRe &&
          (errors.lastNameRe.message || "Este campo es requerido")
        }
        label="Apellido"
        name={`references.${index}.lastname`}
      >
        <Input
          {...register(`references.${index}.lastname`, {
            required: true,
            validate: (value) => value !== "",
            maxLength: {
              value: 20,
              message: "El apellido no puede tener más de 20 caracteres",
            },
          })}
          placeholder="Peréz"
        />
      </FormControl>
      <FormControl
        isRequired
        error={
          errors.relation &&
          (errors.relation.message || "Este campo es requerido")
        }
        label="Parentesco"
        name={`references.${index}.relation`}
      >
        <Input
          {...register(`references.${index}.relation`, {
            required: true,
            validate: (value) => value !== "",
            maxLength: {
              value: 20,
              message: "El parentesco no puede tener más de 20 caracteres",
            },
          })}
          placeholder="Hermano"
        />
      </FormControl>
      <FormControl
        isRequired
        error={errors.phoneRe && "Son 9 dígitos válidos"}
        help="Ej: 0987654321 ó 021212345"
        label="Teléfono/Celular"
        name={`references.${index}.phonenumber`}
      >
        <InputGroup>
          <InputLeftAddon children="+593" pointerEvents="none" />
          <Input
            inputMode="numeric"
            placeholder="987654321"
            {...register(`references.${index}.phonenumber`, {
              required: true,
              pattern: /^\d{9}$/,
            })}
            type="number"
          />
        </InputGroup>
      </FormControl>
    </>
  );
};

export default Referencias;
