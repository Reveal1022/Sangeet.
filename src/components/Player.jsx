import React, { useEffect, useRef, useState, useContext } from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { FaPlay, FaPause, FaVolumeMute } from "react-icons/fa";
import { RxShuffle } from "react-icons/rx";
import { RiRepeatFill } from "react-icons/ri";
import { SongContext } from "../AppContext";
import { FaVolumeUp } from "react-icons/fa";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

const Player = () => {
  const songRef = useRef(null);
  const { currentsong, isPlaying, setIsPlaying, details } =
    useContext(SongContext);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [favourite, setFavourite] = useState(false);

  // Toggle play/pause state
  const handlePlay = () => {
    setIsPlaying(false);
  };

  const handlePause = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    const audio = songRef.current;
    audio.src = currentsong;
    (async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log("Playing failed");
      }
    })();
  }, [currentsong]);

  useEffect(() => {
    if (isPlaying) {
      songRef.current.play();
    } else {
      songRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = songRef.current;

    // Handle updates to current time
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    // Handle updates to song duration
    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    // Apply the volume and mute state
    audio.volume = mute ? 0 : volume;

    // Add event listeners
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleDurationChange);

    // Clean up event listeners on unmount
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleDurationChange);
    };
  }, [mute, volume]); // Added `mute` and `volume` as dependencies

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const progressBarWidth = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="h-[100%] flex">
      {/* Song Info */}
      <div className="w-[30%] flex items-center pl-5 gap-3">
        <img
          src={details.songImage}
          alt=""
          className="w-[50px] h-[50px] rounded-full border-1 border-slate-800"
        />
        <div className="text-slate-700 text-[13px] font-normals">
          <p className="capitalize">{details.songName}</p>
          <p className="capitalize font-light">{details.artist}</p>
        </div>
      </div>

      {/* Controls and Progress */}
      <div className="h-[100%] flex flex-col w-[40%]">
        <div className="h-[100%] w-full flex justify-center items-center gap-[10px] text-[25px] text-slate-600 cursor-pointer self-center">
          <RiRepeatFill />
          <MdSkipPrevious className="text-[40px]" />
          {isPlaying ? (
            <FaPause onClick={handlePlay} />
          ) : (
            <FaPlay onClick={handlePause} />
          )}
          <MdSkipNext className="text-[35px]" />
          <RxShuffle />
        </div>
        <div className="w-full self-center flex items-center justify-center gap-2">
          <p className="text-[11px] text-slate-800">
            {formatTime(currentTime)}
          </p>
          <div className="bg-white h-[3px] w-full relative">
            <div
              className="absolute h-full bg-slate-800"
              style={{ width: `${progressBarWidth}%` }}
            ></div>
          </div>
          <p className="text-[11px]">{formatTime(duration)}</p>
        </div>
      </div>

      {/* Volume Control */}
      <div className="w-[30%] flex items-center text-slate-800 gap-2 px-8 hover:cursor-pointer justify-end ">
        {mute ? (
          <FaVolumeMute
            onClick={() => {
              setMute(!mute);
              setVolume(0); // Set volume to 0 when muting
            }}
          />
        ) : (
          <FaVolumeUp
            onClick={() => {
              setMute(!mute);
              setVolume(0.5); // Set a default volume level when unmuting
            }}
          />
        )}
        <div className="w-[100px] flex items-center ">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={mute ? 0 : volume}
            onChange={(e) => {
              setVolume(e.target.value);
              setMute(false); // Unmute when volume is changed
            }}
            className="w-full accent-slate-800 h-[4px]"
            style={{ WebkitAppearance: "none" }}
          />
        </div>
      </div>

      <audio ref={songRef} />
    </div>
  );
};

export default Player;
