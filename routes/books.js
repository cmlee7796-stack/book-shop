import express from 'express';
import { body, query, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import {allBooks, detailBook} from '../controller/BookController.js';

const router = express.Router();

const validate = (req, res,next) => {
    const err = validationResult(req);
    if(err.isEmpty()){
        return next();
    }else{
        return res.status(StatusCodes.BAD_REQUEST).json(err.array());
    }
}


router
.route('/')
.get(
    [
        query('categoryId')
        .optional()
        .isInt().withMessage('categoryId는 숫자여야 합니다')
    ],
    validate,    
    allBooks
);


router
.route('/:bookId')
.get(
    [
        param('bookId')
        .optional()
        .isInt().withMessage('id는 숫자여야 합니다')
    ],
    validate,
    detailBook
);


export default router;