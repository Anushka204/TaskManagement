import express from "express"
import {
  getCycles,
  createCycle,
  deleteCycle,
  updateCycle,
} from "../controllers/cycleController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/", verifyToken, getCycles)

router.post("/", verifyToken, createCycle)

router.delete("/:id", verifyToken, deleteCycle)

router.put("/:id", verifyToken, updateCycle)

export default router
