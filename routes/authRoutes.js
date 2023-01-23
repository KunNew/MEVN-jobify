import express from 'express'
import { login, register, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import apiLimiter from "../utils/apiLimit.js";
const router = express.Router();


router.route(`/register`).post(apiLimiter,register)

router.route(`/login`).post(apiLimiter,login)

router.route(`/updateUserProfile`).put(protect, updateUserProfile)

export default router;