import React from "react";
import Link from "next/link";
import { Image } from "@chakra-ui/react";

interface Props {
  size?: number;
}

const Logo: React.FC<Props> = () => {
  return (
    <Link href="/">
      <Image src="/logo.png" w={[16, 100]} />
    </Link>
  );
};

export default Logo;
