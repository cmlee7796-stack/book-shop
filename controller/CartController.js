import { StatusCodes } from 'http-status-codes';
import conn from '../mariadb.js';

export const addToCart = async (req, res) => {
    const {bookId, quantity , userId} = req.body;
    
    try{
        const sql = "INSERT  INTO cartItems (book_id, quantity, user_id) VALUES ( ?, ? , ? )";
        const values = [Number(bookId), quantity, Number(userId)];
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
};

export const getCartItems = async (req, res) =>{
    const {userId, selected} = req.body;
    
    try{
        let sql = `SELECT ci.id, book_id, title, summary, quantity, price 
                    FROM cartItems ci LEFT JOIN books  b
                    ON ci.book_id = b.id
                    WHERE ci.user_id = ? AND ci.id IN (?)`;

        let values = [Number(userId), selected];            
        const [results] = await conn.query(sql, values);
        return res.status(StatusCodes.OK).json(results);
    }catch(err){
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: '서버 에러가 발생했습니다.'
        });
    }
};

export const removeCartItem = async(req, res) => {
    const {id} = req.body;

    try{
        let sql = 'DELETE FROM cartItems WHERE id = ? ';
        let values = [id];
        const results = await conn.query(sql, values);
        return res.status(StatusCodes.OK).json(results);
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : '서버 에러가 발생했습니다.'
        });
    }
};


