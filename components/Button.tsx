import React from "react";
import NextLink from "next/link";
import { Button as ButtonChakra, Link } from "@chakra-ui/react";

interface Props {
  text: string;
  color?: string;
  bg?: string;
  href: string;
  icon?: any;
  external?: boolean;
  enabled?: boolean;
}

const Button: React.FC<Props> = ({
  text,
  color = "background",
  bg = "primary",
  href,
  icon,
  external,
  enabled,
}) => {
  return (
    <NextLink passHref href={href}>
      <Link isExternal={external}>
        <ButtonChakra
          _focus={{ boxShadow: "none" }}
          _hover={{
            background: bg,
            ring: "2px",
            borderColor: "transparent",
            ringColor: "primary.900",
            ringOffset: "2px",
            ringOffsetColor: "primary.500",
          }}
          bg={bg}
          borderColor="transparent"
          borderWidth={2}
          color={color}
          fontSize={16}
          isDisabled={enabled}
          px="25px"
          py="20px"
          rightIcon={icon}
          rounded={10}
        >
          {text}
        </ButtonChakra>
      </Link>
    </NextLink>
  );
};

export default Button;
