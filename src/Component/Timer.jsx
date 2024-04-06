import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsFillPauseCircleFill, BsPlayCircleFill } from "react-icons/bs";
import { RiRestartLine } from "react-icons/ri";
function Timer({ studyMinute, breakMinute, longBreakMinute, sessionType }) {
  const [session, setSession] = useState(sessionType);
  const [count, setCount] = useState(0);
  const [breakCount, setBreakCount] = useState(0);
  const [longBreakCount, setLongBreakCount] = useState(0);
  const [audioPlay, setAudioPlay] = useState(false);
  const [soundSettings, setSoundSettings] = useState({
    sound: "",
    volume: 50,
  });
  const [generalSetting, setGeneralSetting] = useState({
    studyMinute: "",
    breakMinute: "",
    longBreakMinute: "",
  });
  const [focusTimer, setFocusTimer] = useState("");
  const [breatherTimer, setBreatherTimer] = useState("");
  const [longBreakTimer, setLongBreakTimer] = useState("");
  useEffect(() => {
    const prevSound = localStorage.getItem("soundSettings");

    if (prevSound) {
      setSoundSettings(JSON.parse(prevSound));
    }
  }, [localStorage.getItem("soundSettings")]);
  useEffect(() => {
    const prevMinutes = localStorage.getItem("generalSetting");
    if (prevMinutes) {
      const parsedPrevMinutes = JSON.parse(prevMinutes);
      setGeneralSetting(parsedPrevMinutes);
      setFocusTimer(parsedPrevMinutes.studyMinute * 60);
      setBreatherTimer(parsedPrevMinutes.breakMinute * 60);
      setLongBreakTimer(parsedPrevMinutes.longBreakMinute * 60);
    } else {
      setGeneralSetting({
        studyMinute: 25 * 60,
        breakMinute: 5 * 60,
        longBreakMinute: 15 * 60,
      });
    }
    console.log(prevMinutes);
  }, [localStorage.getItem("generalSetting")]);
  const [isFocusTimerRunning, setIsFocusTimerRunning] = useState(false);
  const [isBreatherTimerRunning, setIsBreatherTimerRunning] = useState(false);
  const [isLongBreakTimerRunning, setIsLongBreakTimerRunning] = useState(false);

  useEffect(() => {
    setSession(sessionType);
  }, [sessionType]);
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    document.title = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds} Pomodoro `;
    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  };

  const handleControlClick = useCallback(
    (control) => {
      switch (control) {
        case "StartFocus":
          if (!isFocusTimerRunning) {
            setIsFocusTimerRunning(true);
          }
          break;
        case "PauseFocus":
          setIsFocusTimerRunning(false);
          break;
        case "ResetFocus":
          setFocusTimer(generalSetting.studyMinute * 60);
          setIsFocusTimerRunning(false);
          setAudioPlay(false);
          break;
        case "StartBreather":
          if (!isBreatherTimerRunning) {
            setIsBreatherTimerRunning(true);
          }
          break;
        case "PauseBreather":
          setIsBreatherTimerRunning(false);
          break;
        case "ResetBreather":
          setBreatherTimer(generalSetting.breakMinute * 60);
          setIsBreatherTimerRunning(false);
          setAudioPlay(false);
          break;
        case "StartLongBreak":
          if (!isLongBreakTimerRunning) {
            setIsLongBreakTimerRunning(true);
          }
          break;
        case "PauseLongBreak":
          setIsLongBreakTimerRunning(false);
          break;
        case "ResetLongBreak":
          setLongBreakTimer(generalSetting.longBreakMinute * 60);
          setIsLongBreakTimerRunning(false);
          setAudioPlay(false);
          break;
        default:
          console.log("Invalid Control");
          return;
      }
    },
    [
      isFocusTimerRunning,
      generalSetting.studyMinute,
      generalSetting.breakMinute,
      generalSetting.longBreakMinute,
      isBreatherTimerRunning,
      isLongBreakTimerRunning,
    ]
  );
  useEffect(() => {
    let focusInterval;
    if (isFocusTimerRunning) {
      focusInterval = setInterval(() => {
        setFocusTimer((prevTimer) => {
          if (prevTimer > 0) {
            setAudioPlay(false);
            return prevTimer - 1;
          } else {
            setIsFocusTimerRunning(false);
            setAudioPlay(true);
            return generalSetting.studyMinute * 60;
          }
        });
      }, 1000);
    }
    return () => clearInterval(focusInterval);
  }, [generalSetting.studyMinute, isFocusTimerRunning]);
  useEffect(() => {
    let breatherInterval;
    if (isBreatherTimerRunning) {
      breatherInterval = setInterval(() => {
        setBreatherTimer((prevTimer) => {
          if (prevTimer > 0) {
            setAudioPlay(false);
            return prevTimer - 1;
          } else {
            setIsBreatherTimerRunning(false);
            setAudioPlay(true);
            return generalSetting.breakMinute * 60;
          }
        });
      }, 10);
    }
    return () => clearInterval(breatherInterval);
  }, [generalSetting.breakMinute, isBreatherTimerRunning]);
  useEffect(() => {
    let longBreakInterval;
    if (isLongBreakTimerRunning) {
      longBreakInterval = setInterval(() => {
        setLongBreakTimer((prevTimer) => {
          if (prevTimer > 0) {
            setAudioPlay(false);
            return prevTimer - 1;
          } else {
            setIsLongBreakTimerRunning(false);
            setAudioPlay(true);
            return generalSetting.longBreakMinute * 60;
          }
        });
      }, 1000);
    }
    return () => clearInterval(longBreakInterval);
  }, [generalSetting.longBreakMinute, isLongBreakTimerRunning]);

  useEffect(() => {
    handleControlClick(session);
  }, [handleControlClick, session]);

  return (
    <div className="">
      {/* <p>Finished sessions Today:{count}</p>
      <p>Total breaks today:{breakCount}</p> */}
      {audioPlay && (
        <audio
          src={soundSettings.sound}
          autoPlay
          className=""
          volume={soundSettings.volume}
        />
      )}
      <div className="relative w-fit mx-auto z-30">
        {session === "focus" ? (
          <div>
            <div className="sm:w-[450px] sm:h-[450px] w-[300px] h-[300px] text-4xl sm:text-5xl rounded-full bg-white bg-opacity-[0.35] shadow-lg backdrop-filter backdrop-blur-lg backdrop-saturate-150 border-2 border-white border-opacity-20 text-black flex justify-center items-center mx-auto m-10">
              {formatTime(focusTimer)}
            </div>
            <div className="flex justify-evenly w-fit mx-auto gap-10  mt-[45px] pb-4">
              <button
                className="cursor-pointer"
                onClick={() => {
                  handleControlClick("StartFocus");
                }}
              >
                <BsPlayCircleFill size={30} />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => {
                  handleControlClick("PauseFocus");
                }}
              >
                <BsFillPauseCircleFill size={30} />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => {
                  handleControlClick("ResetFocus");
                }}
              >
                <RiRestartLine size={30} />
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        {session === "breather" ? (
          <div>
            <div className="sm:w-[450px] sm:h-[450px] w-[300px] h-[300px] text-4xl sm:text-5xl rounded-full bg-blue-200 bg-opacity-[0.35] shadow-lg backdrop-filter backdrop-blur-lg backdrop-saturate-150 border-2 border-white border-opacity-20 text-black flex justify-center items-center mx-auto m-10">
              {formatTime(breatherTimer)}
            </div>
            <div className="flex justify-evenly w-fit mx-auto  gap-10 mt-[45px]">
              <button
                className="cursor-pointer text-blue-300"
                onClick={() => {
                  handleControlClick("StartBreather");
                }}
              >
                <BsPlayCircleFill size={30} />
              </button>
              <button
                className="cursor-pointer text-blue-300"
                onClick={() => {
                  handleControlClick("PauseBreather");
                }}
              >
                <BsFillPauseCircleFill size={30} />
              </button>
              <button
                className="cursor-pointer text-blue-300"
                onClick={() => {
                  handleControlClick("ResetBreather");
                }}
              >
                <RiRestartLine size={30} />
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        {session === "longBreak" ? (
          <div>
            <div className="sm:w-[450px] sm:h-[450px] w-[300px] h-[300px] text-4xl sm:text-5xl rounded-full bg-purple-200 bg-opacity-[0.35] shadow-lg backdrop-filter backdrop-blur-lg backdrop-saturate-150 border-2 border-white border-opacity-20 text-black flex justify-center items-center mx-auto m-10">
              {formatTime(longBreakTimer)}
            </div>
            <div className="flex justify-evenly w-fit mx-auto  gap-10 mt-[45px]">
              <button
                className="cursor-pointer text-purple-300"
                onClick={() => {
                  handleControlClick("StartLongBreak");
                }}
              >
                <BsPlayCircleFill size={30} />
              </button>
              <button
                className="cursor-pointer text-purple-300"
                onClick={() => {
                  handleControlClick("PauseLongBreak");
                }}
              >
                <BsFillPauseCircleFill size={30} />
              </button>
              <button
                className="cursor-pointer text-purple-300"
                onClick={() => {
                  handleControlClick("ResetLongBreak");
                }}
              >
                <RiRestartLine size={30} />
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Timer;
