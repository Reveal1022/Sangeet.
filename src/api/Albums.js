import React from "react";

export const getAlbums = async (albumId) => {
  const accessToken = localStorage.getItem("spotify_access_token");

  if (!accessToken) {
    console.error("no access token");
    return;
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}`,
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
