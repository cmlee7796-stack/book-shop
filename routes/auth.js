import express from 'express';
import {body, validationResult} from 'express-validator';
import login from '../controller/AuthController.js';

const router = express.Router();


const validate = (req, res,next) => {
    const err = validationResult(req);
    if(err.isEmpty()){
        return next();
    }else{
        return res.status(400).json(err.array());
    }
}

router
.route('/login')
.post(
    [
        body('email')
        .notEmpty()
        .withMessage('이메일은 필수입니다.')
        .isEmail()
        .withMessage('이메일 형식이 올바르지 않습니다.'),
        body('password')
        .notEmpty()
        .withMessage('비밀번호는 필수입니다.'),
        validate
    ],
    login
)

export default router;