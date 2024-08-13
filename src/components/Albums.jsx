import React, { useContext, useEffect, useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { SongContext } from "../AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { QueueContext } from "../QueueContext.jsx";

const Albums = ({ artist, albumname, albumImage, albumId }) => {
  // const {
  //   setCurrentSong,
  //   isPlaying,
  //   setIsPlaying,
  //   setDetails,
  //   favourites,
  //   addFavourite,
  //   removeFavourite,
  // } = useContext(SongContext);

  // const [isFavourite, setIsFavourite] = useState(false);

  // useEffect(() => {
  //   const checkFavourite = favourites.some((song) => song.id === albumId);
  //   setIsFavourite(checkFavourite);
  // }, [favourites, albumId]);

  // const handleFavourite = (e) => {
  //   e.stopPropagation();
  //   if (isFavourite) {
  //     removeFavourite({
  //       albumId,
  //       artist,
  //       albumname: albumname,
  //       albumImage,
  //       songref: songref,
  //     });
  //   } else {
  //     addFavourite({
  //       albumId,
  //       artist,
  //       albumname: albumname,
  //       albumImage,
  //       songref,
  //     });
  //   }
  // };

  const navigate = useNavigate();

  const { setCurrentAlbum } = useContext(QueueContext);

  const handleClick = () => {
    navigate(`/albums/${albumId}`);
    setCurrentAlbum(albumId);
  };

  return (
    <div
      className="flex flex-col hover:cursor-pointer w-[150px] text-left"
      onClick={handleClick}
    >
      <img
        src={albumImage}
        alt={albumname}
        className="w-[150px] rounded-[5px]"
      />
      <div className="flex items-center justify-between relative group">
        <div>
          <p className="font-medium text-slate-800 hover:underline">
            {albumname}
          </p>
          <p className="font-light text-[13px] text-slate-600">{artist}</p>
        </div>

        {/* ..... */}
        {/* {isFavourite ? (
          <IoMdHeart
            className="absolute text-[20px] right-0 hidden group-hover:block text-slate-800"
            onClick={handleFavourite}
          />
        ) : (
          <IoMdHeartEmpty
            className="absolute text-[20px] right-0 hidden group-hover:block text-slate-800"
            onClick={handleFavourite}
          />
        )} */}
      </div>
    </div>
  );
};

export default Albums;
