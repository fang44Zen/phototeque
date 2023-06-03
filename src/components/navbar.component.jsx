import { AppBar, Box, Stack, Typography, Toolbar } from "@mui/material";
import theme from "../styles/theme.style";
import { Outlet } from "react-router-dom";
import { CustomLink } from "../styles/theme.style";

const NavigationBar = () => {
  const { primary, light } = theme.palette.mainColor;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: primary, color: light }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ py: "1px" }}
          >
            <Typography variant="h6">
              <CustomLink to="/">Photothèque</CustomLink>
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default NavigationBar;
