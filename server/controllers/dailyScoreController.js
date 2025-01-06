import DailyScore from "../models/DailyScore.js"

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
