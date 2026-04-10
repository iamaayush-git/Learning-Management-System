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
      message: "Course created successfully",
      course
    })

  } catch (error) {
    console.log(error)
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

const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor")

    if (!course) {
      return next(createHttpError(404, "Course not found"))
    }

    return res.status(200).json({
      success: true,
      course
    })

  } catch (error) {
    next(error)
  }
}

const upldateCourse = async (req, res, next) => {
  try {
    const { title, description, price, category, published } = req.body;
    const thumbnail = req.file ? req.file.path : null;
    const courseId = req.params.id;

    const course = await Course.findById(courseId);

    if (!course) {
      return next(createHttpError(404, "Course not found"))
    }

    if (req.user._id.toString() !== course.instructor.toString()) {
      return next(createHttpError(403, "You are not authorized to update this course"))
    }

    if (thumbnail) {
      // Delete old thumbnail from cloudinary
      const publicId = course.thumbnail.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`course_thumbnail/${publicId}`);

      // Upload new thumbnail
      const result = await cloudinary.uploader.upload(thumbnail, {
        folder: "course_thumbnail"
      });
      fs.unlinkSync(thumbnail);
      course.thumbnail = result.secure_url;
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price || course.price;
    course.category = category || course.category;
    course.published = published !== undefined ? published : course.published;

    await course.save();

    return res.status(200).json({
      success: true,
      course
    });
  } catch (error) {
    next(error)
  }
}

const deleteCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return next(createHttpError(404, "Course not found"));
    }

    if (req.user._id.toString() !== course.instructor.toString()) {
      return next(createHttpError(403, "You are not authorized to delete this course"));
    }

    // Delete thumbnail from cloudinary
    const publicId = course.thumbnail.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`course_thumbnail/${publicId}`);

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully"
    });


  } catch (error) {
    next(error);
  }
}

export { createCourse, getCourses, getCourseById, upldateCourse }