import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SongProvider } from "./AppContext.jsx";
import { QueueProvider } from "./QueueContext.jsx";
import Home from "./pages/Home.jsx";
import Browse from "./pages/Browse.jsx";
import NewRelease from "./pages/Browse/NewRelease.jsx";
import TopCharts from "./pages/Browse/TopCharts.jsx";
import TopArtists from "./pages/Browse/TopArtists.jsx";
import Podcasts from "./pages/Browse/Podcasts.jsx";
import Libraries from "./pages/Libraries.jsx";
import LikedPodcasts from "./pages/Library/LikedPodcasts.jsx";
import Login from "./pages/Login.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Favourites from "./pages/Library/Favourites.jsx";
import Callback from "./Callback.jsx";
import Fav_Artists from "./pages/Library/Fav_Artists.jsx";
import AlbumPage from "./pages/Albums/AlbumPage.jsx";
import ArtistPage from "./pages/ArtistPage.jsx";
import PlaylistPage from "./pages/Albums/PlaylistPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="" element={<Home />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="libraries" element={<Libraries />}>
        <Route path="favourites" element={<Favourites />} />
        <Route path="yourpodcasts" element={<LikedPodcasts />} />
        <Route path="followed_artists" element={<Fav_Artists />} />
      </Route>
      <Route path="browse" element={<Browse />}>
        <Route path="newrelease" element={<NewRelease />} />
        <Route path="charts" element={<TopCharts />} />
        <Route path="podcasts" element={<Podcasts />} />
        <Route path="artists" element={<TopArtists />} />
      </Route>
      <Route path="/albums/:albumsId" element={<AlbumPage />} />
      <Route path="/artist/:artistId" element={<ArtistPage />} />
      <Route path="/playlists/:playlistId" element={<PlaylistPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SongProvider>
      <QueueProvider>
        <RouterProvider router={router} />
      </QueueProvider>
    </SongProvider>
  </React.StrictMode>
);
