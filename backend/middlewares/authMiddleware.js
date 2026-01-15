import jwt from "jsonwebtoken"
import createHttpError from "http-errors"
import { User } from "../models/userModel.js"

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.header.authorization && req.header.authorization.startsWith("Bearer")) {
      token = req.header.authorization.split(" ")[1];
    }

    if (!token) {
      return next(createHttpError(401, "Unauthorized"))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return next(createHttpError(401, "Unauthorized"))
    }

    next();

  } catch (error) {
    next(error)
  }
}