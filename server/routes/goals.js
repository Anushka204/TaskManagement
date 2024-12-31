import express from "express"
import { createGoal } from "../controllers/goalController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.post("/", verifyToken, createGoal)

export default router
