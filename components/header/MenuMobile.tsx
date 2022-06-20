import React from "react";
import {
  Icon,
  IconButton,
  Stack,
  useDisclosure,
  Menu,
  MenuButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";

import { LINKS_NAV } from "./constants";
import LinkItem from "./LinkItem";

interface Props {
  path: string;
}

const MenuMobile: React.FC<Props> = ({ path }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Menu>
      <MenuButton
        _active={{ boxShadow: "none" }}
        _focus={{ boxShadow: "none" }}
        _hover={{ transform: "scale(1.1)" }}
        aria-label="Options"
        as={IconButton}
        color="white"
        display={{ base: "flex", lg: "none" }}
        fontSize={45}
        icon={<GiHamburgerMenu />}
        ml={5}
        variant="ghost"
        onClick={() => onOpen()}
      />
      <Drawer
        blockScrollOnMount={false}
        isOpen={isOpen}
        returnFocusOnClose={false}
        size="sm"
        onClose={onClose}
      >
        <DrawerOverlay
          backdropFilter="blur(2px) hue-rotate(90deg)"
          bg="blackAlpha.300"
        />
        <DrawerContent w="300px">
          <DrawerCloseButton
            _focus={{ boxShadow: "none" }}
            _hover={{
              bg: "none",
              fontSize: "25px",
              transform: "scale(1.1)",
            }}
            color="white"
            fontSize="20px"
            pos="absolute"
            right="1.5vw"
            top="1.5vw"
            zIndex="1"
          />
          <DrawerBody as={Stack} bg="primary.500" p={14} spacing={6}>
            <Stack
              alignItems="center"
              direction="column"
              gap={12}
              h="full"
              justifyContent="center"
            >
              {LINKS_NAV.map(({ href, text, icon }) => {
                return (
                  <LinkItem
                    key={href}
                    font={{ size: 20, weight: 900 }}
                    href={href}
                    path={path}
                    onClose={onClose}
                  >
                    {icon ? (
                      <Stack align="center" direction="row">
                        <span>{text}</span>
                        <Icon as={icon} />
                      </Stack>
                    ) : (
                      <span>{text}</span>
                    )}
                  </LinkItem>
                );
              })}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Menu>
  );
};

export default MenuMobile;
