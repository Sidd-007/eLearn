import express from 'express'

import formidable from 'express-formidable'

import { uploadImage, removeImage, createCourse, getSingleCourse, uploadVideo, removeVideo, addLesson,updateLesson,updateCourse, publishCourse, unpublishCourse, courses, checkEnrollment, freeEnrollment, paidEnrollment, paymentVerification, userCourses, reviewCourse, reviewCheck, reviews, categoryCourses } from '../controllers/course';
import { isInstructor, requireSignin,  } from '../middlewares';

const router = express.Router();

router.get("/courses", courses);
router.get("/reviews", reviews);

router.post("/course/upload-image" , uploadImage)
router.post("/course/remove-image" , removeImage)

router.post("/course/video-upload/:instructorId" , requireSignin,formidable(), uploadVideo )
router.post("/course/remove-video/:instructorId" , requireSignin, removeVideo )


router.post("/course" ,requireSignin, isInstructor, createCourse)
router.put("/course/:slug" ,requireSignin, updateCourse)

// router.put("/course/:slug/:lessonId" ,requireSignin, removeLesson)
router.post("/course/lesson/:slug/:instructorId" ,requireSignin, addLesson)
router.post("/course/lesson/:courseId/:lessonId", requireSignin, updateLesson);
router.get("/course/:slug" , getSingleCourse)

router.put("/course/publish/:courseId", requireSignin, publishCourse);
router.put("/course/unpublish/:courseId", requireSignin, unpublishCourse);

router.get("/check-enrollment/:courseId", requireSignin, checkEnrollment);
router.post("/free-enrollment/:courseId", requireSignin, freeEnrollment);
router.post("/paid-enrollment/:courseId", requireSignin, paidEnrollment);
router.post("/paid-enrollment/verify/:courseId", requireSignin, paymentVerification);

router.get('/user-courses', requireSignin, userCourses)
router.post('/course-review/:slug', requireSignin, reviewCourse)
router.get('/course-review-check/:slug', requireSignin, reviewCheck)

router.get('/category-courses/:slug', requireSignin, categoryCourses)
module.exports = router;