import { Text } from "@chakra-ui/react";

export default function showMessage(message: string) {
  return (
    message &&
    message.split("\n").map((item, index) => {
      return <Text key={index}>{item}</Text>;
    })
  );
}
