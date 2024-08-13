import React from "react";

export const getArtist = async (artistId) => {
  const accessToken = localStorage.getItem("spotify_access_token");

  if (!accessToken) {
    console.error("no token found ");
    return;
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,

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
    console.error("error happen", error);
  }
};
