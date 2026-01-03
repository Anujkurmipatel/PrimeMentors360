import express from "express";
import {
  createQuiz,
  getCourseQuizzes,
  getQuizById,
} from "../controllers/quiz.controller.js";
import { isLoggedIn, isInstructor } from "../middlewares/auth.middlewares.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/create",
  isLoggedIn,
  isInstructor,
  upload.single("document"),
  createQuiz
);

router.get("/course/:courseId", isLoggedIn, getCourseQuizzes);
router.get("/:quizId", isLoggedIn, getQuizById);

export default router;
