import Cycle from "../models/Cycle.js"

export const getCycles = async (req, res) => {
  try {
    const userId = req.user.userId
    const cycles = await Cycle.find({ userId }).populate({
      path: "goals",
      populate: {
        path: "tactics",
        model: "Tactic",
      },
    })
    res.status(200).json(cycles)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createCycle = async (req, res) => {
  try {
    const { title, description, startDate, endDate, goals } = req.body

    const newCycle = new Cycle({
      userId: req.user.userId,
      title,
      description,
      startDate,
      endDate,
      goals,
    })

    await newCycle.save()
    res.status(201).json(newCycle)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteCycle = async (req, res) => {
  try {
    const cycleId = req.params.id
    const cycle = await Cycle.findOneAndDelete({
      _id: cycleId,
      userId: req.user.id,
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
