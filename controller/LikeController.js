import { StatusCodes } from 'http-status-codes';
import conn from '../mariadb.js';

export const addLike = async(req, res) => {
    const {userId} = req.body;
    const {bookId} = req.params;
    try{
        const sql = "INSERT  INTO likes (user_id, book_id) VALUES ( ?, ? )";
        const values = [Number(userId), Number(bookId)];
        const [results] = await conn.query(sql, values);
        return res.status(StatusCodes.OK).json(results);

    }catch (err) {
        console.error(err);

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(StatusCodes.CONFLICT).json({
                message: '이미 좋아요를 누른 책입니다.'
            });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: '서버 에러가 발생했습니다.'
        });
    }
}

export const removeLike = async(req, res) => {
    const {userId} = req.body;
    const {bookId} = req.params;
    try{
        const sql = "DELETE FROM likes WHERE user_id = ? AND book_id = ? ";
        const values = [userId, bookId];
        const [results] = await conn.query(sql, values);
        return res.status(StatusCodes.OK).json(results);

    }catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버 오류"
        });
    }
}
