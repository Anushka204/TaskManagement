import Cycle from "../models/Cycle.js"
import Goal from "../models/Goal.js"
import cycleBlueprint from "../blueprints/cycleBlueprint.js"

export const getCycles = async (req, res) => {
  try {
    const userId = req.user.userId
    const cycles = await Cycle.find({ userId }).populate("goals")

    const data = cycles.map((cycle) => {
      return cycleBlueprint(cycle)
    })

    res.send(data).status(200)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createCycle = async (req, res) => {
  try {
    const { title, description, startDate, endDate, goals, visionBoardImage } =
      req.body

    const newCycle = new Cycle({
      userId: req.user.userId,
      title,
      description,
      startDate,
      endDate,
      goals,
      visionBoardImage,
    })

    await newCycle.save()
    res.send(cycleBlueprint(newCycle)).status(201)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteCycle = async (req, res) => {
  try {
    const cycleId = req.params.id
    const cycle = await Cycle.findOneAndDelete({
      _id: cycleId,
      userId: req.user.userId,
    })

    if (!cycle) {
      return res
        .status(404)
        .json({ message: "Cycle not found or not authorized" })
    }

    res.status(200).json({ message: "Cycle deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateCycle = async (req, res) => {
  try {
    const cycleId = req.params.id
    const cycle = await Cycle.findOneAndUpdate(
      { _id: cycleId, userId: req.user.userId },
      req.body,
      { new: true }
    ).populate("goals")

    if (!cycle) {
      return res
        .status(404)
        .json({ message: "Cycle not found or not authorized" })
    }

    res.send(cycleBlueprint(cycle)).status(200)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
