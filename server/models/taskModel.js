import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId ,
    ref : "User",
    required : true 
  },
  task: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
