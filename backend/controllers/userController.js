import { User } from "../models/userModel.js"
import createError from "http-errors"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return next(createError(400, "All fields are required"))
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(400, "User already exists"))
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    })

    return res.status(201).json({
      success: true,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.profile.bio,
      picture: user.profile.picture,
      _id: user._id
    })
  } catch (error) {
    return next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, "All fields are required"))
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(400, "User does not exist"))
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(400, "Incorrect password"))
    }

    res.json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.profile.bio,
      picture: user.profile.picture,
      token: generateToken(user._id)
    })
  } catch (error) {
    next(error)
  }
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  })
}

export { registerUser, loginUser }