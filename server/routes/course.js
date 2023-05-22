import express from 'express'

import { uploadImage, removeImage, createCourse, getSingleCourse } from '../controllers/course';
import { isInstructor, requireSignin } from '../middlewares';

const router = express.Router();

router.post("/course/upload-image" , uploadImage)
router.post("/course/remove-image" , removeImage)


router.post("/course" ,requireSignin, isInstructor, createCourse)
router.get("/course/:slug" , getSingleCourse)

module.exports = router;