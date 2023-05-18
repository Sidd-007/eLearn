import express from 'express'
import { makeAdmin,currentAdmin } from '../controllers/admin';
import { requireSignin } from '../middlewares';

const router = express.Router();

router.post('/make-admin', requireSignin, makeAdmin)
router.get('/current-admin', requireSignin, currentAdmin)

module.exports = router;