import Goal from "../models/Goal.js"
import Cycle from "../models/Cycle.js"
import Tactic from "../models/Tactic.js"

export const createGoal = async (req, res) => {
  try {
    const { cycleId, title, description, tactics, status } = req.body

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
      status,
    })

    await newGoal.save()

    const createdTactics = await Promise.all(
      tactics.map(async (tactic) => {
        const newTactic = new Tactic({
          goalId: newGoal._id,
          title: tactic.title,
          description: tactic.description,
          userId: req.user.userId,
        })
        await newTactic.save()
        return newTactic._id
      })
    )

    newGoal.tactics = createdTactics
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

export const deleteGoal = async (req, res) => {
  try {
    const goalId = req.params.id
    const goal = await Goal.findOneAndDelete({
      _id: goalId,
      userId: req.user.userId,
    })

    await Cycle.findOneAndUpdate(
      { _id: goal.cycleId, userId: req.user.userId },
      { $pull: { goals: goalId } },
      { new: true }
    )

    if (!goal) {
      return res
        .status(404)
        .json({ message: "Goal not found or not authorized" })
    }
    res.status(200).json({ message: "Goal deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateGoal = async (req, res) => {
  try {
    const goalId = req.params.id
    const goal = await Goal.findOneAndUpdate(
      { _id: goalId, userId: req.user.userId },
      req.body,
      { new: true }
    )

    if (!goal) {
      return res
        .status(404)
        .json({ message: "Goal not found or not authorized" })
    }
    res.status(200).json({ message: "Goal updated successfully", goal })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
