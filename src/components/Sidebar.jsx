import React from "react";
import Library from "./Library";
import { NavLink } from "react-router-dom";

const sidebar = () => {
  return (
    <div className=" h-full p-[20px]">
      <div>
        <h3 className="mt-[30px] uppercase text-[14px] font-light text-stone-500 flex flex-col gap-[10px] ">
          Browse
        </h3>

        <div className="mt-[20px]">
          <ul className="uppercase text-[14px] font-normal text-slate-800 flex flex-col gap-[10px]">
            <NavLink to="browse/newrelease">
              <li className="flex items-center gap-[5px]">new releases</li>
            </NavLink>
            <NavLink to="browse/charts">
              <li className="flex items-center gap-[5px]">top charts</li>
            </NavLink>
            <NavLink to="browse/podcasts">
              <li className="flex items-center gap-[5px]">podcasts</li>
            </NavLink>
            <NavLink to="browse/artists">
              <li className="flex items-center gap-[5px]"> top artists</li>
            </NavLink>
          </ul>
        </div>
      </div>
      <div className="w-[100%]">
        <Library />
      </div>
    </div>
  );
};

export default sidebar;
