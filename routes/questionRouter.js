import questionController from "../controllers/questionController.js";
import  Express  from "express";
import authTeacher from "../middleware/authTeacher.js";

const router = Express.Router();

router.post('/question/exam_id', questionController.createQuestion)




export default router;