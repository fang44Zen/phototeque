import { Box, Typography, TextField, FormControl, Button } from "@mui/material";
import { useState } from "react";

const NewAlbum = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <Box display="flex" flexDirection="column" pt={2} pl={8}>
      <Typography variant="h6">Create Album</Typography>

      <Box display="flex" alignItems="center" mt={1}>
        <form method="POST" action="http://localhost:5000/api/albums/create">
          <FormControl style={{ marginRight: "8px", width: "60vh" }}>
            <TextField
              name="title"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              label="Titre"
              variant="outlined"
            />
          </FormControl>

          <Button
            disabled={inputValue === ""}
            type="submit"
            variant="contained"
            size="small"
          >
            Add
          </Button>
        </form>
      </Box>
    </Box>
  );
};
export default NewAlbum;
