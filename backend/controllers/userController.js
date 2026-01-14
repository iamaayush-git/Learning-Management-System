import User from "../models/userModel.js"
import createError from "http-errors"
import bcrypt from "bcrypt"

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, bio } = req.body;

    if (!name || !email || !password || !role || !bio) {
      return next(createError(400, "All fields are required"))
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(400, "User already exists"))
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await user.create({
      name,
      email,
      password: hashedPassword,
      role,
      profile: {
        bio
      }
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

