import React from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

import { LinkNav } from "./types";

const LinkItem: React.FC<LinkNav> = ({
  onClose,
  href,
  path,
  children,
  font,
  external,
}) => {
  const active: boolean = path === href;

  return (
    <NextLink passHref href={href}>
      <Link
        _focus={{ boxShadow: "none" }}
        _hover={{ color: !active ? "#d9d9d9" : "0" }}
        borderBottomWidth={active ? "2px" : "0"}
        borderColor="#ffffff"
        color="#ffffff"
        display="inline-block"
        fontSize={font?.size}
        fontWeight={font?.weight}
        isExternal={external}
        pos="relative"
        px={6}
        py={2}
        onClick={onClose}
      >
        {children}
      </Link>
    </NextLink>
  );
};

export default LinkItem;
