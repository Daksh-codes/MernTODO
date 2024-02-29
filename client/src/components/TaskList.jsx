import React from "react";
import axios from "axios";
import useUserStore from "../store";

async function deleteTask(taskId, user, getTask) {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/task/delete/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      getTask();
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

async function changeState(e , taskId , user , getTask) {
  //e.preventdefault();

  try {
    console.log(user.token)
    const response = await axios.put(
      `http://localhost:5000/api/task/changeState/${taskId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log("change state: " , (response));
    if (response.status === 200) {
      getTask();
    }
  } catch (error) {}
}

function TaskList(props) {
  const { user } = useUserStore();
  return (
    <div className="flex items-center justify-center p-4 gap-4 w-max ">
      <input
        type="checkbox"
        id={props.taskid}
        onChange={(e) => changeState(e , props.taskid , user , props.getTask)}
        checked = {props.iscompleted}
        
      />
      <label htmlFor={props.taskid} className={`${props.iscompleted ? "line-through" : ""} w-[30vw]`}>
        {props.task}
      </label>
      <button
        className="flex items-center text-red-600 px-2 py-1"
        onClick={() => deleteTask(props.taskid, user, props.getTask)}
      >
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
}

export default TaskList;
