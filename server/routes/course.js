import express from 'express'

import formidable from 'express-formidable'

import { uploadImage, removeImage, createCourse, getSingleCourse, uploadVideo, removeVideo, addLesson,updateCourse } from '../controllers/course';
import { isInstructor, requireSignin } from '../middlewares';

const router = express.Router();

router.post("/course/upload-image" , uploadImage)
router.post("/course/remove-image" , removeImage)

router.post("/course/video-upload/:instructorId" , requireSignin,formidable(), uploadVideo )
router.post("/course/remove-video/:instructorId" , requireSignin, removeVideo )


router.post("/course" ,requireSignin, isInstructor, createCourse)
router.put("/course/:slug" ,requireSignin, updateCourse)
router.post("/course/lesson/:slug/:instructorId" ,requireSignin, addLesson)
router.get("/course/:slug" , getSingleCourse)

module.exports = router;