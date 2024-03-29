import Task from "../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const { task , user } = req.body;
    const newTask = new Task({ task , user});
    const savedTask = await newTask.save();
    return res.status(201).send(savedTask);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { task, isCompleted } = req.body;
    const id = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(id, { task, isCompleted });
    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


export const getTasksById = async (req , res) => {
    try {
        const id = req.params.id
        const taskData = await Task.find({user : id})
                console.log(id)
        return res.status(200).send(taskData);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


export const changeState = async (req, res) => {
  try {

    const id = req.params.id;
    const task = await  Task.findOne({_id : id })
    console.log(task.isCompleted)
    const updatedTask = await Task.findByIdAndUpdate(id, {isCompleted : !task.isCompleted });
    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};