import  express  from "express";
import teacherController from "../controllers/teacherController.js"
import authTeacher from "../middleware/authTeacher.js";
import teacherValidation from "../validation/teacherValidation.js";
import questionController from "../controllers/questionController.js";
import examController from "../controllers/examController.js";
//import teacherAnalyticController from "../controllers/teacherAnalyticController.js";
//import teacherAnalyticController from "../controllers/teacherAnalyticController.js";
const router = express.Router();



router.post('/',teacherValidation.teacherValidation, teacherController.registerTeacher)
router.post('/login',authTeacher.teacherInfo,teacherController.loginTeacher)
router.get('/analytic',authTeacher.tokenVerification)
router.post('/question/:exam_id',authTeacher.tokenVerification, questionController.createQuestion);
router.get('/getExamQuiz',questionController.getAllQuestion);
router.get('/allQuiz',questionController.getAllQuestion)
router.post('/exam',authTeacher.tokenVerification,examController.createExam)
router.get('/allExam',examController.getAllExams);
router.put('/update',authTeacher.tokenVerification,teacherController.updateTeacher)
router.put('/updated/:exam_id',authTeacher.tokenVerification,examController.updateExam)
router.delete('/delete/:exam_id',authTeacher.tokenVerification,examController.deleteExam)

export default router;