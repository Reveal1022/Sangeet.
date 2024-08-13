import React, { useEffect, useState } from "react";
import { getElements } from "../../api/Spotify";

const LikedPodcasts = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const trial = async () => {
      const url = "https://api.spotify.com/v1/browse/categories ";
      const data = await getElements(url);
    };

    trial();
  }, []);

  return <div className="overflow-hidden whitespace-nowrap w-full"></div>;
};

export default LikedPodcasts;
