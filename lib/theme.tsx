import { extendTheme, theme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export default extendTheme({
  fonts: {
    body: "'Poppins'",
  },
  styles: {
    global: {
      body: {
        bg: "#fafafa",
        fontFamily: "Poppins",
      },
      html: {
        scrollBehavior: "smooth",
      },
    },
  },
  colors: {
    primary: theme.colors.blue,
    secondary: "#000000",
    paragraph: "#5a5a5a",
  },
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: "primary.300",
        errorBorderColor: "red.500",
        variant: "filled",
      },
    },
    Heading: {
      variants: {
        "title-section": {
          fontSize: 48,
          marginTop: 3,
          marginBottom: 3,
        },
      },
    },
    Text: {
      variants: {
        information: {
          color: "secondary",
          fontWeight: "light",
          fontSize: "sm",
        },
        linkexternal: {
          color: "primary",
          fontWeight: "light",
          fontSize: "sm",
          textDecoration: "underline",
        },
      },
    },
    Button: {
      variants: {
        external: {
          borderRadius: "none",
          variant: "ghost",
          color: "primary",
          _hover: { textDecoration: "underline" },
        },
      },
    },
    Link: {
      baseStyle: (props: any) => ({
        color: mode("#3d7aed", "#bb86fc")(props),
        _hover: { textDecoration: "none" },
      }),
    },
    Switch: {
      _focus: {
        boxShadow: "none",
      },
    },
    DrawerCloseButton: {
      _focus: { boxShadow: "none" },
      variant: "solid",
    },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});
