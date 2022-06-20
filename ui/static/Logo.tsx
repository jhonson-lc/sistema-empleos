import React from "react";
import Link from "next/link";
import { Text } from "@chakra-ui/react";

interface Props {
  size?: number;
}

const Logo: React.FC<Props> = ({ size = 24, ...props }) => {
  return (
    <Link href="/">
      <Text
        _focus={{ boxShadow: "none" }}
        color="#ffffff"
        cursor="pointer"
        fontSize={size}
        fontWeight={400}
        p={8}
        {...props}
      >
        WorkSearch
      </Text>
    </Link>
  );
};

export default Logo;
