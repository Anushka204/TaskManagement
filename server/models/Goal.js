import mongoose from "mongoose"

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cycleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cycle",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["backlog", "todo", "in-progress", "completed"],
    default: "todo",
  },
  tactics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tactic" }],
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Goal", goalSchema)
