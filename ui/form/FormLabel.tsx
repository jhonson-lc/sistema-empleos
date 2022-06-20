import {
  FormLabel as ChakraFormLabel,
  Text,
  BoxProps,
  Collapse,
  Stack,
  FormLabelProps,
  Box,
  Badge,
} from "@chakra-ui/react";
import React from "react";

import HelpCircleIcon from "../icons/HelpCircle";

interface Props extends BoxProps {
  isRequired?: boolean;
  name?: string;
  note?: string;
  info?: string | React.ReactNode;
  props?: FormLabelProps;
}

const FormLabel: React.FC<Props> = ({
  isRequired,
  name,
  children,
  note,
  info,
  props,
}) => {
  const [isInfoOpen, toggleInfo] = React.useState(false);

  function handleToggleInfo() {
    toggleInfo(!isInfoOpen);
  }

  return (
    <Stack>
      <ChakraFormLabel
        alignItems="center"
        display="flex"
        htmlFor={name}
        m={0}
        {...props}
      >
        <Text fontSize="sm" fontWeight={500}>
          {children}
        </Text>
        {note && (
          <Text color="gray.400" fontSize="xs" marginLeft={1}>
            {note}
          </Text>
        )}
        {info && (
          <HelpCircleIcon
            color="gray.600"
            cursor="pointer"
            marginLeft={1}
            size={16}
            onClick={handleToggleInfo}
          />
        )}
        {isRequired ? (
          <Badge
            backgroundColor="primary.50"
            color="primary.500"
            h={3}
            lineHeight={0.75}
            ml={2}
            p={1}
            rounded="sm"
          >
            *
          </Badge>
        ) : null}
      </ChakraFormLabel>
      {info && (
        <Collapse in={isInfoOpen}>
          <Box
            bg="gray.50"
            color="black"
            fontSize="sm"
            padding={2}
            rounded="md"
            whiteSpace="pre-line"
          >
            {info}
          </Box>
        </Collapse>
      )}
    </Stack>
  );
};

export default FormLabel;
