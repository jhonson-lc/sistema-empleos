import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import React from "react";
import FormControl from "ui/form/FormControl";

interface Props {
  errors: any;
  register: any;
}

const Personal: React.FC<Props> = ({ errors, register }) => {
  return (
    <>
      <FormControl
        isRequired
        error={
          errors.firstName &&
          (errors.firstName.message || "Este campo es requerido")
        }
        label="Nombre"
        name="firstName"
      >
        <Input
          {...register("firstName", {
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
          errors.lastName &&
          (errors.lastName.message || "Este campo es requerido")
        }
        label="Apellido"
        name="lastName"
      >
        <Input
          {...register("lastName", {
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
          errors.cedula && (errors.cedula.message || "Este campo es requerido")
        }
        label="Cédula"
        name="cedula"
      >
        <Input
          {...register("cedula", {
            required: true,
            validate: (value) => value !== "",
            maxLength: {
              value: 10,
              message: "La cédula no puede tener más de 10 dígitos",
            },
          })}
          placeholder="1726456785"
        />
      </FormControl>
      <FormControl
        isRequired
        error={errors.date && "Este campo es requerido"}
        label="Fecha de nacimiento"
        name="date"
      >
        <Input
          errors={errors.startDate}
          name={`date`}
          type="date"
          {...register(`date`, {
            required: true,
            validate: (value) => value !== "",
          })}
          placeholder="dd/mm/yyyy"
        />
      </FormControl>
      <FormControl
        isRequired
        error={errors.phone && "Son 9 dígitos válidos"}
        help="Ej: 0987654321 ó 021212345"
        label="Teléfono/Celular"
        name="phone"
      >
        <InputGroup>
          <InputLeftAddon children="+593" pointerEvents="none" />
          <Input
            inputMode="numeric"
            placeholder="987654321"
            {...register("phone", {
              required: true,
              pattern: /^\d{9}$/,
            })}
            type="number"
          />
        </InputGroup>
      </FormControl>
      <FormControl
        isRequired
        error={errors.ciudad && "Este campo es requerido"}
        label="Ciudad"
        name="ciudad"
      >
        <Input
          {...register("ciudad", {
            required: true,
            validate: (value) => value !== "",
          })}
          placeholder="Ambato"
        />
      </FormControl>
      <FormControl
        isRequired
        error={errors.profesion && "Este campo es requerido"}
        label="Profesión"
        name="profesion"
      >
        <Input
          {...register("profesion", {
            required: true,
            validate: (value) => value !== "",
          })}
          placeholder="Scrum Master"
        />
      </FormControl>
    </>
  );
};

export default Personal;
