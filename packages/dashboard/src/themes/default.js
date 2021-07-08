import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const baseTheme = extendTheme({
  colors: {
    brand: {
      50: "#e6f1fe",
      100: "#c3dcfd",
      200: "#9fc6fc",
      300: "#7eb0f9",
      400: "#6c9ff7",
      500: "#628ff3",
      600: "#5f80e4",
      700: "#596ed0",
      800: "#545dbc",
      900: "#4a3d9b",
    },
  },
});

const ionTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: "brand" }),
  baseTheme
);

export default ionTheme;
