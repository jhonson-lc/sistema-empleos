import React from "react";
import { Stack, Text } from "@chakra-ui/react";

const Info: React.FC = () => (
  <Stack spacing={4}>
    <Text>
      <Text as="b" marginRight={1}>
        NOTA:
      </Text>
      Si usted califica al empleado el contrato finalizará, y ya no podrá hacer
      cambios.
    </Text>
  </Stack>
);

export default Info;
