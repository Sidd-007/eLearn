import express from 'express'

import { uploadImage, removeImage, createCourse } from '../controllers/course';
import { isAdmin, requireSignin } from '../middlewares';

const router = express.Router();

router.post("/course/upload-image" , uploadImage)
router.post("/course/remove-image" , removeImage)


router.post("/course" ,requireSignin, isAdmin, createCourse)

module.exports = router;