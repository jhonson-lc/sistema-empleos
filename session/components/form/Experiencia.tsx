import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import React from "react";
import FormControl from "ui/form/FormControl";

import Numb from "../Numb";

interface Props {
  errors: any;
  register: any;
  index: number;
}

const Experiencia: React.FC<Props> = ({ errors, register, index }) => {
  return (
    <>
      <Numb index={index} />
      <FormControl
        isRequired
        error={
          errors.nameEx && (errors.nameEx.message || "Este campo es requerido")
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
          errors.cargo && (errors.cargo.message || "Este campo es requerido")
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
        error={errors.phoneEx && "Son 9 dígitos válidos"}
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
        error={errors.startDate && "Este campo es requerido"}
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
        error={errors.endDate && "Este campo es requerido"}
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
