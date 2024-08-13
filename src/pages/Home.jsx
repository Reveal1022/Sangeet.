import React, { useEffect, useState } from "react";
import { getElements } from "../api/Spotify";
import Albums from "../components/Albums";
import Playlist from "../components/Playlist";
import Collection from "../components/Collection";

const Home = () => {
  const url = "https://api.spotify.com/v1/me";
  const url2 = "https://api.spotify.com/v1/browse/categories/dinner/playlists";
  const [profile, setProfile] = useState();

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getElements(url2);

      if (data) {
        setData(data);
      }
    };

    fetchData(); // You need to call the function here
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getElements(url);

      if (data) {
        setProfile(data);
      }
    };

    fetchProfile(); // You need to call the function here
  }, []);

  const playlist = data?.playlists?.items;
  playlist;

  return (
    <div className=" mt-[20px]">
      <h1 className="font-bold text-[22px] text-orange-400">
        Hello, {profile?.display_name}!
      </h1>

      <Collection url="https://api.spotify.com/v1/browse/categories/dinner/playlists" />
      <Collection url="https://api.spotify.com/v1/browse/categories/pop/playlists" />
      <Collection url="https://api.spotify.com/v1/browse/categories/party/playlists" />
      <Collection url="https://api.spotify.com/v1/browse/categories/rock/playlists" />
      <Collection url="https://api.spotify.com/v1/browse/categories/mood/playlists" />
      <Collection url="https://api.spotify.com/v1/browse/categories/sleep/playlists" />
      <Collection url="https://api.spotify.com/v1/browse/featured-playlists" />

      {/* <Collection collection_name="Trending Songs" /> */}
    </div>
  );
};

export default Home;
