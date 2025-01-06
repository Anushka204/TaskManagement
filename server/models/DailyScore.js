import mongoose from "mongoose"

const dailyScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  executionScore: { type: Number, required: true, default: 0 },
  tasksCompleted: { type: Number, default: 0 },
  tasksTotal: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

dailyScoreSchema.post("save", function (doc) {
  if (doc.tasksTotal > 0) {
    doc.executionScore = (doc.tasksCompleted / doc.tasksTotal) * 100
  } else {
    doc.executionScore = 0
  }

  doc.save()
})

dailyScoreSchema.post("findOneAndUpdate", async function (doc) {
  if (!doc) {
    console.error("Document not found")
    return
  }

  const tasksTotal = doc.tasksTotal || 0
  const tasksCompleted = doc.tasksCompleted || 0

  if (tasksTotal > 0) {
    doc.executionScore = (tasksCompleted / tasksTotal) * 100
  } else {
    doc.executionScore = 0
  }

  await doc.save()
})

export default mongoose.model("DailyScore", dailyScoreSchema)
