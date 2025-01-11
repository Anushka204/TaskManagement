import DailyScore from "../models/DailyScore.js"
import Cycle from "../models/Cycle.js"

export const getDailyScore = async (req, res) => {
  try {
    const userId = req.user.userId
    const { date } = req.query
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const dailyScore = await DailyScore.findOneAndUpdate(
      { userId, date: startOfDay },
      { $setOnInsert: { userId, date: startOfDay } },
      { upsert: true, new: true }
    )

    res.status(200).json(dailyScore)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error fetching or creating daily score" })
  }
}

export const getDailyTrend = async function (req, res) {
  try {
    const userId = req.user.userId
    const { cycleId } = req.query

    const cycle = await Cycle.findById(cycleId)
    const startOfDay = new Date(cycle.startDate)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(cycle.endDate)
    endOfDay.setHours(23, 59, 59, 999)

    const dailyScores = await DailyScore.find({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ date: 1 })

    res.status(200).json(dailyScores)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error fetching daily score trend" })
  }
}

export const getWeeklyTrend = async function (req, res) {
  try {
    const userId = req.user.userId
    const { cycleId } = req.query

    const cycle = await Cycle.findById(cycleId)
    const startOfDay = new Date(cycle.startDate)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(cycle.endDate)
    endOfDay.setHours(23, 59, 59, 999)

    const dailyScores = await DailyScore.find({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ date: 1 })

    const batchSize = 7
    const batches = []
    for (let i = 0; i < dailyScores.length; i += batchSize) {
      batches.push(dailyScores.slice(i, i + batchSize))
    }

    const batchAverages = batches.map((batch) => {
      const totalScore = batch.reduce(
        (sum, score) => sum + score.executionScore,
        0
      )
      return totalScore / batch.length
    })

    res.status(200).json(batchAverages)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error fetching daily score trend" })
  }
}
