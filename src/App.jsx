import React from "react";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import Queue from "./components/Queue";

const App = () => {
  const [isQueueOpen, setIsQueueOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsQueueOpen(true);
  };

  const handleMouseLeave = () => {
    setIsQueueOpen(false);
  };

  return (
    <div className="bg-slate-200 min-h-[100vh]">
      <div className="w-full h-[10vh] flex items-center fixed border-b border-b-slate-400 top-0 z-10">
        <Header />
      </div>
      <div className="fixed top-[10vh] w-[200px] bg-slate-200 h-[80vh]">
        <Sidebar />
      </div>
      <div
        className={`w-[350px] h-[600px] mt-[20px] bg-slate-200 rounded-2xl fixed top-[10%] shadow-2xl overflow-hidden z-20 transition-right duration-500 ease-in-out 
          ${isQueueOpen ? "right-2" : "right-[-280px]"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Queue />
      </div>
      <div className="  ml-[200px]   w-[75%] relative top-[10vh] h-[100%] z-0">
        <Display />
      </div>

      <div className="fixed bottom-0 h-[10%] w-[100%] bg-slate-200 border-t-2 border-t-slate-400">
        <Player />
      </div>
    </div>
  );
};

export default App;
