import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const Libraries = () => {
  return (
    <div>
      <div className=" pt-[40px] border-b-1 border-slate-800">
        <ul className="flex items-center text-slate-700 font-sans gap-[50px] font-light">
          <NavLink
            to="favourites"
            style={({ isActive }) => ({
              borderBottom: isActive ? "2px solid #1f2121" : "none",
            })}
            className="pb-1"
          >
            <li>Favourites</li>
          </NavLink>
          <NavLink
            to="yourpodcasts"
            style={({ isActive }) => ({
              borderBottom: isActive ? "2px solid #1f2121" : "none",
            })}
            className="pb-1"
          >
            <li>Podcasts</li>
          </NavLink>
          <NavLink
            to="followed_artists"
            style={({ isActive }) => ({
              borderBottom: isActive ? "2px solid #1f2121" : "none",
            })}
            className="pb-1"
          >
            <li>Artists</li>
          </NavLink>
        </ul>
      </div>
      <div className=" mt-[20px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Libraries;
