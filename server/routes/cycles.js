import express from "express"
import {
  getCycles,
  createCycle,
  deleteCycle,
} from "../controllers/cycleController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/", verifyToken, getCycles)

router.post("/", verifyToken, createCycle)

router.delete("/:id", verifyToken, deleteCycle)

export default router
