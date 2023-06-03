import { createTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const CustomLink = styled(Link)(({ color, textDecoration }) => ({
  color: color || "white",
  textDecoration: textDecoration || "none",
  fontWeight: "bold",
  "&:hover": {
    color: "#526D82",
  },
}));

let theme = createTheme({
  palette: {
    mainColor: {
      primary: "#27374D",
      secondary: "#526D82",
      light: "#DDE6ED",
      white: "#F0F0F0",
    },
  },
});

export default theme;
