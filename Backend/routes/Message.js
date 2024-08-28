import express from 'express';
const router = express.Router();
import { verifyUser } from '../middleware/verifyUser.js'
import { getMessage, sendMessage } from '../controllers/Message.js'
import upload from '../middleware/multer.js'

router.post('/send/:id', verifyUser, sendMessage)
router.post('/all/:id', verifyUser, getMessage)


export default router;