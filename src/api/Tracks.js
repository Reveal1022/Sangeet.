import React from "react";

const getTracks = async () => {
  const accessToken = localStorage.getItem("spotify_access_token");

  if (!accessToken) {
    console.error("no access token");
  }

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/tracks",

      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Fixed typo here
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

export { getTracks };
