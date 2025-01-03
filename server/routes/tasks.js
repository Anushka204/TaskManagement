import express from "express"
import { getTasks, createTask } from "../controllers/taskController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/tasks", verifyToken, getTasks)
router.post("/tasks", verifyToken, createTask)

export default router
