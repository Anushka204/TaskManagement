import mongoose from "mongoose"
import DailyScore from "./DailyScore.js"

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

const updateDailyScore = async (userId, date, changes) => {
  const dayStart = new Date(date)
  dayStart.setHours(0, 0, 0, 0)

  await DailyScore.findOneAndUpdate(
    { userId, date: dayStart },
    {
      $inc: {
        tasksTotal: changes.tasksTotal || 0,
        tasksCompleted: changes.tasksCompleted || 0,
      },
    },
    { upsert: true, new: true }
  )
}

taskSchema.post("save", async function (doc) {
  const dayStart = doc.dueDate || doc.createdAt
  const tasksCompleted = doc.status === "completed" ? 1 : 0
  await updateDailyScore(doc.userId, dayStart, {
    tasksTotal: 1,
    tasksCompleted,
  })
})

taskSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery()
  const originalDoc = await this.model.findOne(query).lean()
  this.originalDoc = originalDoc
  next()
})

taskSchema.post("findOneAndUpdate", async function (doc) {
  if (!this.originalDoc) {
    console.error("Original document not found")
    return
  }

  const {
    status: previousStatus,
    dueDate: previousDueDate,
    userId,
  } = this.originalDoc
  const previousDayStart = new Date(
    previousDueDate || this.originalDoc.createdAt
  )
  previousDayStart.setHours(0, 0, 0, 0)

  const { status: updatedStatus, dueDate: updatedDueDate } = doc
  const updatedDayStart = new Date(updatedDueDate || doc.createdAt)
  updatedDayStart.setHours(0, 0, 0, 0)

  const wasPreviouslyCompleted = previousStatus === "completed"
  const isNowCompleted = updatedStatus === "completed"

  if (wasPreviouslyCompleted && !isNowCompleted) {
    await updateDailyScore(userId, previousDayStart, {
      tasksCompleted: -1,
    })
  } else if (!wasPreviouslyCompleted && isNowCompleted) {
    await updateDailyScore(userId, updatedDayStart, {
      tasksCompleted: 1,
    })
  }
})

taskSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function (doc) {
    const { status, dueDate, userId } = doc

    const dayStart = dueDate || doc.createdAt
    const isCompleted = status === "completed"

    await updateDailyScore(userId, dayStart, {
      tasksTotal: -1,
      tasksCompleted: isCompleted ? -1 : 0,
    })
  }
)

export default mongoose.model("Task", taskSchema)
