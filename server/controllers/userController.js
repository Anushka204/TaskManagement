import User from "../models/User.js"

export const getUser = async (req, res) => {
  try {
    const userId = req.user.userId
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
