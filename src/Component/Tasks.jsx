import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  MdDelete,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";
function Tasks() {
  const [storedTasks, setStoredTasks] = useState([]);
  const [arrowClicked, setArrowClicked] = useState(true);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [task, setTask] = useState("");
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("Task"));
    if (tasks) {
      setStoredTasks(tasks);
    }
  }, []);

  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    const updateTasks = [...storedTasks, { title: task, checked: false }];
    setStoredTasks(updateTasks);
    setTask("");
    localStorage.setItem("Task", JSON.stringify(updateTasks));
  };
  const handleDelete = (index) => {
    const updateTasks = [...storedTasks];
    updateTasks.splice(index, 1);
    setStoredTasks(updateTasks);
    localStorage.setItem("Task", JSON.stringify(updateTasks));
  };
  const handleCheck = (index) => {
    const updateTasks = [...storedTasks];
    updateTasks[index].checked = !updateTasks[index].checked;
    localStorage.setItem("Task", JSON.stringify(updateTasks));
    setStoredTasks(updateTasks);
  };
  const handleArrowClick = () => {
    setArrowClicked(!arrowClicked);
  };
  const handlePopUp = () => {
    setOpenPopUp(!openPopUp);
  };
  const handleDeleteAll = () => {
    setStoredTasks([]);
    localStorage.setItem("Task", JSON.stringify([]));
    setOpenPopUp(!openPopUp);
  };
  return (
    <div className="bg-pink-900 ">
      {openPopUp && (
        <div
          className="absolute inset-0 flex flex-col gap-10 items-center justify-center bg-black bg-opacity-95 "
          style={{ fontFamily: "Anurati" }}
        >
          <p className="text-center">
            Are you sure you want to delete all your tasks?
          </p>
          <div className="flex gap-4 text-black">
            <button
              onClick={handleDeleteAll}
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
      <div
        className={` z-40 absolute top-0 right-0 h-full w-full sm:w-[25%] md:w-[35%] lg:w-[25%] bg-black bg-opacity-[0.45] shadow-lg backdrop-filter backdrop-blur-lg
        backdrop-saturate-150 border-2 border-white border-opacity-20   transition-transform duration-300 ${
          arrowClicked ? "translate-x-full " : ""
        }`}
      >
        {arrowClicked ? (
          <MdOutlineKeyboardArrowLeft
            onClick={handleArrowClick}
            size={35}
            className={`absolute top-[50%] left-[-25px] text-black bg-gray-700 rounded-full shadow-lg backdrop-filter backdrop-blur-lg
        backdrop-saturate-150 cursor-pointer z-10`}
            title="Add tasks"
          />
        ) : (
          <MdOutlineKeyboardArrowRight
            onClick={handleArrowClick}
            size={35}
            className={`absolute top-[50%] left-[-22px] text-black bg-gray-700 rounded-full shadow-lg backdrop-filter backdrop-blur-lg
        backdrop-saturate-150 cursor-pointer z-10`}
            title="close tasks"
          />
        )}

        <div className="flex items-center justify-between">
          <h1
            style={{ fontFamily: "Anurati" }}
            className="text-4xl text-left m-5"
            onClick={handleArrowClick}
          >
            {" "}
            TASKS
          </h1>
          <RiDeleteBin2Fill
            className="mr-5 cursor-pointer"
            onClick={handlePopUp}
            title="Delete All"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <p className="mb-5 mt-5">Add task</p>
          <input
            required
            type="text"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            className="rounded w-[85%] mb-10 p-1 bg-gray-700 bg-opacity-[0.35] shadow-lg backdrop-filter backdrop-blur-lg
        backdrop-saturate-150 border-2 border-white border-opacity-5 "
          />
        </form>

        <ul
          className="  m-2 rounded bg-gray-700 bg-opacity-[0.35] shadow-lg backdrop-filter backdrop-blur-lg
        backdrop-saturate-150 border-2 border-white border-opacity-5 overflow-y-scroll h-[64%] flex-col gap-20 p-2"
        >
          {storedTasks.length > 0 ? (
            storedTasks.map((item, index) => (
              <li className="flex justify-around pb-5" key={index}>
                <div className="w-[220px] flex gap-4 items-center">
                  <label className="checkBox">
                    <input
                      type="checkbox"
                      name=""
                      id={`check-${index}`}
                      checked={item.checked}
                      onChange={() => {
                        handleCheck(index);
                      }}
                    />
                    <div className="transition"></div>
                  </label>

                  <label
                    htmlFor={`check-${index}`}
                    className={`overflow-wrap text-left ${
                      item.checked ? "line-through" : ""
                    } cursor-pointer duration-300`}
                    style={{ wordBreak: "break-word" }}
                  >
                    {item.title}
                  </label>
                </div>
                <button
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  <MdDelete />
                </button>
              </li>
            ))
          ) : (
            <div
              className="text-3xl flex items-center justify-center h-full"
              style={{ fontFamily: "Anurati" }}
            >
              <p>EMPTY</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Tasks;
