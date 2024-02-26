import React, { useState } from "react";
import TaskList from "../components/TaskList";

function Home() {

    const [task , setTask] = useState("");

    function addTask (e) {
        e.preventDefault();
        console.log(task);
        setTask("")
    }

  return (
    <div className="flex justify-center flex-col  items-center mt-12 ">
      <div className="border-2 flex items-center mx-4 rounded-lg flex-col gap-4">
        <div className="flex p-4 border-b-2 ">
          <input
            type="text"
            name=""
            id=""
            className="px-4 text-2xl py-2 w-[30vw] outline-none  "
            placeholder="Create some task.."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={(e)=> addTask(e)} className="px-3 bg-blue-700 text-white flex items-center justify-center rounded-full ">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
        <div>
            <TaskList task={"Study"}  />
        </div>
      </div>

    </div>
  );
}

export default Home;
