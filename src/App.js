import "./App.css";
import NavigationBar from "./components/navbar.component";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/notfound.component";
import NewAlbum from "./components/newalbum.component";
import HomePage from "./components/homepage.component";
import Albums from "./components/albums.components";
import AlbumLink from "./components/albumlink.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/albums/create" element={<NewAlbum />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:id" element={<AlbumLink />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
