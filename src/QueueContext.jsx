import { Children, createContext, useState } from "react";

const QueueContext = createContext();

const QueueProvider = ({ children }) => {
  const [nowPlaying, setNowPlaying] = useState({
    songName: "",
    songImage: "",
    artist: "",
  });
  const [currentAlbum, setCurrentAlbum] = useState();

  return (
    <QueueContext.Provider
      value={{ nowPlaying, setNowPlaying, currentAlbum, setCurrentAlbum }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export { QueueContext, QueueProvider };
