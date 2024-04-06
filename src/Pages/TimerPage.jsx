import React, { useCallback, useEffect, useRef, useState } from "react";
import Timer from "../Component/Timer";
import { FaMusic } from "react-icons/fa";
import {
  AiFillQuestionCircle,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineReload,
} from "react-icons/ai";
import { BiSolidCustomize } from "react-icons/bi";
import Collapsible from "react-collapsible";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
function TimerPage() {
  const [studyMinute, setStudyMinute] = useState(25);
  const [breakMinute, setBreakMinute] = useState(5);
  const [longBreakMinute, setLongBreakMinute] = useState(15);
  const [sessionType, setSessionType] = useState("focus");
  const [time, setTime] = useState();
  const [openCustomize, setOpenCustomize] = useState(false);
  const [backgroundSettings, setBackgroundSettings] = useState({
    backgroundColor: "",
    backgroundImage: "",
  });
  const [tempBackgroundSettings, setTempBackgroundSettings] = useState({
    backgroundColor: "",
    backgroundImage: "/images/image2.jpg",
  });
  const [soundSettings, setSoundSettings] = useState({
    sound: "",
    volume: 50,
  });
  const [tempSoundSettings, setTempSoundSettings] = useState({
    sound: "",
    volume: 50,
  });
  const [tempGeneralSettings, setTempGeneralSettings] = useState({
    studyMinute: 25,
    breakMinute: 5,
    longBreakMinute: 15,
  });
  const [backgroundSettingsLoaded, setBackgroundSettingsLoaded] =
    useState(false);
  const [settingChoice, setSettingChoice] = useState("general");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  if (!localStorage.getItem("generalSetting")) {
    const settingsData = {
      studyMinute: 25,
      breakMinute: 5,
      longBreakMinute: 15,
    };
    localStorage.setItem("generalSetting", JSON.stringify(settingsData));
  }
  if (!localStorage.getItem("backgroundSettings")) {
    const backgroundSettings = {
      backgroundColor: "",
      backgroundImage: "/images/image2.jpg",
    };
    localStorage.setItem(
      "backgroundSettings",
      JSON.stringify(backgroundSettings)
    );
  }
  const handleSessionType = (type) => {
    setSessionType(type);
  };
  const handlePopUp = () => {
    setOpenPopUp(!openPopUp);
  };
  const handleOpenInfo = () => {
    setOpenInfo(!openInfo);
  };
  useEffect(() => {
    handleSessionType("focus");
  }, []);
  const imagePaths = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
    "/images/image6.jpg",
    "/images/image7.jpg",
    "/images/image8.jpg",
    "/images/image9.jpg",
    "/images/image10.jpg",
    "/images/image11.jpg",
    "/images/image12.jpg",
    "/images/image13.jpg",
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [setTime]);
  const isFullscreen = useRef(false);
  const [fullScreen, setFullScreen] = useState(false);
  useEffect(() => {
    const onFullscreenChange = () => {
      isFullscreen.current = Boolean(document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);
  const toggleFullscreen = () => {
    if (isFullscreen.current) {
      document.exitFullscreen();
    } else {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    }
    setFullScreen(!fullScreen);
  };
  const handleOpenCustomize = () => {
    setOpenCustomize(!openCustomize);
  };
  const handleColorChange = (e) => {
    setTempBackgroundSettings({
      backgroundColor: e.target.value,
      backgroundImage: "",
    });
  };
  const handleBackgroundImageChange = (image) => {
    setTempBackgroundSettings({
      backgroundColor: "",
      backgroundImage: image,
    });
  };

  useEffect(() => {
    const prevBackground = localStorage.getItem("backgroundSettings");
    if (prevBackground) {
      setBackgroundSettings(JSON.parse(prevBackground));
    }
    setBackgroundSettingsLoaded(true);
  }, [backgroundSettingsLoaded]);
  const handleDisplaySubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "backgroundSettings",
      JSON.stringify(tempBackgroundSettings)
    );
    setBackgroundSettings(tempBackgroundSettings);
  };
  const handleResetClick = () => {
    window.location.reload();
    const settingsData = {
      studyMinute: 25,
      breakMinute: 5,
      longBreakMinute: 15,
    };
    const backgroundSettings = {
      backgroundColor: "",
      backgroundImage: "/images/image2.jpg",
    };
    const soundSettings = {
      sound: "/audios/lofi.wav",
      volume: 50,
    };
    localStorage.setItem(
      "backgroundSettings",
      JSON.stringify(backgroundSettings)
    );
    localStorage.setItem("generalSetting", JSON.stringify(settingsData));
    localStorage.setItem("soundSettings", JSON.stringify(soundSettings));
  };
  const handleSettingChoice = (choice) => {
    switch (choice) {
      case "general":
        setSettingChoice("general");
        break;
      case "display":
        setSettingChoice("display");
        break;
      case "sound":
        setSettingChoice("sound");
        break;
      default:
        setSettingChoice("general");
        break;
    }
  };
  const handleSoundSelect = (e) => {
    switch (e.target.value) {
      case "1":
        setTempSoundSettings({
          sound: "/audios/lofi.wav",
          volume: tempSoundSettings.volume,
        });
        break;
      case "2":
        setTempSoundSettings({
          sound: "/audios/train.wav",
          volume: tempSoundSettings.volume,
        });
        break;
      case "3":
        setTempSoundSettings({
          sound: "/audios/chime.wav",
          volume: tempSoundSettings.volume,
        });
        break;
      case "4":
        setTempSoundSettings({
          sound: "/audios/alarm.wav",
          volume: tempSoundSettings.volume,
        });
        break;
      case "5":
        setTempSoundSettings({
          sound: "/audios/bell.wav",
          volume: tempSoundSettings.volume,
        });
        break;
      case "6":
        setTempSoundSettings({
          sound: "/audios/birds.wav",
          volume: tempSoundSettings.volume,
        });
        break;
      default:
        break;
    }
  };
  const currentlyPlayingAudio = useRef(null);
  const playAudio = useCallback((tempSoundSettings) => {
    if (currentlyPlayingAudio.current) {
      currentlyPlayingAudio.current.pause();
    }
    const audio = new Audio(tempSoundSettings.sound);
    audio.volume = tempSoundSettings.volume / 100;
    currentlyPlayingAudio.current = audio;
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 5000);
  }, []);
  useEffect(() => {
    if (tempSoundSettings) {
      playAudio(tempSoundSettings);
    }
  }, [playAudio, tempSoundSettings]);
  const handleVolumeChange = (e) => {
    setTempSoundSettings({
      sound: tempSoundSettings.sound,
      volume: e.target.value,
    });
  };
  const handleSoundSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("soundSettings", JSON.stringify(tempSoundSettings));
    setSoundSettings(tempSoundSettings);
  };
  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("generalSetting", JSON.stringify(tempGeneralSettings));
  };
  return (
    <>
      {!backgroundSettingsLoaded ? (
        <div className="h-[100vh] flex items-center justify-center">
          <div className="hourglassBackground ">
            <div className="hourglassContainer">
              <div className="hourglassCurves"></div>
              <div className="hourglassCapTop"></div>
              <div className="hourglassGlassTop"></div>
              <div className="hourglassSand"></div>
              <div className="hourglassSandStream"></div>
              <div className="hourglassCapBottom"></div>
              <div className="hourglassGlass"></div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className=" relative h-[100vh] bg-cover "
          style={{
            backgroundColor: backgroundSettings.backgroundColor,
            backgroundImage: `url(${backgroundSettings.backgroundImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className=" absolute inset-0 bg-black bg-opacity-70 z-0"></div>

          <div>
            {openCustomize && (
              <div
                style={{ fontFamily: "Anurati" }}
                className="absolute inset-0 flex items-center justify-center z-40"
              >
                <div
                  onClick={handleOpenCustomize}
                  className="absolute inset-0 bg-black bg-opacity-90 sm:bg-opacity-75 -z-30"
                ></div>
                <p
                  onClick={handleOpenCustomize}
                  className="pb-10 text-2xl absolute top-10 cursor-pointer"
                >
                  CUSTOMIZE
                </p>
                <div
                  className="bg-black bg-opacity-[0.35] shadow-lg backdrop-filter backdrop-blur-lg
        backdrop-saturate-150 border-2 border-white border-opacity-20  sm:w-[40%] md:w-[50%] lg:w-[40%] min-h-[50%] h-fit  rounded-lg p-6"
                >
                  <div className="flex sm:gap-5 flex-col sm:flex-row">
                    <div className="flex flex-row  sm:flex-col gap-16 sm:gap-28 sm:bg-black bg-gray-900 bg-opacity-25 w-full sm:w-[30%] h-fit sm:h-[40vh] text-left p-4 rounded-lg leading-loose">
                      <div className="flex gap-4 sm:flex-col">
                        <p
                          onClick={() => {
                            handleSettingChoice("general");
                          }}
                          className="cursor-pointer"
                        >
                          General
                        </p>
                        <p
                          onClick={() => {
                            handleSettingChoice("display");
                          }}
                          className="cursor-pointer"
                        >
                          Display
                        </p>
                        <p
                          onClick={() => {
                            handleSettingChoice("sound");
                          }}
                          className="cursor-pointer"
                        >
                          Sound
                        </p>
                      </div>
                      <button
                        onClick={handlePopUp}
                        className=" sm:block hidden bg-red-900 bg-opacity-25 hover:bg-opacity-50 px-3 rounded-md "
                      >
                        Reset
                      </button>
                      <AiOutlineReload
                        onClick={handlePopUp}
                        className="sm:hidden visible text-white "
                        size={25}
                      />
                    </div>
                    {openPopUp && (
                      <div
                        className=" rounded-lg absolute inset-0 flex flex-col sm:gap-10 items-center justify-center bg-black bg-opacity-95 z-10"
                        style={{ fontFamily: "Anurati" }}
                      >
                        <p className="text-center">
                          Are you sure you want to reset your settings?
                        </p>
                        <div className="flex gap-4 text-black mt-2">
                          <button
                            onClick={handleResetClick}
                            className="bg-white px-5 py-2 rounded-md  flex items-center justify-center w-18"
                          >
                            Continue
                          </button>
                          <button
                            onClick={handlePopUp}
                            className="bg-white px-5 py-2 rounded-md flex items-center justify-center w-18"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                    <form
                      className={`${
                        settingChoice === "general" ? `` : "hidden"
                      } p-2 w-full`}
                      onSubmit={handleGeneralSubmit}
                    >
                      <div className=" flex-col flex sm:gap-4 gap-6 ">
                        <p className="text-center mt-5 sm:mt-0 mb-2 text-xl">
                          GENERAL
                        </p>
                        <div className="flex gap-5  items-center">
                          <label
                            htmlFor="studyMinute "
                            className="sm:text-base md:text-xs lg:text-base"
                          >
                            Pomodoro
                          </label>{" "}
                          <input
                            className="bg-black rounded p-1 border-2 w-40 sm:w-max border-white border-opacity-50"
                            type="number"
                            name="study"
                            id="studyMinute"
                            min="1"
                            step="1"
                            required
                            onChange={(e) => {
                              setTempGeneralSettings({
                                studyMinute: e.target.value || 25,
                                breakMinute:
                                  tempGeneralSettings.breakMinute || 5,
                                longBreakMinute:
                                  tempGeneralSettings.longBreakMinute || 15,
                              });
                            }}
                          />
                        </div>
                        <div className="flex gap-2  items-center">
                          <label
                            htmlFor="breakMinute"
                            className="sm:text-base md:text-xs lg:text-base"
                          >
                            Short Break
                          </label>
                          <input
                            className="bg-black w-40 sm:w-max rounded p-1 border-2 border-white border-opacity-50"
                            type="number"
                            name="break"
                            id="breakMinute"
                            min="1"
                            step="1"
                            required
                            onChange={(e) => {
                              setTempGeneralSettings({
                                studyMinute:
                                  tempGeneralSettings.studyMinute || 25,
                                breakMinute: e.target.value || 5,
                                longBreakMinute:
                                  tempGeneralSettings.longBreakMinute || 15,
                              });
                            }}
                          />
                        </div>
                        <div className="flex gap-[15px]  items-center">
                          <label
                            htmlFor="longBreakMinute"
                            className="sm:text-base md:text-xs lg:text-base"
                          >
                            Long Break
                          </label>
                          <input
                            className="bg-black w-40 sm:w-max md:w-[145px] lg:w-max rounded p-1 border-2 border-white border-opacity-50"
                            type="number"
                            name="longBreak"
                            id="longBreakMinute"
                            min="1"
                            step="1"
                            required
                            onChange={(e) => {
                              setTempGeneralSettings({
                                studyMinute:
                                  tempGeneralSettings.studyMinute || 25,
                                breakMinute:
                                  tempGeneralSettings.breakMinute || 5,
                                longBreakMinute: e.target.value || 15,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="bg-white bg-opacity-75 border-2 border-white rounded text-black hover:bg-black hover:text-white transition-all duration-500 px-10 py-0.5 mt-10 mx-auto"
                      >
                        Save
                      </button>
                    </form>
                    <form
                      className={`${
                        settingChoice === "display" ? `` : "hidden"
                      } flex flex-col gap-6 w-full`}
                      onSubmit={handleDisplaySubmit}
                    >
                      <p className="text-center text-xl mt-5 mb-5">DISPLAY</p>
                      <div className="flex gap-2 w-[70%] items-center">
                        <p className="sm:text-base md:text-xs lg:text-base">
                          {" "}
                          Solid Background{" "}
                        </p>
                        <input
                          type="color"
                          value={backgroundSettings.backgroundColor}
                          onChange={handleColorChange}
                        />
                      </div>
                      <div className="">
                        <Collapsible
                          triggerTagName="span"
                          trigger={
                            <div className="flex items-center ">
                              <span className="sm:text-base md:text-xs lg:text-base">
                                Background Image
                              </span>

                              <MdKeyboardArrowDown size={25} />
                            </div>
                          }
                          transitionTime={200}
                        >
                          <div className="grid grid-cols-4 gap-2 mx-auto w-fit mt-2">
                            {imagePaths.map((url) => (
                              <img
                                src={url}
                                key={url}
                                alt={url}
                                onClick={() => handleBackgroundImageChange(url)}
                                style={{ cursor: "pointer" }}
                                className="sm:w-[6rem] sm:h-[6rem] w-[4rem] h-[4rem] rounded"
                              />
                            ))}
                          </div>
                        </Collapsible>
                      </div>
                      <button
                        type="submit"
                        className="bg-white bg-opacity-75 border-2 border-white rounded text-black hover:bg-black hover:text-white transition-all duration-500 w-[28%] mx-auto mt-12"
                      >
                        Save
                      </button>
                    </form>
                    <form
                      className={`${
                        settingChoice === "sound" ? `` : "hidden"
                      } flex flex-col gap-6  w-full `}
                      onSubmit={handleSoundSubmit}
                    >
                      <p className="text-center mt-5 text-xl  mb-5">SOUND</p>
                      <div className="flex gap-2 mb-3">
                        <label htmlFor="soundSelect">Sound Effects</label>
                        <select
                          id="soundSelect"
                          name="soundSelect"
                          className="bg-black"
                          onChange={handleSoundSelect}
                        >
                          <option value="1">Lofi</option>
                          <option value="2">Train</option>
                          <option value="3">Chime</option>
                          <option value="4">Alarm</option>
                          <option value="5">Bell</option>
                          <option value="6">Birds</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <label htmlFor="volumeRange">Volume</label>
                        <input
                          type="range"
                          id="volumeRange"
                          name="volumeRange"
                          min="0"
                          max="100"
                          onChange={handleVolumeChange}
                          className="custom-range"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-white bg-opacity-75 text-black border-2 border-white px-2 rounded hover:bg-black hover:text-white transition-all duration-500 mt-10 w-[25%] mx-auto"
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
            <div
              className="flex justify-between items-center  text-white p-1 sm:p-4 h-[10vh] "
              style={{ fontFamily: "Anurati" }}
            >
              <p className="sm:pl-5 ml-5 sm:text-xl lg:text-2xl  z-30">
                POMODORO
              </p>
              <div className="flex items-center justify-evenly mr-5 w-[35%] sm:w-[10%] z-30 gap-1 sm:gap-2">
                {/* <FaMusic
                  className="cursor-pointer text-lg sm:text-2xl "
                  title="music"
                /> */}
                <AiFillQuestionCircle
                  className="cursor-pointer text-xl sm:text-3xl"
                  title="info"
                  onClick={handleOpenInfo}
                />
                <BiSolidCustomize
                  className="cursor-pointer text-xl sm:text-3xl"
                  title="customize"
                  onClick={handleOpenCustomize}
                />
                <button onClick={toggleFullscreen}>
                  {fullScreen ? (
                    <AiOutlineFullscreenExit
                      className="cursor-pointer text-xl sm:text-3xl"
                      title="Full Screen"
                    />
                  ) : (
                    <AiOutlineFullscreen
                      className="cursor-pointer text-xl sm:text-3xl"
                      title="Full Screen"
                    />
                  )}
                </button>
              </div>
              {openInfo && (
                <div
                  style={{ fontFamily: "Roboto" }}
                  className=" sm:h-[70%]  p-2 my-auto  lg:overflow-hidden absolute w-full sm:w-[60%] sm:rounded-3xl shadow-lg shadow-white mx-auto inset-0 flex flex-col gap-1 items-center justify-center bg-black bg-opacity-95 z-40"
                >
                  <IoMdClose
                    className="absolute text-3xl  right-3 sm:right-10 top-5 cursor-pointer"
                    onClick={handleOpenInfo}
                  />

                  <div className="w-[90%] sm:w-[70%] flex flex-col gap-4 text-center items-center justify-center sm:h-full">
                    <h1
                      style={{ fontFamily: "Anurati" }}
                      className="mb-1 sm:mt-8 text-xl sm:text-2xl"
                    >
                      POMODORO
                    </h1>{" "}
                    <div>
                      <h2 className="font-bold text-lg mb-4">
                        Tomato Time Trickery: Unleashing Your Inner Study Wizard
                        ⚡️
                      </h2>
                      <p className="text-">
                        In the magical realm of productivity, the Pomodoro
                        Technique is your trusty wand. Imagine a timer slicing
                        time into 25-minute Pomodoros – less sci-fi, more focus.
                        Take the Pomodoro Pledge: "I focus for 25 minutes,
                        banish distractions, then reward with a 5-minute
                        mini-vacation in YouTube cat video land."
                        Procrastination turns into a cute hamster. Break study
                        into Pomodoros, conquer the hamster, and become the hero
                        of productivity. Welcome to the Pomodoro Symphony – each
                        Pomodoro a musical note. Be the conductor, reach
                        symphonic focus. After four sessions, take a
                        tomato-infused break. 🍅🎉
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-col justify-evenly overflow-x-hidden ">
            <div
              className="flex w-full justify-evenly text-lg sm:text-xl my-10 choice "
              style={{ fontFamily: "Anurati" }}
            >
              <button
                onClick={() => {
                  handleSessionType("focus");
                }}
                className="z-30"
              >
                Focus
              </button>
              <button
                onClick={() => {
                  handleSessionType("breather");
                }}
                className="z-30"
              >
                Breather
              </button>
              <button
                onClick={() => {
                  handleSessionType("longBreak");
                }}
                className="z-30"
              >
                Long break
              </button>
            </div>
            <Timer
              studyMinute={studyMinute}
              breakMinute={breakMinute}
              longBreakMinute={longBreakMinute}
              sessionType={sessionType}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TimerPage;
