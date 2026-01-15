import express from "express"
import { createCourse } from "../controllers/courseController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMulter.js";
import { authorize } from "../middlewares/roleMiddleware.js";
import { getCourses } from "../controllers/courseController.js";

const courseRouter = express.Router();

courseRouter.post("/create-course", protect, upload.single("thumbnail"), authorize("instructor"), createCourse)
courseRouter.get("/get-course", getCourses)



export default courseRouter;