import Task from "../models/Task.js"
import Goal from "../models/Goal.js"

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.userId
    const { status, sortBy = "createdAt", order = "asc" } = req.query

    const sortOrder = order === "desc" ? -1 : 1

    const tasks = await Task.find({ userId }).sort({ [sortBy]: sortOrder })

    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, goalId, dueDate, cycleId } = req.body

    if (!title || !goalId) {
      return res.status(400).json({ message: "Title and goalId are required" })
    }

    const goal = await Goal.findById(goalId)
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" })
    }

    const newTask = new Task({
      userId: req.user.userId,
      title,
      dueDate,
      goalId,
      cycleId,
    })

    await newTask.save()

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
