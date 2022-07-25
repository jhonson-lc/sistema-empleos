import { Input } from "@chakra-ui/react";
import React from "react";
import FormControl from "ui/form/FormControl";

import Numb from "../Numb";

interface Props {
  errors: any;
  register: any;
  index: number;
}

const Estudios: React.FC<Props> = ({ errors, register, index }) => {
  return (
    <>
      <Numb index={index} />
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
