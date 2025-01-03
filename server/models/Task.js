import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cycleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cycle",
    required: true,
  },
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: "Goal", required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["backlog", "todo", "in-progress", "completed"],
    default: "todo",
  },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Task", taskSchema)
