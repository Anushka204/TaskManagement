import Task from "../models/Task.js"
import Goal from "../models/Goal.js"

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.userId
    const { dueDate, sortBy = "createdAt", order = "asc" } = req.query
    const startOfDay = new Date(dueDate)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(dueDate)
    endOfDay.setHours(23, 59, 59, 999)

    const sortOrder = order === "desc" ? -1 : 1

    const tasks = await Task.find({
      userId,
      dueDate: { $gte: startOfDay, $lt: endOfDay },
    }).sort({ [sortBy]: sortOrder })

    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, goalId, dueDate, cycleId, status } = req.body

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
      status
    })

    await newTask.save()

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user.userId },
      req.body,
      { new: true }
    )

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" })
    }

    res.status(200).json({ message: "Task updated successfully", task })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await Task.findOneAndDelete({
      _id: taskId,
      userId: req.user.userId,
    })

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" })
    }

    res.status(200).json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
