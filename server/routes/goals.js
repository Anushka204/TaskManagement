import express from "express"
import { createGoal, deleteGoal } from "../controllers/goalController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.post("/", verifyToken, createGoal)

router.delete("/:id", verifyToken, deleteGoal)

export default router
