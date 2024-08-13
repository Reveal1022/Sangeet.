export const getUserFollowedArtists = async () => {
  const accessToken = localStorage.getItem("spotify_access_token");

  if (!accessToken) {
    console.error("No access token found");
    return;
  }

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/following?type=artist",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch followed artists: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching followed artists:", error);
  }
};
