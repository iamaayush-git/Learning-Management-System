import createHttpError from "http-errors";

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(createHttpError(403, "You are not authorized to perform this action"))
    }
    next()
  }
}

