import { StatusCodes } from 'http-status-codes';
import conn from '../mariadb.js';

export const allCategory = async(req, res) => {
    try{
        const sql = "SELECT * FROM category ORDER BY sort ";
        const [results] = await conn.query(sql);
        return res.status(StatusCodes.OK).json(results);

    }catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버 오류"
        });
    }
}
