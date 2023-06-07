import { Box, Typography } from "@mui/material";
import { CustomLink } from "../styles/theme.style";

const HomePage = () => {
  return (
    <Box pl={8} pt={2} spacing={1}>
      <Typography>HomePage</Typography>

      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",

          marginTop: 4,
          gap: 1,
          padding: 1,
        }}
      >
        <CustomLink to="albums/create" color="black">
          Create Album
        </CustomLink>
        <CustomLink to="albums" color="black">
          Album List
        </CustomLink>
      </Box>
    </Box>
  );
};
export default HomePage;
