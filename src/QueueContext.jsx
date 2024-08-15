import { Children, createContext, useState } from "react";

const QueueContext = createContext();

const QueueProvider = ({ children }) => {
  const [nowPlaying, setNowPlaying] = useState({
    songName: "",
    songImage: "",
    artist: "",
  });
  const [currentAlbum, setCurrentAlbum] = useState();
  const [isPlaylist, setIsPlaylist] = useState(false);
  const [isArtist, setIsArtist] = useState(false);

  return (
    <QueueContext.Provider
      value={{
        nowPlaying,
        setNowPlaying,
        currentAlbum,
        setCurrentAlbum,
        isPlaylist,
        setIsPlaylist,
        isArtist,
        setIsArtist,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export { QueueContext, QueueProvider };
