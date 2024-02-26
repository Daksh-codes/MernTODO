import React from "react";

function TaskList(props) {
  return (
    <div className="flex items-center justify-center p-4 gap-4 w-max ">
      <input type="checkbox" name="" id="" />
      <h3 className="w-[30vw]">{props.task}</h3>
      <button className=" flex items-center text-red-600 px-2 py-1">
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
}

export default TaskList;
