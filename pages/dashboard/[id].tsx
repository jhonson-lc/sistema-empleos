import React from "react";
import axios from "axios";
import { Badge, Box, Spinner, Stack, Text } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { AnimatePresence, motion } from "framer-motion";
import CreateProfile from "session/screens/CreateProfile";

import { ITEM_DASHBOARD } from "../../dashboard/constants";
import { LinkDashboard, User } from "../../dashboard/types";
import Main from "../../dashboard/screens/Main";
import Personal from "../../dashboard/screens/Personal";
import ListEmployees from "../../dashboard/screens/ListEmployees";

interface Props {
  session: any;
  user: any;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  let user = "";
  if (session) {
    if (session.user?.name) {
      user = session.user?.name;
    }
  }
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
      user,
    },
  };
};

const Dashboard: React.FC<Props> = ({ session, user }) => {
  const [data, setData] = React.useState<User>();
  const [loading, setLoading] = React.useState("init");
  const [value, setValue] = React.useState<LinkDashboard["value"]>("main");
  const StackM = motion(Stack);

  React.useEffect(() => {
    const u =
      session.user.role === "EMPLOYEE" ? "/api/employee/" : "/api/user/";
    const data = async () => {
      const res = await axios.post(u, session.user);
      if (res.status === 200) {
        setData(res.data);
        setLoading("success");
      }
    };
    data();
  }, []);
  if (!user) return <CreateProfile session={session} />;
  return (
    <Stack direction={{ base: "column", lg: "row" }} pos="relative" w="full">
      <Stack
        bg="primary.500"
        borderTopColor="white"
        borderTopWidth={{ base: "1px", lg: "0px" }}
        h={{ base: "full", lg: "85vh" }}
        minW={{ base: "full", lg: "250px" }}
        w="300px"
      >
        {ITEM_DASHBOARD.map((item) => {
          return (
            <Box
              key={item.id}
              bg={item.value === value ? "white" : "primary.500"}
              color={item.value === value ? "primary.500" : "white"}
              cursor="pointer"
              p={5}
              onClick={() => {
                setValue(item.value);
              }}
            >
              <Text>{item.name}</Text>
            </Box>
          );
        })}
      </Stack>
      <Badge
        colorScheme="red"
        fontSize="xs"
        p={2}
        pos="absolute"
        right={0}
        top={2}
        variant="solid"
      >
        {session.user.role}
      </Badge>
      <AnimatePresence>
        <StackM
          alignItems={"start"}
          animate={{ opacity: 1 }}
          direction="column"
          exit={{ opacity: 0 }}
          gap={12}
          initial={{ opacity: 0 }}
          p={{ base: 4, lg: 24 }}
          w="full"
        >
          {loading === "init" && <Spinner size="xl" />}
          {value === "main" && data && <Main session={session} />}
          {value === "personal" && data && (
            <Personal data={data} session={session} />
          )}
          {value === "list" && data && <ListEmployees session={session} />}
        </StackM>
      </AnimatePresence>
    </Stack>
  );
};

export default Dashboard;
