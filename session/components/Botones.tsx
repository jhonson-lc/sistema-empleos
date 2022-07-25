import { Button, HStack } from "@chakra-ui/react";
import React from "react";

interface Props {
  setState: any;
  state: any;
}

const Botones: React.FC<Props> = ({ setState, state }) => {
  return (
    <HStack justify="center" pb={6}>
      <Button colorScheme="green" onClick={() => setState(state + 1)}>
        +
      </Button>
      {state > 1 && (
        <Button colorScheme="red" onClick={() => setState(state - 1)}>
          -
        </Button>
      )}
    </HStack>
  );
};

export default Botones;
