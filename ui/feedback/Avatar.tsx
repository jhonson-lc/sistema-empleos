import React from "react";
import {
  Text,
  HStack,
  Menu,
  Button,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
  scale?: number;
  session?: any;
}

const variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const Avatar: React.FC<Props> = ({ session, scale }) => {
  const StackM = motion(HStack);
  const router = useRouter();
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
          <StackM
            alignItems="center"
            bg="gray.200"
            h={10}
            justifyContent="center"
            rounded="full"
            w={10}
          >
            {session && (
              <Text color="primary.500" fontSize={24} m={0}>
                {session.user.name ? session.user.name.substring(0, 1) : "A"}
              </Text>
            )}
          </StackM>
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => router.push(`/dashboard/${session.user.id}`)}
          >
            Profile
          </MenuItem>
          <MenuItem onClick={() => signOut()}>Cerrar Sesión</MenuItem>
        </MenuList>
      </Menu>
    </StackM>
  );
};

export default Avatar;
