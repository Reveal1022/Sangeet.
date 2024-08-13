import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import { SongContext } from "../../AppContext";
import Tracks from "../../components/Tracks";

const PlaylistPage = () => {
  const { playlistId } = useParams();

  const getPlaylists = async (playlistId) => {
    const accessToken = localStorage.getItem("spotify_access_token");

    if (!accessToken) {
      console.error("no access token");
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
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

  const [tracks, setTracks] = useState([]);
  const [details, setDetails] = useState();

  const { setCurrentSong } = useContext(SongContext);

  const setDuration = (duration) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const fetchTracks = async () => {
      const data = await getPlaylists(playlistId);

      if (data) {
        setTracks(data.tracks.items);
        setDetails(data);
      }
    };
    fetchTracks();
  }, [playlistId]);

  return (
    <div className="h-full p-[10px] flex flex-col pb-[120px] rounded-md">
      <div className="flex gap-[20px] p-[15px]">
        <img
          src={details?.images[0].url}
          alt="no_image"
          className="w-[150px] shadow-lg rounded-md"
        />
        <div className="w-[70%] flex flex-col justify-end text-[#443c35d0] capitalize">
          <span>{details?.type}</span>
          <h1 className="font-bold text-[30px]">{details?.name}</h1>
          <div className="flex gap-1 items-center">
            <span className="font-semibold">
              {details?.owner?.display_name}
            </span>
            <span>..</span>
            {/* <span className="text-[13px] lowercase">
              {details?.total_tracks}songs
            </span> */}
          </div>
        </div>
      </div>
      <div className="flex justify-between w-[90%] font-medium self-center mt-4 px-3 items-center text-slate-800">
        <span># Title</span>
        <span>
          <IoTimeOutline className="font-thin text-[20px]" />
        </span>
      </div>
      <hr className="border-slate-800 my-[5px] " />
      <div className="m-[15px] w-[90%]  flex flex-col self-center text-slate-600">
        <ol className="list-decimal list-inside flex flex-col gap-2">
          {tracks?.map((track, index) => (
            <li
              key={track.track.id}
              className="flex justify-between  items-center pr-3 hover:bg-slate-500 hover:text-white hover:shadow-md transition-all duration-300 p-1 rounded-md"
              onClick={() => {
                setCurrentSong(track.track.preview_url);
              }}
            >
              <div className=" w-full">
                <Tracks
                  songname={track.track.name}
                  id={track.track.id}
                  songref={track.track.preview_url}
                  duration={setDuration(track.track.duration_ms)}
                  artist={track.track.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                  sn={index + 1}
                  songImage={
                    track?.track?.images && track?.track?.images[1]
                      ? track?.images[1]?.url
                      : details?.images[0]?.url
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

export default PlaylistPage;
