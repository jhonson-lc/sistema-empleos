import { Input } from "@chakra-ui/react";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import DatePicker from "react-datepicker";

import Calendar from "./Calendar";

interface Props {
  name: string;
  control?: Control<FieldValues, any>;
  errors?: [x: string];
}

const InputCalendar: React.FC<Props> = ({ name, control, errors }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref } }) => (
        <Input
          ref={ref}
          as={DatePicker}
          borderColor={errors ? "red.500" : "gray.300"}
          calendarContainer={Calendar}
          dateFormat={`dd 'de' MMMM 'del' yyyy `}
          focusBorderColor={errors ? "red.500" : "primary.300"}
          locale="es"
          placeholderText="Seleccione una fecha"
          selected={value}
          timeIntervals={30}
          onChange={onChange}
        />
      )}
      rules={{ required: true, validate: (value) => value !== null }}
    />
  );
};

export default InputCalendar;
