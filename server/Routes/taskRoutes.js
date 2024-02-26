import express from "express";
const router = express.Router();
import {
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers.js";
import Auth from "../middleware/authMiddleware.js";

router.get("/:id",Auth , getTasksById);
router.post("/create",Auth , createTask);
router.put("/update/:id",Auth , updateTask);
router.delete("/delete/:id",Auth , deleteTask);

export default router;
