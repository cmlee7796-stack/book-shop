import express from 'express';
import {query, validationResult}  from 'express-validator';
import {allCategory} from '../controller/CategoryController.js';

const router = express.Router();

router
.route('/')
.get(
    allCategory);



export default router;