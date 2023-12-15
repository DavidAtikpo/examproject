import express from 'express'
import authUser from '../middleware/authUser.js';
import authController from '../controllers/authController.js';


const router = express.Router();

router.get('/refreshtoken',authController.handleRefreshToken)





export default router