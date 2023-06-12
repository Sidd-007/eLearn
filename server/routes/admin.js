import express from 'express'
import { makeInstructor,currentAdmin, allInstructors, instructorApplication, instructorApp, updateUserRole, getInstructorRole } from '../controllers/admin';
import { requireSignin, isAdmin } from '../middlewares';

const router = express.Router();

router.post('/admin/make-instructor', requireSignin, isAdmin, makeInstructor)
router.get('/admin/current-admin', requireSignin,isAdmin, currentAdmin)
router.get('/admin/all-instructors', requireSignin,isAdmin, allInstructors)
router.post('/admin/instructor-application/:userId', requireSignin, instructorApplication)
router.get('/admin/instructor-application/:instructorId', requireSignin, instructorApp)
router.put('/admin/users/:userId/role', requireSignin, isAdmin, updateUserRole);
router.get('/admin/users/:instructorId/role', requireSignin, isAdmin, getInstructorRole);

module.exports = router;