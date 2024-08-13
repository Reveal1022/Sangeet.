import React, { useContext, useEffect, useState } from "react";
import { getAlbums } from "../../api/Albums";
import { useParams } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import { SongContext } from "../../AppContext";
import Tracks from "../../components/Tracks";

const AlbumPage = () => {
  const { albumsId } = useParams();
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
      const data = await getAlbums(albumsId);

      if (data) {
        setTracks(data.tracks.items);
        setDetails(data);
      }
    };
    fetchTracks();
    console.log(tracks);
  }, [albumsId]);

  return (
    <div className="h-full p-[10px] flex flex-col pb-[120px] rounded-md">
      <div className="flex gap-[20px] p-[15px]">
        <img
          src={details?.images[1].url}
          alt="no_image"
          className="w-[150px] shadow-lg rounded-md"
        />
        <div className="w-[70%] flex flex-col justify-end text-[#443c35d0] capitalize">
          <span>{details?.album_type}</span>
          <h1 className="font-bold text-[30px]">{details?.name}</h1>
          <div className="flex gap-1 items-center">
            <span className="font-semibold">{details?.artists[0].name}</span>
            <span>..</span>
            <span className="text-[13px] lowercase">
              {details?.total_tracks}songs
            </span>
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
          {tracks.map((track, index) => (
            <li
              key={track.id}
              className="flex justify-between  items-center pr-3 hover:bg-slate-500 hover:text-white hover:shadow-md transition-all duration-300 p-1 rounded-md"
              onClick={() => {
                setCurrentSong(track.preview_url);
              }}
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

export default AlbumPage;
