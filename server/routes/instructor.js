import express from 'express'
import { makeInstructor,currentInstructor, instructorCourses, studentCount } from '../controllers/instructor';
import { requireSignin } from '../middlewares';

const router = express.Router();

// router.post('/make-instructor', requireSignin, makeInstructor)
router.get('/current-instructor', requireSignin, currentInstructor)

router.get('/instructor-courses', requireSignin, instructorCourses)
router.get('/instructor/student-count', requireSignin, studentCount)

module.exports = router;