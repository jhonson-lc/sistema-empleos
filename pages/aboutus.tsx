import {
  Avatar,
  Box,
  chakra,
  Flex,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

const testimonials = [
  {
    name: "Kevin Ganán",
    role: "Ingeniero en Software",
    content:
      "Nuestra mayor debilidad reside en rendirnos. La forma más segura de tener éxito es intentarlo una vez más.",
    avatar: "https://avatars.githubusercontent.com/u/105674689?v=4",
  },
  {
    name: "Eduardo Pila",
    role: "Ingeniero en Software",
    content:
      "Odié cada minuto de entrenamiento, pero dije, no te rindas. Sufre ahora y vive el resto de tu vida como un campeón.",
    avatar: "https://avatars.githubusercontent.com/u/96484150?v=4",
  },
  {
    name: "Anthony Solis",
    role: "Ingeniero en Software",
    content:
      "La gente exitosa estudia para ganar conocimientos, no para ganar carreras.",
    avatar: "https://avatars.githubusercontent.com/u/109778441?v=4",
  },
  {
    name: "Jhon Lescano",
    role: "Ingeniero en Software",
    content:
      "El auténtico problema no es si las máquinas piensan, sino si lo hacen los hombres.",
    avatar:
      "https://cdn.sanity.io/images/1o23k2di/production/6325b24bc5ea06d2c49f4be402a51743bd61fd29-320x320.jpg",
  },
];

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  index: number;
}

function TestimonialCard(props: TestimonialCardProps) {
  const { name, role, content, avatar } = props;
  return (
    <Flex
      _after={{
        content: '""',
        position: "absolute",
        height: "21px",
        width: "29px",
        left: "35px",
        top: "-10px",
        backgroundSize: "cover",
        backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='29' height='21' viewBox='0 0 29 21' fill='none'%3E%3Cpath d='M6.91391 21C4.56659 21 2.81678 20.2152 1.66446 18.6455C0.55482 17.0758 0 15.2515 0 13.1727C0 11.2636 0.405445 9.43939 1.21634 7.7C2.0699 5.91818 3.15821 4.3697 4.48124 3.05454C5.84695 1.69697 7.31935 0.678787 8.89845 0L13.3157 3.24545C11.5659 3.96667 9.98676 4.94242 8.57837 6.17273C7.21266 7.36061 6.25239 8.63333 5.69757 9.99091L6.01766 10.1818C6.27373 10.0121 6.55114 9.88485 6.84989 9.8C7.19132 9.71515 7.63944 9.67273 8.19426 9.67273C9.34658 9.67273 10.4776 10.097 11.5872 10.9455C12.7395 11.7939 13.3157 13.1091 13.3157 14.8909C13.3157 16.8848 12.6542 18.4121 11.3311 19.4727C10.0508 20.4909 8.57837 21 6.91391 21ZM22.5982 21C20.2509 21 18.5011 20.2152 17.3488 18.6455C16.2391 17.0758 15.6843 15.2515 15.6843 13.1727C15.6843 11.2636 16.0898 9.43939 16.9007 7.7C17.7542 5.91818 18.8425 4.3697 20.1656 3.05454C21.5313 1.69697 23.0037 0.678787 24.5828 0L29 3.24545C27.2502 3.96667 25.6711 4.94242 24.2627 6.17273C22.897 7.36061 21.9367 8.63333 21.3819 9.99091L21.702 10.1818C21.9581 10.0121 22.2355 9.88485 22.5342 9.8C22.8756 9.71515 23.3238 9.67273 23.8786 9.67273C25.0309 9.67273 26.1619 10.097 27.2715 10.9455C28.4238 11.7939 29 13.1091 29 14.8909C29 16.8848 28.3385 18.4121 27.0155 19.4727C25.7351 20.4909 24.2627 21 22.5982 21Z' fill='%239F7AE2'/%3E%3C/svg%3E")`,
      }}
      _before={{
        content: '""',
        position: "absolute",
        zIndex: "-1",
        height: "full",
        maxW: "640px",
        width: "full",
        filter: "blur(10px)",
        transform: "scale(0.98)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        border: "5px solid lightblue",
        top: 0,
        left: 0,
      }}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      direction={{ base: "column-reverse", md: "row" }}
      justifyContent={"space-between"}
      maxW={"640px"}
      p={10}
      position={"relative"}
      rounded={"xl"}
      width={"full"}
    >
      <Flex
        direction={"column"}
        justifyContent={"space-between"}
        textAlign={"left"}
      >
        <chakra.p fontSize={"15px"} fontWeight={"sm"} pb={4}>
          {content}
        </chakra.p>
        <chakra.p fontSize={14} fontWeight={500}>
          {name}
          <chakra.span color={"gray.500"} fontWeight={400}>
            {" "}
            - {role}
          </chakra.span>
        </chakra.p>
      </Flex>
      <Avatar
        alignSelf={"center"}
        height={"80px"}
        m={{ base: "0 0 35px 0", md: "0 0 0 50px" }}
        src={avatar}
        width={"80px"}
      />
    </Flex>
  );
}

export default function GridBlurredBackdrop() {
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      py={10}
      textAlign={"center"}
      width={"full"}
    >
      <Box margin={"auto"} width={{ base: "full", sm: "lg", lg: "xl" }}>
        <chakra.h3
          color={"primary.400"}
          fontSize={20}
          fontWeight={"bold"}
          textTransform={"uppercase"}
        >
          Nuestro Equipo
        </chakra.h3>
        <chakra.h1
          color={useColorModeValue("gray.700", "gray.50")}
          fontSize={48}
          fontWeight={"bold"}
          py={5}
        >
          Somos estudiantes de la UTA
        </chakra.h1>
        <chakra.h2
          color={useColorModeValue("gray.500", "gray.400")}
          fontWeight={"medium"}
          margin={"auto"}
          width={"70%"}
        >
          Descubre por qué más de{" "}
          <chakra.strong color={useColorModeValue("gray.700", "gray.50")}>
            150,000+
          </chakra.strong>{" "}
          trabajadores utilizan WORKSEARCH para gestionar sus contratos de
          empleo.
        </chakra.h2>
      </Box>
      <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        mt={16}
        mx={"auto"}
        spacing={"20"}
      >
        {testimonials.map((cardInfo, index) => (
          <TestimonialCard key={index} {...cardInfo} index={index} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
