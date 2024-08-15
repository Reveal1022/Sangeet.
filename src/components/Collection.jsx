import React, { useEffect, useState } from "react";
import { getElements } from "../api/Spotify";
import Playlist from "../components/Playlist";

const Collection = ({ url }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getElements(url);

      if (data) {
        setData(data);
      }
    };

    fetchData(); // You need to call the function here
  }, []);

  const playlist = data?.playlists?.items;

  return (
    <div className=" mt-[20px]">
      <div className=" pr-5 mt-10">
        <h1 className="font-bold text-[20px] text-[orange]">{data?.message}</h1>
        <div className="flex overflow-y-hidden gap-2">
          {playlist?.map((playlist, index) => (
            <div
              className="py-5 px-4 rounded-md hover:bg-[#3736367b]"
              key={index}
            >
              <Playlist
                playlistId={playlist?.id}
                albumname={playlist?.name}
                albumImage={playlist?.images[0].url}
                artist={playlist?.owner?.display_name}
              />
            </div>
          ))}
        </div>
      </div>

      {/* <Collection collection_name="Trending Songs" /> */}
    </div>
  );
};

export default Collection;
