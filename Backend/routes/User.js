import express from 'express';
const router = express.Router();
import { editProfile, followOrUnfollow, getProfile, getSuggestedUsers } from '../controllers/User.js'
import { verifyUser } from '../middleware/verifyUser.js'
import upload from '../middleware/multer.js'

router.get('/:id/profile', verifyUser, getProfile)
router.post('/profile/edit', verifyUser, upload.single('profilePicture'),editProfile)
router.get('/suggested', verifyUser, getSuggestedUsers)
router.post('/followorunfollow/:id', verifyUser, followOrUnfollow)

export default router;