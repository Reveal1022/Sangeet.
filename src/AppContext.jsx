import React, { useState, createContext } from "react";

const SongContext = createContext();

const SongProvider = ({ children }) => {
  const [currentsong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favourites, setFavourites] = useState([]);

  const [details, setDetails] = useState({
    id: "",
    songName: "",
    songImage: "",
    artist: "",
  });

  const addFavourite = (song) => {
    setFavourites((prevFavourites) => [...prevFavourites, song]);
  };

  const removeFavourite = (song) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((item) => item.id !== song.id)
    );
  };

  return (
    <SongContext.Provider
      value={{
        currentsong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        details,
        setDetails,
        favourites,
        setFavourites,
        addFavourite,
        removeFavourite,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export { SongContext, SongProvider };
