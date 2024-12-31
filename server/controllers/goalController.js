import Goal from "../models/Goal.js"
import Cycle from "../models/Cycle.js"

export const createGoal = async (req, res) => {
  try {
    const { cycleId, title, description } = req.body

    if (!cycleId || !title) {
      return res
        .status(400)
        .json({ message: "Cycle ID and title are required" })
    }

    const cycle = await Cycle.findOne({ _id: cycleId, userId: req.user.userId })
    if (!cycle) {
      return res
        .status(404)
        .json({ message: "Cycle not found or not authorized" })
    }

    const newGoal = new Goal({
      userId: req.user.userId,
      cycleId,
      title,
      description,
    })

    await newGoal.save()

    cycle.goals.push(newGoal._id)
    await cycle.save()

    res
      .status(201)
      .json({ message: "Goal created and added to cycle", goal: newGoal })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
