import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
import conn from '../mariadb.js';

dotenv.config();

const login = async (req, res)=>{
    const {email, password} = req.body;
    
    try{
        console.log(email)        ;
        let sql ="SELECT * FROM users WHERE email = ? ";
        let values = [email];
        const [results] = await conn.query(sql, values);
                       
        let loginUser = results[0];
        if(loginUser){
            const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 100000, 64, 'sha512').toString('base64');

            if(loginUser.password == hashPassword){
                const token = jwt.sign({
                    email : loginUser.email,
                    password : loginUser.password
                }, process.env.JWT_SECRET,{
                    expiresIn :'30m',
                    issuer : 'cmlee'
                })

                res.cookie("token", token,{
                    httpOnly : true
                });
                res.status(StatusCodes.OK).json({
                    messsage : `${loginUser.email}님 로그인 되었습니다.`
                });
            }else{
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message : '인증하지 못했습니다'
                })
            }
        }else{
            return res.status(StatusCodes.NOT_FOUND).json({
                    message : '해당정보가 없습니다.'
                })
        }
            
    }catch(err){
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: `서버 오류`
        });

    }
}

export default login;