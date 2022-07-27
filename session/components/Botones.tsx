import { Button, HStack } from "@chakra-ui/react";
import React from "react";

interface Props {
  setState: any;
  state: any;
}

const Botones: React.FC<Props> = ({ setState, state }) => {
  const [tot, setTot] = React.useState<number>(state);
  return (
    <HStack justify="center" pb={6}>
      <Button
        colorScheme="green"
        onClick={() => {
          setState(state + 1);
          setTot(tot);
        }}
      >
        +
      </Button>
      {state > tot && (
        <Button
          colorScheme="red"
          onClick={() => {
            setState(state - 1);
            setTot(tot);
          }}
        >
          -
        </Button>
      )}
    </HStack>
  );
};

export default Botones;
