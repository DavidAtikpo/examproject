
import express from 'express'
import studentController from '../controllers/studentController.js'
import authUser from '../middleware/authUser.js';
import studentValidation from '../validation/studentValidation.js';
import questionController from '../controllers/questionController.js';
import answerControlleer from '../controllers/answerControlleer.js';
import profilePicture from "../controllers/profilePicture.js";
//import authController from '../controllers/authController.js';

const router = express.Router();


router.post('/',studentValidation.studentValidation, studentController.registerStudent)
router.post('/login',authUser.studentInfo,studentController.loginStudent)
router.put('/',authUser.tokenVerification,studentController.updateStudent)
router.post('/forget',studentController.forgetPassword)
router.post('/reset-password',studentController.resetPassword)
router.get('/getExamQuiz',authUser.tokenVerification,questionController.getExamQuestion);
router.post('/:question_id',authUser.tokenVerification,answerControlleer.answerQuestion)
//router.post('/refreshtoken',authUser.tokenVerification,authController.refreshToken)
router.post("/picture",profilePicture.upload)
export default router