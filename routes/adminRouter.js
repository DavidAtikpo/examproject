import express from "express"
import adminController from "../controllers/adminController.js"
import authAdmin from "../middleware/authAdmin.js";

const router= express.Router();

router.post('/', adminController.registerAdmin);
router.post('/login',authAdmin.adminInfo,adminController.loginAdmin)
router.get('/allstudent',adminController.getAllStudent)
router.get('/allteacher',adminController.getAllTeacher)



export default router;