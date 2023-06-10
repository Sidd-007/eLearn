import express from 'express'
import { makeInstructor,currentAdmin, allInstructors, instructorApplication, instructorApp } from '../controllers/admin';
import { requireSignin, isAdmin } from '../middlewares';

const router = express.Router();

router.post('/admin/make-instructor', requireSignin, isAdmin, makeInstructor)
router.get('/admin/current-admin', requireSignin,isAdmin, currentAdmin)
router.get('/admin/all-instructors', requireSignin,isAdmin, allInstructors)
router.post('/admin/instructor-application/:userId', requireSignin, instructorApplication)
router.get('/admin/instructor-application/:instructorId', requireSignin, instructorApp)


module.exports = router;