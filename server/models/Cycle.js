import mongoose from "mongoose"

const cycleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Goal" }],
  createdAt: { type: Date, default: Date.now },
  visionBoardImage: { type: String, default: "" },
})

export default mongoose.model("Cycle", cycleSchema)
