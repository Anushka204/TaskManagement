import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import passport from "passport"
import User from "../models/User.js"
import { verifyToken } from "../middleware/auth.js"
import configs from "../config/config.js"

const router = Router()

// Google authentication route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, send a token
    const token = jwt.sign(
      { userId: req.user._id, username: req.user.username },
      "secretKey"
    )
    res.redirect(`${configs.googleAuthClientSuccessURL}/success?token=${token}`)
  }
)

export default router
