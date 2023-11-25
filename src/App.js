import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskPage from "./Pages/TaskPage";
import TimerPage from "./Pages/TimerPage";
function App() {
  return (
    <div className="App bg-black text-white  ">
      <TaskPage />
      <TimerPage />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
