import React, { useContext, useEffect, useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { SongContext } from "../AppContext.jsx";

const Item = ({ artist, songname, songImage, songref, id }) => {
  const {
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    setDetails,
    favourites,
    addFavourite,
    removeFavourite,
  } = useContext(SongContext);

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
      className="flex flex-col hover:cursor-pointer w-[150px] text-left"
      onClick={handleClick}
    >
      <img src={songImage} alt={songname} className="w-[150px] rounded-[5px]" />
      <div className="flex items-center justify-between relative group">
        <div>
          <p className="font-medium text-slate-800 hover:underline">
            {songname}
          </p>
          <p className="font-light text-[13px] text-slate-600">{artist}</p>
        </div>
        {isFavourite ? (
          <IoMdHeart
            className="absolute text-[20px] right-0 hidden group-hover:block text-slate-800"
            onClick={handleFavourite}
          />
        ) : (
          <IoMdHeartEmpty
            className="absolute text-[20px] right-0 hidden group-hover:block text-slate-800"
            onClick={handleFavourite}
          />
        )}
      </div>
    </div>
  );
};

export default Item;
