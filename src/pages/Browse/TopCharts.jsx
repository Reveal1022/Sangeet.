import React, { useEffect, useState } from "react";
import Albums from "../../components/Albums";

const TopCharts = () => {
  const getAlbums = async () => {
    const accessToken = localStorage.getItem("spotify_access_token");

    if (!accessToken) {
      console.error("no access token");
      return;
    }

    try {
      const response = await fetch(
        "https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc,7dir7tnHoyjiJzb5zBsGzZ,5mdpQ9z0QY05JvHUqNeIOa,1GGIPZots9JggQb14XVCg7,4qKVTfUeV4K9adWp85cLsD,69ypo4Z0eUD0g7Y2Vr5Uvk,2dItXypmeMVli42NpaHWbN,5GLyerOHl96VgvR5CCCFyY,2eS7Uapr3C8HmWlBNdJcRQ",
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
      console.error("Error occured", error);
      return null;
    }
  };

  const [albums, setAlbums] = useState();

  useEffect(() => {
    const fetchAlbums = async () => {
      const data = await getAlbums();

      if (data) {
        setAlbums(data?.albums);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="pb-[100px] flex flex-wrap gap-3">
      {albums?.map((album) => (
        <div key={album.id} className="">
          <Albums
            albumId={album.id}
            albumname={album.name}
            albumImage={album.images[1].url}
          />
        </div>
      ))}
    </div>
  );
};

export default TopCharts;
