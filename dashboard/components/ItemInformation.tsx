import { Text, HStack } from "@chakra-ui/react";

type item = {
  text: string;
  value: string;
};

const ItemInformation = ({ text, value }: item) => {
  return (
    <HStack justify="start">
      <Text fontSize={14} fontWeight={600}>
        {text} :
      </Text>
      <Text fontSize={14} fontWeight={300}>
        {value}
      </Text>
    </HStack>
  );
};

export default ItemInformation;
