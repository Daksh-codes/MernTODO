import React, { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import useUserStore from "../store";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import bg from "../assets/wood.jpg";

function Home() {
  const [task, setTask] = useState("");
  const [tasklist, setTasklist] = useState([]);
  const { user } = useUserStore();
  console.log(user);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    //const header = `Authorization: Bearer ${user.token}`;
    const response = await axios.get(
      `http://localhost:5000/api/task/${user._id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    //console.log(response);
    if (response.status === 200) {
      setTasklist(response.data);
    }
  };

  async function addTask(e) {
    try {
      if (!user) {
        toast.error("Login first");
      }
      e.preventDefault();
      console.log(task);
      const response = await axios.post(
        "http://localhost:5000/api/task/create",
        {
          task,
          user: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        setTask("");
        getTasks();
      }
    } catch (error) {}
  }

  return (
    <div style={{backgroundImage: `url(${bg})`}} className="h-screen bg-no-repeat bg-cover">
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
      />
      <div
        
        className="flex justify-center flex-col  items-center mt-12  "
      >
        <div className="border-2 flex items-center mx-4 rounded-lg flex-col gap-4 bg-white">
          <div className="flex p-4 border-b-2 ">
            <input
              type="text"
              name=""
              id=""
              className="px-4 text-2xl py-2 w-[30vw] outline-none  "
              placeholder="Add some task.."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button
              onClick={(e) => addTask(e)}
              className="px-3 bg-blue-700 text-white flex items-center justify-center rounded-full "
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div >
            {tasklist.map((t) => {
              console.log(t);
              return (
                <TaskList
                  task={t.task}
                  taskid={t._id}
                  getTask={getTasks}
                  iscompleted={t.isCompleted}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
