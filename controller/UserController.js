import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';
import conn from '../mariadb.js';

const join = async (req, res)=>{
    const {email, password} = req.body;

    try{
        const salt = crypto.randomBytes(64).toString('base64');
        const hashPassword = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('base64');


        let sql ="INSERT INTO users (email, password,salt ) VALUES (?,?,? )";
        let values = [email, hashPassword,salt];
        await conn.query(sql, values);
        return res.status(StatusCodes.CREATED).json({
            message: "회원가입 성공"
        });
    }catch(err){
        if(err.code === 'ER_DUP_ENTRY'){
            return res.status(StatusCodes.CONFLICT).json({
                message: '이미 가입된 이메일입니다.'
            });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: `서버 오류`
        });

    }
}

const passwordResetRequest = async (req, res)=>{
    const {email} = req.body;

    try{
        const sql ="SELECT * FROM users WHERE email = ? ";
        const values = [email];
        const [results] = await conn.query(sql, values);
                       
        const user = results[0];
        if(user){
            res.status(StatusCodes.OK).json({
                email : user.email
            });
        }else{
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message : '인증하지 못했습니다'
            })
        }
            
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: `서버 오류`
        });

    }
}

const passwordReset = async (req, res)=>{
    const {email, password} = req.body;

    try{
        const salt = crypto.randomBytes(64).toString('base64');
        const hashPassword = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('base64');
        
        let sql ="UPDATE users SET password = ?, salt = ?  WHERE email = ?";
        let values = [hashPassword, salt, email];
        await conn.query(sql, values);
        return res.status(StatusCodes.OK).json({
            message: "비밀번호 변경 성공"
        });
    }catch(err){

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: `서버 오류`
        });

    }
}

export default {join, passwordResetRequest, passwordReset};

