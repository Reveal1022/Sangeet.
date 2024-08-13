import React, { useContext, useEffect, useState } from "react";
import { QueueContext } from "../QueueContext";
import { getElements } from "../api/Spotify";
import { getAlbums } from "../api/Albums";
import Tracks from "./Tracks";

const Queue = () => {
  const { currentAlbum, nowPlaying } = useContext(QueueContext);
  const [tracks, setTracks] = useState([]);
  const [details, setDetails] = useState();

  const albumsId = currentAlbum;

  const setDuration = (duration) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const fetchTracks = async () => {
      const data = await getAlbums(albumsId);

      if (data) {
        setTracks(data.tracks.items);
        setDetails(data);
      }
    };
    fetchTracks();
  }, [albumsId]);

  const getPlaylists = async (albumsId) => {
    const accessToken = localStorage.getItem("spotify_access_token");

    if (!accessToken) {
      console.error("no access token");
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${albumsId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error occured", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchTracks = async () => {
      const data = await getPlaylists(albumsId);

      if (data) {
        setTracks(data.tracks.items);
        setDetails(data);
      }
    };
    fetchTracks();
  }, [albumsId]);

  return (
    <div className=" h-full w-full">
      <div className="flex flex-col items-center bg-orange-400 justify-center py-5 h-[40%] rounded-2xl">
        <img
          src={nowPlaying.songImage}
          alt=""
          className="w-[150px] rounded-full border-[2px] border-slate-600 p-1 mb-[10px]"
        />
        <h1 className="text-white font-semibold">Now Playing</h1>
        <div className="flex items-center overflow-hidden h-[25px] w-[60%]">
          <div className=" sliding-text flex">
            <p className="text-slate-700 text-[16px] ">
              {nowPlaying.songName} {nowPlaying.artist}
            </p>
          </div>
        </div>
      </div>
      <h2 className=" font-semibold text-slate-700 text-center">Up Next</h2>
      <div className="m-[10px] w-[90%] flex flex-col text-slate-600 h-[60%] pb-[50px]">
        <ol className="list-decimal list-inside flex flex-col gap-2 overflow-y-scroll h-full">
          {tracks.map((track, index) => (
            <li
              key={track.id}
              className="flex justify-between items-center pr-3 hover:bg-slate-500 hover:text-white hover:shadow-md transition-all duration-300 p-1 rounded-md"
            >
              <div className="w-full">
                <Tracks
                  songname={track.name}
                  id={track.id}
                  songref={track.preview_url}
                  duration={setDuration(track.duration_ms)}
                  artist={track.artists.map((artist) => artist.name).join(", ")}
                  sn={index + 1}
                  songImage={
                    track.images && track.images[1]
                      ? track.images[1].url
                      : details?.images[1]?.url
                  }
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Queue;
