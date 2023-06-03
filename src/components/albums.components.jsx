import { Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import AlbumCard from "./albumcard.component";

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/albums")
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/albums/${id}`);
      fetchData();
      console.log("Album supprimé avec succès");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box pt={2} pl={8}>
      <Typography> Album page</Typography>
      <Box>
        {albums.map((album) => (
          <Box key={album._id}>
            <AlbumCard
              handleDelete={() => handleDelete(album._id)}
              title={album.title}
              albumId={album._id}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Albums;

// <Box sx={{ width: "30vh" }} mt={1}>
//   <Card>
//     <CardContent
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <CustomLink color={"black"}>{album.title}</CustomLink>
//       <CustomButton
//         onClick={() => handleDelete(album._id)}
//         variant="outlined"
//       >
//         <DeleteForeverIcon />
//       </CustomButton>
//     </CardContent>
//   </Card>
// </Box>
