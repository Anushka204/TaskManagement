import mongoose from "mongoose"
import Cycle from "../models/Cycle.js"
import Goal from "../models/Goal.js"
import configs from "../config/config.js"

async function updateCycleGoals() {
  try {
    await mongoose.connect(configs.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connected to MongoDB")

    const cycles = await Cycle.find({})

    for (const cycle of cycles) {
      const goals = await Goal.find({ cycleId: cycle._id })
      cycle.goals = goals.map((g) => g._id)
      await cycle.save()
    }

    console.log("Cycle goals updated successfully")
  } catch (error) {
    console.error("Error occurred:", error)
  } finally {
    await mongoose.connection.close()
    console.log("Database connection closed")
  }
}

await updateCycleGoals()
