import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#a5d122",
      dark: "#5f7c12 ",
      light: "#A5D122",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0D1E2C",
    },
    white: {
      main: "#ffffff",
    },
    toositext: {
      main: "#787878",
    },
    greendarukade: {
      main: "#a5d122",
    },
    bgbody: {
      main: "#F0F4F9",
    },
  },
  direction: "rtl",
});

export default theme;
