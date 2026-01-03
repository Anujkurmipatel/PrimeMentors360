import Quiz from "../models/quiz.model.js";

export const createQuiz = async (req, res) => {
  try {
    // 1. Debugging: Check what the middleware attached to the request
    // If this logs 'undefined', your middleware isn't working.
    // If it logs an object, look for 'id' vs '_id'.
    console.log("Logged in User Data:", req.user);

    const { courseId, questions } = req.body;

    // 2. Safety Check: Ensure user is actually logged in
    if (!req.user) {
        return res.status(401).json({ success: false, message: "User authentication failed" });
    }

    // 3. Fix: Get the ID (Handle both 'id' and '_id' cases)
    const userId = req.user.id || req.user._id;

    if(!userId){
         return res.status(400).json({ success: false, message: "User ID missing from token" });
    }

    const parsedQuestions =
      typeof questions === "string"
        ? JSON.parse(questions)
        : questions;

    if (!courseId || !parsedQuestions?.length) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid quiz data" });
    }

    let document = {};
    if (req.file) {
      document = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    const quiz = await Quiz.create({
      course: courseId,
      questions: parsedQuestions,
      document,
      // 4. Use the extracted variable
      createdBy: userId, 
    });

    res.status(201).json({ success: true, quiz });
  } catch (err) {
    console.error("Quiz Create Error:", err); // Log the full error to console
    res.status(500).json({ success: false, message: err.message });
  }
};

// ... keep getCourseQuizzes and getQuizById as they are ...
export const getCourseQuizzes = async (req, res) => {
  const quizzes = await Quiz.find({ course: req.params.courseId });
  res.json({ success: true, quizzes });
};

export const getQuizById = async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId);
  if (!quiz)
    return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, quiz });
};