import express from "express"
import {
  createGoal,
  deleteGoal,
  updateGoal,
} from "../controllers/goalController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.post("/", verifyToken, createGoal)

router.delete("/:id", verifyToken, deleteGoal)

router.put("/:id", verifyToken, updateGoal)

export default router
