import React from "react";

export const getElements = async (url) => {
  const accessToken = localStorage.getItem("spotify_access_token");

  if (!accessToken) {
    console.log("no access token");
    return;
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error", error);
  }
};
