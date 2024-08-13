import React from "react";
import songs from "../assets/Songs";
import Item from "./Item";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Display = () => {
  return (
    <div
      className=" pb-[77.4px] bg-slate-200 border-[#4838380c]
     border-[1px] rounded-lg p-[10px]"
    >
      <div className=" min-h-screen">
        <Outlet />
      </div>
      <div className="  left-[200px] w-[100%] bg-[#3b3b3b23]">
        <Footer />
      </div>
    </div>
  );
};

export default Display;
