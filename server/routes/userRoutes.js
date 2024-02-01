import express from 'express';
import { handlesaveDetails,checkUniqueness } from '../controllers/userController.js';
const router = express.Router();

router.post('/checkUniqueness',checkUniqueness)
router.post('/saveDetails',handlesaveDetails)

export default router;