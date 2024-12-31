import express from "express"
import mongoose from "mongoose"
import passport from "passport"
import cors from "cors"
import morgan from "morgan"
import "./passport/passport.js"
import configs from "./config/config.js"
import authRoutes from "./routes/auth.js"
import cycleRoutes from "./routes/cycles.js"
import goalRoutes from "./routes/goals.js"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(passport.initialize())

// Connect to MongoDB
mongoose.connect(configs.dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))
db.once("open", () => {
  console.log("Connected to MongoDB")
})

// Routes
app.use("/auth", authRoutes)
app.use("/api/cycles", cycleRoutes)
app.use("/api/goals", goalRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
