import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtist } from "../api/Artists";
import { getElements } from "../api/Spotify";
import Tracks from "../components/Tracks";

const ArtistPage = () => {
  const artistId = useParams();

  const url = `https://api.spotify.com/v1/artists/${artistId.artistId}/top-tracks`;

  const [artistDetails, setArtistDetails] = useState();
  const [tracks, setTracks] = useState();

  const setDuration = (duration) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArtist(artistId.artistId);

      if (data) {
        setArtistDetails(data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      const data = await getElements(url);

      if (data) {
        setTracks(data.tracks);
      }
    };
    fetchTracks();
  }, []);

  return (
    <div className=" w-[85%]  rounded-3xl">
      <div className="flex  gap-2 p-[30px] bg-slate-600 rounded-3xl">
        <img
          src={artistDetails?.images[0].url}
          alt="none"
          className="w-[180px] h-[180px] rounded-full shadow-lg"
        />
        <div className="text-white  w-[70%] pl-3 pb-4 flex flex-col justify-end">
          <h1 className="text-[65px] font-extrabold">{artistDetails?.name}</h1>
          <span>
            {artistDetails?.followers?.total} Followers .. Genres : [{" "}
            {artistDetails?.genres} ]
          </span>
        </div>
      </div>
      <div className="px-[20px] pb-[100px] bg-slate-300 rounded-3xl">
        <h1 className="text-[30px] text-white font-semibold ">Popular</h1>
        <div className="m-[15px] w-[90%]  flex flex-col self-center text-slate-600">
          <ol className="list-decimal list-inside flex flex-col gap-2">
            {tracks?.map((track, index) => (
              <li
                key={track.id}
                className="flex justify-between  items-center pr-3 hover:bg-slate-500 hover:text-white hover:shadow-sm transition-all duration-300 p-1 rounded-md"
                // onClick={() => {
                //   setCurrentSong(track.preview_url);
                // }}
              >
                {/* <div className="flex items-top">
                <p className="font-light mr-2"> {index + 1}.</p>
                <div>
                  <h1 className="">{track.name}</h1>
                  <p className="font-light">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </div>
              <span>{setDuration(track.duration_ms)}</span> */}
                <div className=" w-full">
                  <Tracks
                    songname={track.name}
                    id={track.id}
                    songref={track.preview_url}
                    duration={setDuration(track.duration_ms)}
                    artist={track.artists
                      .map((artist) => artist.name)
                      .join(", ")}
                    sn={index + 1}
                    songImage={artistDetails.images[1].url}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
