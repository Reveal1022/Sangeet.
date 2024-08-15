import React, { useState, useEffect, useContext } from "react";
import { getElements } from "../../api/Spotify";
import { Navigate, useNavigate } from "react-router-dom";
import { QueueContext } from "../../QueueContext";

const TopArtists = () => {
  const [artist, setArtist] = useState();
  const navigate = useNavigate();
  const ids = [
    "5R5EUMWsrYDt3ItavrP6C5",
    "1D0B4qrMRfjzDfBlijs3YH",
    "0HeDIdaYWPE0mpdfT4yIUt",
    "06HL4z0CvFAxyc27GXpf02",
    "1uNFoZAHBGtllmzznpCI3s",
    "6eUKZXaKkcviH0Ku9w2n3V",
    "1Xyo4u8uXC1ZmMpatF05PJ",
    "1deQzOQwArAsUgm2WdjtyI",
    "0C8ZW7ezQVs4URX5aX7Kqx",
    "6VuMaDnrHyPL1p4EHjYLi7",
    "3bLWp801OAckSYWrb0sgsH",
    "1o3w6uL4JCuQX19stjhf3F",
  ];

  const url = `https://api.spotify.com/v1/artists?ids=${ids.join(",")}`;

  const { setCurrentAlbum, setIsArtist } = useContext(QueueContext);

  useEffect(() => {
    const fetchArtists = async () => {
      const data = await getElements(url);

      if (data) {
        setArtist(data?.artists);
      }
    };
    fetchArtists();
  }, []);

  return (
    <div className=" relative w-full h-full ">
      <div className=" pb-[150px]">
        <ul className=" w-full flex gap-4 gap-x-5 overflow-hidden flex-wrap ">
          {artist?.map((artist) => (
            <li
              key={artist.id}
              onClick={() => {
                navigate(`/artist/${artist.id}`);
                setCurrentAlbum(artist.id);
                setIsArtist(true);
              }}
              className="hover:cursor-pointer p-3 hover:bg-[#CDD3D0] hover:rounded-md hover:shadow-md"
            >
              <img
                src={artist.images[0]?.url}
                alt={artist.name}
                className="h-[180px] w-[180px] rounded-full shadow-md"
              />
              <p
                className="text-[15px] font-light text-slate-800 text-center hover:underline 
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

export default TopArtists;
