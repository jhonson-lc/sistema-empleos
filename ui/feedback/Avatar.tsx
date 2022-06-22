import React from "react";
import {
  Text,
  Avatar as AvatarChakra,
  HStack,
  Menu,
  Button,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";

interface Props {
  scale?: number;
  image?: string;
  session?: any;
}

const variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const Avatar: React.FC<Props> = ({ session, image, scale }) => {
  const StackM = motion(HStack);

  return (
    <StackM
      animate="enter"
      exit="exit"
      initial="initial"
      transform={`scale(${scale}) `}
      transition={{ duration: 0.5 }}
      variants={variants}
    >
      <Menu>
        <MenuButton
          _active={{ bg: "none" }}
          _hover={{ bg: "none" }}
          as={Button}
          bg="none"
        >
          <StackM>
            <AvatarChakra />
            {session && <Text color="white">{session.user.name}</Text>}
          </StackM>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => signOut()}>Cerrar Sesión</MenuItem>
        </MenuList>
      </Menu>
    </StackM>
  );
};

export default Avatar;
