import express from "express"
import {
  getGoals,
  createGoal,
  deleteGoal,
  updateGoal,
} from "../controllers/goalController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/", verifyToken, getGoals)

router.post("/", verifyToken, createGoal)

router.delete("/:id", verifyToken, deleteGoal)

router.put("/:id", verifyToken, updateGoal)

export default router
