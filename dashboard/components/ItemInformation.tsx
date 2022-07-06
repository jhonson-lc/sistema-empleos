import { Text, HStack, Input } from "@chakra-ui/react";

type item = {
  text: string;
  value: string;
  onChange?: any;
};

const ItemInformation = ({ text, value, onChange }: item) => {
  return (
    <HStack w={600}>
      <Text fontSize={16} fontWeight={600} minW={200}>
        {text}
      </Text>
      <Input value={value} onChange={onChange} />
    </HStack>
  );
};

export default ItemInformation;
