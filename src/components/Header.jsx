import React, { useEffect, useState } from "react";
import { SiThesoundsresource } from "react-icons/si";
import { IoIosSearch } from "react-icons/io";
import Search from "./Search";
import { NavLink } from "react-router-dom";
import { getElements } from "../api/Spotify";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [token, setToken] = useState(false);
  const url = "https://api.spotify.com/v1/me";
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getElements(url);

      if (data) {
        setProfile(data);
      }
    };

    fetchProfile(); // You need to call the function here
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("spotify_access_token");

    if (accessToken) {
      setToken(true);
    }
  }, [token]);

  const handleShowSearch = () => {
    setShowSearch(true);
  };

  const handleHideSearch = () => {
    setShowSearch(false);
  };

  return (
    <div className="flex items-center w-[100%] bg-slate-200 h-[100%]">
      <button
        onClick={handleShowSearch}
        className="flex items-center justify-center fixed w-[36%] bg-white ml-[32%] h-[35px] text-slate-700 font-thin rounded-[30px]"
      >
        <IoIosSearch /> Search
      </button>

      {showSearch && <Search show={showSearch} hideSearch={handleHideSearch} />}

      <div className="w-[50%] -[100%] flex items-center pl-[20px] ">
        <NavLink className="">
          <button className="flex items-center text-slate-800 font-extrabold text-[16px] gap-1">
            <SiThesoundsresource className="text-[30px] text-slate-800" />
            <p>Sangeet</p>
          </button>
        </NavLink>

        <ul className="flex ml-[30px] gap-[30px] text-slate-800 font-semibold">
          <li>MUSIC</li>
          <li>PODCAST</li>
        </ul>
      </div>
      {token ? (
        <div className="flex ml-auto mr-[20px] justify-end ">
          <img
            src={profile?.images?.[1]?.url}
            alt="none"
            className="w-[50px] rounded-full"
          />
        </div>
      ) : (
        <div className="flex ml-auto mr-[20px] justify-end ">
          <ul className="flex gap-3 text-slate-800 font-semibold">
            <NavLink to="login">
              <li>Log In</li>
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
