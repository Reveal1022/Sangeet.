import React from "react";
import { GrSpotify } from "react-icons/gr";

const AUTH_URI =
  "https://accounts.spotify.com/authorize?client_id=1b2a30743c9b4a3385f6671b9ab1529d&response_type=token&redirect_uri=http://localhost:5173/callback&scope=streaming%20user-library-read%20user-library-modify%20user-follow-read%20user-top-read";

export default function Login() {
  return (
    <div className="flex flex-col items-center h-[600px] justify-center border-2 border-slate-700">
      <div className="text-[150px] text-green-500">
        <GrSpotify />
      </div>
      <h1 className="text-[45px] font-bold text-slate-800">Spotify Login</h1>
      <a
        className="flex rounded-3xl font-bold bg-white text-green-500 border-slate-700 border-1 mt-5 px-[80px] p-3 "
        href={AUTH_URI}
      >
        Login with Spotify
      </a>
    </div>
  );
}
