import React, { useState, useEffect } from "react";
import { getUserFollowedArtists } from ".././../Sangeet.js";

const Fav_Artists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const data = await getUserFollowedArtists();

      if (data && data.artists && data.artists.items) {
        setArtists(data.artists.items);
      } else {
        console.error("No artists found or error in data structure");
      }
    };

    fetchArtists();

    console.log(artists);
  }, []);

  if (!artists.length) {
    return <>Loading......</>;
  }

  return (
    <div className=" w-full h-full">
      <div className="">
        <ul className=" w-full flex gap-2 overflow-hidden flex-wrap ">
          {artists.map((artist) => (
            <li key={artist.id}>
              <img
                src={artist.images[0]?.url}
                alt={artist.name}
                width="150px"
                height="150px"
                className="rounded-full"
              />
              <p
                className="text-[15px] font-light text-slate-800 text-center
              "
              >
                {artist.name}
              </p>
              <p className="font-thin capitalize text-[14px] text-slate-600 text-center">
                {artist.type}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Fav_Artists;
