import express from 'express';
import {addLike, removeLike} from '../controller/LikeController.js';

const router = express.Router();

router
.route('/:bookId')
.post(addLike)
.delete(removeLike);


export default router;