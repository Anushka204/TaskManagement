import express from "express"
import {
  getDailyScore,
  getDailyTrend,
  getWeeklyTrend,
} from "../controllers/dailyScoreController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/", verifyToken, getDailyScore)
router.get("/daily-trend", verifyToken, getDailyTrend)
router.get("/weekly-trend", verifyToken, getWeeklyTrend)

export default router
