import mongoose from "mongoose"

const dailyScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  executionScore: { type: Number, required: true },
  tasksCompleted: { type: Number, default: 0 },
  tasksTotal: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("DailyScore", dailyScoreSchema)
