import React from "react";
import { IoAddSharp } from "react-icons/io5";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { MdOutlinePodcasts } from "react-icons/md";
import { GiMicrophone } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const Library = () => {
  return (
    <div className="">
      <h3 className="mt-[30px] uppercase text-[14px] font-light text-stone-500 flex flex-col gap-[10px] ">
        library
      </h3>

      <div className="mt-[20px]">
        <ul className="uppercase text-[14px] font-normal text-slate-800 flex flex-col gap-[10px]">
          <NavLink to="libraries/favourites">
            <li className="flex items-center gap-[5px]">
              <IoMusicalNotesOutline className="text-[21px]" /> liked songs
            </li>
          </NavLink>
          <NavLink to="libraries/yourpodcasts">
            <li className="flex items-center gap-[5px]">
              <MdOutlinePodcasts className="text-[21px]" />
              podcasts
            </li>
          </NavLink>
          <NavLink to="libraries/followed_artists">
            <li className="flex items-center gap-[5px]">
              <GiMicrophone className="text-[21px]" />
              artists
            </li>
          </NavLink>
        </ul>
      </div>

      <button className="rounded-[30px] border border-slate-800 px-[15px] py-[5px] flex items-center gap-1 mt-[20px] text-slate-800 justify-around">
        <IoAddSharp /> New Playlist
      </button>
    </div>
  );
};

export default Library;
