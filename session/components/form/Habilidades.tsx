import { Input } from "@chakra-ui/react";
import React from "react";
import FormControl from "ui/form/FormControl";

import Numb from "../Numb";

interface Props {
  errors: any;
  register: any;
  index: number;
}

const Habilidades: React.FC<Props> = ({ errors, register, index }) => {
  return (
    <>
      <Numb index={index} />
      <FormControl
        isRequired
        error={
          errors.habilidad &&
          (errors.habilidad.message || "Este campo es requerido")
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
