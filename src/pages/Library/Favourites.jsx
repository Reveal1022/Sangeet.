import React, { useState, useEffect } from "react";
import { getTracks } from "../../api/Tracks";
import Item from "../../components/Item";

const TopCharts = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const data = await getTracks();

      if (data && data.items) {
        setTracks(data.items);
      }
    };

    fetchTracks();

    console.log(tracks);
  }, []);

  return (
    <div className=" h-full flex flex-wrap gap-3 pb-[150px] ">
      {tracks.map((song) => (
        <div key={song.track.id}>
          <Item
            id={song.track.id}
            songname={song.track.name}
            artist="artist"
            songImage={song.track.album.images[1].url}
            songref={song.track.preview_url}
          />
        </div>
      ))}
    </div>
  );
};

export default TopCharts;
