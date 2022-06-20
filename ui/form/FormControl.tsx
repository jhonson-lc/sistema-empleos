import React from "react";
import {
  FormControl as ChakraFormControl,
  FormHelperText,
  FormErrorMessage,
  FormControlProps,
  Stack,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

import FormLabel from "./FormLabel";

interface Props extends FormControlProps {
  error?: string | React.ReactNode;
  name?: string;
  help?: string;
  label?: string;
  note?: string;
  isRequired?: boolean;
  info?: string | React.ReactNode;
}

const FormControl: React.FC<Props> = ({
  error,
  name,
  label,
  help,
  note,
  children,
  info,
  isRequired,
  ...props
}) => {
  return (
    <ChakraFormControl isInvalid={Boolean(error)} py={2} {...props}>
      {label && (
        <Stack isInline alignItems="center">
          <FormLabel
            info={info}
            isRequired={isRequired}
            name={name}
            note={note}
          >
            {label}
          </FormLabel>
        </Stack>
      )}
      {children}
      {help && !error && (
        <FormHelperText fontSize={12} fontWeight={300}>
          {help}
        </FormHelperText>
      )}
      {error && (
        <HStack>
          <Icon as={WarningIcon} color="red.500" />
          <FormErrorMessage color="red.500">{error}</FormErrorMessage>
        </HStack>
      )}
    </ChakraFormControl>
  );
};

export default FormControl;
