import express from 'express'
import { login, register, logout, currentUser, sendTestEmail, forgotPassword, resetPassword } from '../controllers/auth';
import { requireSignin } from '../middlewares';
import upload from '../middlewares/upload';

const router = express.Router();

router.post("/register" , upload.single("image"), register)
router.post("/login" , login)
router.get("/logout" , logout)
router.get('/current-user', requireSignin, currentUser)

router.get('/send-email', sendTestEmail)

router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
module.exports = router;