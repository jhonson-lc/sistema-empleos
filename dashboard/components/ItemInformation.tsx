import { Text, HStack } from "@chakra-ui/react";

type item = {
  text: string;
  value: string;
};

const ItemInformation = ({ text, value }: item) => {
  return (
    <HStack justify="start">
      <Text fontSize={14} fontWeight={500}>
        {text} :
      </Text>
      <Text fontSize={14} fontWeight={500}>
        {value}
      </Text>
    </HStack>
  );
};

export default ItemInformation;
