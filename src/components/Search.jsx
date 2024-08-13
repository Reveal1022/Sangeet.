import React from "react";
import { MdCancel } from "react-icons/md";

const Search = ({ hideSearch }) => {
  return (
    <div className="fixed bg-white top-[14px] left-[15%] h-[300px] rounded-[30px] overflow-hidden shadow-2xl">
      <div className="w-[70vw] rounded-[40px] px-[1px] flex items-center">
        <input
          type="text"
          placeholder="Search Music"
          className="w-[90%] h-[40px] pl-[30px] focus:outline-none"
        />
        <button className="ml-auto mr-[30px]" onClick={hideSearch}>
          <MdCancel className="text-[22px] text-red-400" />
        </button>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Search;
