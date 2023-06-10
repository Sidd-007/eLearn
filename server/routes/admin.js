import express from 'express'
import { makeInstructor,currentAdmin, allInstructors, instructorApplication } from '../controllers/admin';
import { requireSignin, isAdmin } from '../middlewares';

const router = express.Router();

router.post('/admin/make-instructor', requireSignin, isAdmin, makeInstructor)
router.get('/admin/current-admin', requireSignin,isAdmin, currentAdmin)
router.get('/admin/all-instructors', requireSignin,isAdmin, allInstructors)
router.post('/admin/instructor-application/:userId', requireSignin, instructorApplication)


module.exports = router;