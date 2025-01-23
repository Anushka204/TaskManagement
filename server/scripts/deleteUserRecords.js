import mongoose from "mongoose"
import Cycle from "../models/Cycle.js"
import Goal from "../models/Goal.js"
import Task from "../models/Task.js"
import DailyScore from "../models/DailyScore.js"
import Tactic from "../models/Tactic.js"
import configs from "../config/config.js"

const USER_ID = "677773cf34e2b6be66ba901d"

async function deleteUserRecords(userId) {
  try {
    await mongoose.connect(configs.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connected to MongoDB")

    await Task.deleteMany({ userId })
    await Tactic.deleteMany({ userId })
    await Goal.deleteMany({ userId })
    await Cycle.deleteMany({ userId })
    await DailyScore.deleteMany({ userId })

    console.log("All records for the user have been deleted successfully")
  } catch (error) {
    console.error("Error occurred while deleting user records:", error)
  } finally {
    await mongoose.connection.close()
    console.log("Database connection closed")
  }
}

await deleteUserRecords(USER_ID)
