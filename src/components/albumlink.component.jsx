import {
  Typography,
  Box,
  Input,
  Card,
  IconButton,
  Alert,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const AlbumLink = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState({});
  const [currentFile, setCurrentFile] = useState({});
  const [currentFileName, setCurrentFileName] = useState("select a file...");
  const [wrongFileFormat, setWrongFileFormat] = useState(false);

  const getDataAlbum = async () => {
    await axios
      .get(`http://localhost:5000/api/albums/${id}`)
      .then((response) => {
        setAlbum(response.data);
      });
  };

  useEffect(() => {
    getDataAlbum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(album.images);

  const deleteImage = async (e) => {
    const imgIndex = e.target.getAttribute("data-value");
    try {
      await axios.get(
        `http://localhost:5000/api/albums/upload/${id}/delete/${imgIndex}`
      );
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const postImage = async () => {
    if (
      currentFile.type !== "image/jpeg" &&
      currentFile.type !== "image/jpg" &&
      currentFile.type !== "image/png"
    ) {
      setWrongFileFormat(true);
      return;
    } else {
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
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file.type);
    setCurrentFile(file);
    setCurrentFileName(file.name);
  };

  return (
    <Box
      pt={2}
      pl={8}
      sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
    >
      <Box style={{ flexBasis: "100%" }}>
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
      </Box>

      <Box
        sx={{
          display: "inline-block",
          marginLeft: 4,
          marginTop: 2,
          flexBasis: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {album.title}
        </Typography>
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
                width: "50vh",
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
              disabled={currentFileName === "select a file..."}
            >
              <AddCircleIcon />
            </IconButton>
          </Box>
        </Card>
        {wrongFileFormat && (
          <Box sx={{ marginTop: 1, display: "flex", justifyContent: "center" }}>
            <Alert severity="error">jpeg or jpg file only!</Alert>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginTop: 2,
          marginLeft: 8,
          flexWrap: "wrap",
          width: "85%",
        }}
      >
        {album &&
          album.images &&
          album.images.map((imageName, imgIndex) => (
            <Card
              key={imageName}
              sx={{
                paddingTop: 4,
                paddingRight: 2,
                paddingLeft: 2,
                maxWidth: "300px",
                display: "grid",
                gridTemplateRows: "auto 1fr auto",
              }}
            >
              <CardMedia
                component="img"
                alt="Image"
                height="250px"
                image={`/uploads/${id}/${imageName}`}
              />
              <CardContent>
                <Typography>{imageName}</Typography>
              </CardContent>
              <CardActions
                sx={{
                  justifySelf: "end",
                  alignSelf: "end",
                }}
              >
                <Button
                  onClick={deleteImage}
                  data-value={imgIndex}
                  variant="contained"
                  sx={{
                    paddingLeft: 0.4,
                    paddingRight: 0.4,
                    paddingTop: 0,
                    paddingBottom: 0,
                    backgroundColor: "red",
                    "&:hover": {
                      backgroundColor: "#8B0000",
                    },
                  }}
                  startIcon={<DeleteForeverIcon />}
                >
                  Supprimer
                </Button>
              </CardActions>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default AlbumLink;
