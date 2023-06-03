import { Typography, Box, Input, Card, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";

const AlbumLink = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState({});
  const [currentFile, setCurrentFile] = useState({});
  const [currentFileName, setCurrentFileName] = useState("select a file...");

  const getIdLink = async () => {
    await axios
      .get(`http://localhost:5000/api/albums/${id}`)
      .then((response) => {
        setAlbum(response.data);
      });
  };

  useEffect(() => {
    getIdLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", currentFile);
      await axios.post(
        `http://localhost:5000/api/albums/upload/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCurrentFile(file);
    setCurrentFileName(file.name);
  };

  return (
    <Box pt={2} pl={8}>
      <Link to="/albums">
        <Button
          variant="outlined"
          sx={{
            paddingTop: 0,
            paddingLeft: 0.2,
            paddingBottom: 0,
            paddingRight: 0.2,
            color: "black",
            borderColor: "black",
            "&:hover": {
              color: "#526D82",
              borderColor: "#526D82",
            },
          }}
        >
          <KeyboardBackspaceIcon />
          Back
        </Button>
      </Link>
      <Box ml={8} mt={2}>
        <Typography>{album.title}</Typography>
        <Card sx={{ padding: 1, display: "inline-flex" }}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="upload-file"
            />
            <label htmlFor="upload-file">
              <IconButton
                component="span"
                sx={{ color: "black", "&:hover": { color: "grey" } }}
              >
                <BrowserUpdatedIcon />
              </IconButton>
            </label>
            <Typography
              sx={{
                width: "20vh",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {currentFileName}
            </Typography>
            <IconButton
              onClick={postImage}
              sx={{ color: "blue", "&:hover": { color: "grey" } }}
            >
              <AddCircleIcon />
            </IconButton>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default AlbumLink;
