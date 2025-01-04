import express from "express"
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/tasks", verifyToken, getTasks)
router.post("/tasks", verifyToken, createTask)
router.delete("/tasks/:id", verifyToken, deleteTask)
router.put("/tasks/:id", verifyToken, updateTask)

export default router
