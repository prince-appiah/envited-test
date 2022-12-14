import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 6,
    _focus: { boxShadow: "none" },
    _hover: {
      bgGradient: "linear(to-r,#8456e6,#e87bf8)",
      color: "white",
    },
  },

  variants: {
    solid: {
      bgGradient: "linear(to-r,#8456e6,#e87bf8)",
      color: "white",
      _hover: {
        bgGradient: "linear(to-r,#8456e6,#e87bf8)",
        color: "white",
      },
    },
    envited: {
      bgGradient: "linear(to-r,#8456e6,#e87bf8)",
      color: "white",
      py: 8,
    },
    outline: {
      _hover: {
        bgColor: "gray.200",
        color: "black",
      },
    },
  },
};

const Input: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 24,

    px: 20,
    py: 8,
    _focus: {
      boxShadow: "none",
    },
  },
  variants: {},
};

export const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        color: "#240d57",
      },
    }),
  },
  colors: {
    brand: {
      purple: "#8456ec",
      pink: "#e87bf8",
    },
    text: {
      primaryPurple: "#240d57",
      primaryPurpleLight: "#501fc1",
      envitedPurple: "#8456ec",
      envitedPink: "#e87bf8",
    },
  },
  components: { Button, Input },
});
