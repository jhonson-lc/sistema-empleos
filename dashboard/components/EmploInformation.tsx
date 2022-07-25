import React from "react";
import FormControl from "ui/form/FormControl";

type item = {
  text: string;
  children: React.ReactNode;
};

const EmploInformation = ({ text, children }: item) => {
  return (
    <FormControl isRequired label={text}>
      {children}
    </FormControl>
  );
};

export default EmploInformation;
