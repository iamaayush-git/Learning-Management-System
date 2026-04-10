import express from "express"
import { createCourse, getCourseById, upldateCourse } from "../controllers/courseController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMulter.js";
import { authorize } from "../middlewares/roleMiddleware.js";
import { getCourses } from "../controllers/courseController.js";

const courseRouter = express.Router();

courseRouter.post("/create-course", protect, upload.single("thumbnail"), authorize("instructor"), createCourse)
courseRouter.get("/get-courses", getCourses)
courseRouter.get("/get-course/:id", getCourseById)
courseRouter.post("/update-course/:id", protect, authorize("instructor"), upload.single("thumbnail"), upldateCourse)
courseRouter.delete("/delete-course/:id", protect, authorize("instructor"))





export default courseRouter;