import { CustomLink } from "../styles/theme.style";
import DeleteForeverIcon from "@mui/icons-material/DeleteOutline";
import styled from "styled-components";
import { Box, Card, CardContent, Button, Typography } from "@mui/material";

const CustomButton = styled(Button)`
  && {
    padding: 1px;
    min-width: auto;
    color: red;
    border-color: red;
  }
`;

const AlbumCard = ({ title, handleDelete, albumId, nmImg }) => {
  return (
    <Box sx={{ width: "30vh" }} mt={1}>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CustomLink
            to={`${albumId}`}
            textDecoration={"underline"}
            color={"black"}
          >
            {title}
          </CustomLink>
          <Typography>{`(${nmImg})`}</Typography>
          <CustomButton onClick={handleDelete} variant="outlined">
            <DeleteForeverIcon />
          </CustomButton>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AlbumCard;
