import express from "express"
import adminController from "../controllers/adminController.js";
import superAdminController from "../controllers/superAdminController.js";
import authSuperAdmin from "../middleware/authSuperAdmin.js";

const router= express.Router();

router.post('/',adminController.registerAdmin)
router.post('/login',authSuperAdmin.superAdminInfo, superAdminController.loginSuperAdmin)
router.get('/allstudent',superAdminController.getAllAdmin)
router.get('/allteacher',superAdminController.getAllTeacher)
router.get('/allstudent',superAdminController.getAllStudent)
router.put('/updated',superAdminController.updateSuperAdmin)
router.post('/surper',superAdminController.registerSuperAdmin)


export default router;