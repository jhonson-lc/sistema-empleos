import React from "react";
import { Stack, Text } from "@chakra-ui/react";

const Info: React.FC = () => (
  <Stack spacing={4}>
    <Text>
      <Text as="b" marginRight={1}>
        Salón pequeño:
      </Text>
      Capacidad de 100 personas.
    </Text>
    <Text>
      <Text as="b" marginRight={1}>
        Salón mediano:
      </Text>
      Capacidad de 150 personas.
    </Text>
    <Text>
      <Text as="b" marginRight={1}>
        Salón grande:
      </Text>
      Capacidad de 200 personas.
    </Text>
  </Stack>
);

export default Info;
