import { Button, HStack } from "@chakra-ui/react";
import React from "react";

interface Props {
  text?: string;
  setState: (text: string) => void;
  state: string;
}

const OnlyButton: React.FC<Props> = ({ text, state, setState }) => {
  const active = state === text.toLowerCase();
  return (
    <Button
      bg={active ? "white" : "primary.500"}
      border={`2px solid ${active ? "lightblue" : "white"}`}
      color={active ? "primary.500" : "white"}
      colorScheme={active ? "whiteAlpha" : "blue"}
      rounded="none"
      onClick={() => setState(text.toLowerCase())}
    >
      {text}
    </Button>
  );
};

const StateButton: React.FC<Props> = ({ state, setState }) => {
  return (
    <HStack justify={"center"} my={8} spacing={0} w="full" wrap={"wrap"}>
      <OnlyButton setState={setState} state={state} text="Todos" />
      <OnlyButton setState={setState} state={state} text="Pendiente" />
      <OnlyButton setState={setState} state={state} text="Cancelado" />
      <OnlyButton setState={setState} state={state} text="Finalizado" />
    </HStack>
  );
};
export default StateButton;
