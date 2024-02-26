import Task from "../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = new Task({ task });
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
        const taskData = await Task.findById(id)
        console.log(id)
        return res.status(200).send(taskData);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}