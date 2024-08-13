import React, { useState, useEffect } from "react";

const Podcasts = () => {
  const getPodcasts = async () => {
    const accessToken = localStorage.getItem("spotify_access_token");

    if (!accessToken) {
      console.error("No access Token available");
      return;
    }

    try {
      const response = await fetch(
        "https://api.spotify.com/v1/shows?ids=0A6kWKFEOFtp8fkrpnAJQB%2C7ALiCWYyHvJAHmYRpKEmMA%2C5CfCWKI5pZ28U0uOzXkDHe%2C5as3aKmN2k11yfDDDSrvaZ%2C3zzOFMwPlA0bbPkt4R0Lku%2C5lY4b5PGOvMuOYOjOVEcb9",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("error occured", error);
    }
  };

  const [shows, setShows] = useState();

  useEffect(() => {
    const fetchShows = async () => {
      const data = await getPodcasts();

      if (data) {
        setShows(data?.shows);
      }
    };

    fetchShows();
  }, []);
  console.log(shows);

  return (
    <div className=" grid grid-cols-2 mx-auto gap-3 pb-[150px] ">
      {shows?.map((show) => (
        <div
          className="bg-slate-700 rounded-lg flex flex-col p-3  max-h-[630px] "
          key={show.id}
        >
          <h2 className="text-white text-[35px] font-bold">{show.name}</h2>
          <div className="flex text-orange-500 text-[15px] font-light">
            <span className="mr-1">By {show.publisher},</span>
            <span> {show.total_episodes} Episodes</span>
          </div>
          <img src={show.images[1].url} alt="" className="p-2 rounded-xl" />
          <p className="text-justify text-[14px] text-white overflow-scroll">
            {show.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Podcasts;
