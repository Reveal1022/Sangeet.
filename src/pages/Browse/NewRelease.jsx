import React, { useState, useEffect } from "react";
import Item from "../../components/Item";
import Albums from "../../components/Albums";

const NewRelease = () => {
  const getNewReleases = async () => {
    const accessToken = localStorage.getItem("spotify_access_token");

    if (!accessToken) {
      console.error("no access token ");
      return;
    }

    try {
      const response = await fetch(
        "https://api.spotify.com/v1/browse/new-releases",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch songs: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("sorry, error occured", error);
    }
  };

  const [newSongs, setNewSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getNewReleases();

      if (data && data.albums && data.albums.items) {
        setNewSongs(data.albums.items);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className=" flex flex-wrap gap-3 pb-[150px]">
      {newSongs.map((songs) => (
        <div key={songs.id}>
          <Albums
            albumImage={songs.images[0].url}
            albumname={songs.name}
            artist={songs.artists[0].name}
            albumId={songs.id}
          />
        </div>
      ))}
    </div>
  );
};

export default NewRelease;
