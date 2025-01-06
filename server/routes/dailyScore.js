import express from "express"
import { getDailyScore } from "../controllers/dailyScoreController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/", verifyToken, getDailyScore)

export default router
