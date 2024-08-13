import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const access_token = params.get("access_token");
    console.log(access_token);

    if (access_token) {
      localStorage.setItem("spotify_access_token", access_token);

      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <div></div>;
};

export default Callback;
