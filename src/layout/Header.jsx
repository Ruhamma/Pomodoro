import React, { useEffect, useRef, useState } from "react";
import { FaMusic } from "react-icons/fa";
import { AiFillQuestionCircle, AiOutlineFullscreen } from "react-icons/ai";
import { BiSolidCustomize } from "react-icons/bi";
function Header({
  backgroundColor,
  setBackgroundColor,
  selectedImage,
  setSelectedImage,
}) {
  const paths = [
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
  const [time, setTime] = useState();
  const [openCustomize, setOpenCustomize] = useState(false);
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
  };
  const handleOpenCustomize = () => {
    setOpenCustomize(!openCustomize);
  };
  const handleColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };
  const handleBackgroundImageChange = (image) => {
    setSelectedImage(image);
  };

  return (
    <div>
      {openCustomize && (
        <div
          style={{ fontFamily: "Anurati" }}
          className="absolute inset-0 bg-black bg-opacity-75 flex-col items-center justify-center z-10"
        >
          <p onClick={handleOpenCustomize}>CUSTOMIZE</p>
          <div className="">
            <p>Choose Solid Background :</p>
            <input
              type="color"
              value={backgroundColor}
              onChange={handleColorChange}
            />
          </div>
          <div className="">
            <p>Choose Background Image:</p>

            <div className="grid grid-cols-4 gap-2">
              {paths.map((url) => {
                return (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <img
                    src={url}
                    key={url}
                    alt={url}
                    onClick={() => {
                      handleBackgroundImageChange(url);
                    }}
                    style={{ cursor: "pointer" }}
                    className=""
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div
        className="flex justify-between items-center bg-black text-white p-4 h-[10vh] "
        style={{ fontFamily: "Anurati", backgroundColor: backgroundColor }}
      >
        <p className="pl-5 ml-5 text-xl">POMODORO</p>
        {/* <p className="text-lg self-center">{time}</p> */}
        <div className="flex items-center justify-evenly mr-5 w-[10%]">
          <FaMusic size={20} className="cursor-pointer" title="music" />
          <AiFillQuestionCircle
            size={25}
            className="cursor-pointer"
            title="info"
          />
          <BiSolidCustomize
            size={25}
            className="cursor-pointer"
            title="customize"
            onClick={handleOpenCustomize}
          />
          <button onClick={toggleFullscreen}>
            <AiOutlineFullscreen
              size={25}
              className="cursor-pointer"
              title="Full Screen"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
