import { Text, HStack } from "@chakra-ui/react";
import React from "react";

interface Props {
  index: number;
}

const Numb: React.FC<Props> = ({ index }) => {
  return (
    <HStack justify="center">
      <HStack
        border="1px solid blue"
        h={5}
        justify={"center"}
        maxW={5}
        rounded="full"
        w="full"
      >
        <Text color="primary.500" fontSize="xs">
          {index + 1}
        </Text>
      </HStack>
    </HStack>
  );
};

export default Numb;
