import React, { useContext, useEffect, useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { SongContext } from "../AppContext.jsx";
import { QueueContext } from "../QueueContext.jsx";

const Tracks = ({ artist, songname, songImage, songref, id, duration, sn }) => {
  const {
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    setDetails,
    favourites,
    addFavourite,
    removeFavourite,
  } = useContext(SongContext);

  const { setNowPlaying } = useContext(QueueContext);

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const checkFavourite = favourites.some((song) => song.id === id);
    setIsFavourite(checkFavourite);
  }, [favourites, id]);

  const handleClick = () => {
    setCurrentSong(songref);
    setIsPlaying(true);
    setDetails({
      artist: artist,
      songName: songname,
      songImage: songImage,
    });
    setNowPlaying({
      songName: songname,
      songImage: songImage,
      artist: artist,
    });
  };

  const handleFavourite = (e) => {
    e.stopPropagation();
    if (isFavourite) {
      removeFavourite({
        id,
        artist,
        songName: songname,
        songImage,
        songref: songref,
      });
    } else {
      addFavourite({ id, artist, songName: songname, songImage, songref });
    }
  };

  return (
    <div
      className="flex justify-between items-center group p-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center">
        <p className="font-light mr-2">{sn}.</p>
        <img src={songImage} alt="" className="w-[40px] mr-3 rounded-sm" />
        <div>
          <h1 className="font-medium">{songname}</h1>
          <p className="font-light">{artist}</p>
        </div>
      </div>
      {/* <div className="relative bg-pink-200">
        {isFavourite ? (
          <IoMdHeart
            className="absolute text-[20px] right-[20%] text-slate-800 opacity-0 group-hover:opacity-100 "
            onClick={handleFavourite}
          />
        ) : (
          <IoMdHeartEmpty
            className="absolute text-[20px] right-[20%]  text-slate-800 opacity-0 group-hover:opacity-100 "
            onClick={handleFavourite}
          />
        )}
      </div> */}
      <span>{duration}</span>
    </div>
  );
};

export default Tracks;
