import express from "express"
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/", verifyToken, getTasks)
router.post("/", verifyToken, createTask)
router.delete("/:id", verifyToken, deleteTask)
router.put("/:id", verifyToken, updateTask)

export default router
