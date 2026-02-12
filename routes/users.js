import express from 'express';
import {body, validationResult} from 'express-validator';
import userController from '../controller/UserController.js';

const router = express.Router();

const validate = (req, res,next) => {
    const err = validationResult(req);
    if(err.isEmpty()){
        return next();
    }else{
        return res.status(400).json(err.array());
    }
}

const validatePassword = (req, res, next) =>{
    const {password} = req.body;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(!passwordRegex.test(password)){
        return res.status(400).json({message: '비밀번호는 최소 8자, 하나 이상의 문자, 숫자, 특수문자를 포함해야 합니다.'});
    }else{
        return next();
    }
}
router
.route('/')
.post(
    [    
        body('email')
            .notEmpty().withMessage('이메일은 필수입니다')
            .isEmail().withMessage('이메일 형식이 아닙니다.'),
        body('password')
        .notEmpty().withMessage('비밀번호는 필수입니다'),
        validate,
        validatePassword
    ]
    , userController.join);

router
.route('/me/password')
.post(
    [
        body('email')
        .notEmpty().withMessage('이메일은 필수입니다.')
        .isEmail().withMessage('이메일 형식이 아닙니다'),
        validate
    ]
    ,userController.passwordResetRequest
)
.put(
    [    
        body('email')
            .notEmpty().withMessage('이메일은 필수입니다')
            .isEmail().withMessage('이메일 형식이 아닙니다.'),
        body('password')
        .notEmpty().withMessage('비밀번호는 필수입니다'),
        validate,
        validatePassword
    ]
    , userController.passwordReset);


export default router;