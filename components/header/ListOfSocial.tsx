import { Stack, Link, Badge, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import { motion } from "framer-motion";

import { SOCIAL_MEDIAS } from "./constants";

const ListOfSocial = () => {
  return (
    <Stack direction="row" justify="center" spacing={5}>
      {SOCIAL_MEDIAS.map((social) => {
        return (
          <NextLink key={social.text} passHref href={social.href}>
            <Link
              _focus={{ boxShadow: "none" }}
              as={motion.a}
              target="_blank"
              whileHover={{ scale: 1.1 }}
            >
              <Tooltip
                aria-label={social.name}
                bg="gray.50"
                fontSize="10px"
                label={social.name}
                p={1}
                rounded={"none"}
              >
                <Badge
                  colorScheme={social.color}
                  rounded="none"
                  variant="outline"
                >
                  {social.text}
                </Badge>
              </Tooltip>
            </Link>
          </NextLink>
        );
      })}
    </Stack>
  );
};

export default ListOfSocial;
