import express from 'express';
const router = express.Router();
import { verifyUser } from '../middleware/verifyUser.js'
import upload from '../middleware/multer.js'
import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from '../controllers/Post.js'

router.post('/addpost', verifyUser, upload.single('image'), addNewPost)
router.get('/all', verifyUser, getAllPost)
router.get('/userpost/all', verifyUser, getUserPost);
router.post('/:id/like', verifyUser, likePost);
router.post('/:id/dislike', verifyUser, dislikePost);
router.post('/:id/comment', verifyUser, addComment);
router.get('/:id/comment/all', verifyUser, getCommentsOfPost);
router.delete('/delete/:id', verifyUser, deletePost);
router.post('/:id/bookmark', verifyUser, bookmarkPost);



export default router;