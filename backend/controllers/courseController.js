import createHttpError from "http-errors";
import { Course } from "../models/CourseModel.js"
import cloudinary from "../config/cloudinaryConfig.js"
import fs from "fs"


const createCourse = async (req, res, next) => {
  try {
    const { title, description, price, category } = req.body;
    const thumbnail = req.file ? req.file.path : null;


    if (!title || !description || !category) {
      return next(createHttpError(400, "All fields are required"))
    }

    if (!thumbnail) {
      next(createHttpError(400, "Thumbnail is required"))
    }
    const result = await cloudinary.uploader.upload(thumbnail, {
      folder: "course_thumbnail"
    })

    // delete local file
    fs.unlinkSync(thumbnail)

    const course = await Course.create({
      title,
      description,
      price: price || 0,
      category,
      thumbnail: result.secure_url,
      instructor: req.user._id
    })

    return res.status(201).json({
      success: true,
      course
    })

  } catch (error) {
    next(error)
  }
}

const getCourses = async (req, res, next) => {
  try {
    const courses = (await Course.find({ published: true }).populate("instructor")).sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      courses
    })


  } catch (error) {
    next(error)
  }
}


export { createCourse, getCourses }