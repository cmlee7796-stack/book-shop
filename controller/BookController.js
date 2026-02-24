import { StatusCodes } from 'http-status-codes';
import conn from '../mariadb.js';


export const allBooks = async (req, res) =>{
    try{
        const {categoryId, newBook, limitPage, currentPage} = req.query;

        let offset = limitPage *(currentPage-1);

        let sql =`SELECT *, 
        (SELECT count(*) FROM likes WHERE b.id=book_id) AS likes 
        FROM books b 
        LEFT JOIN category c ON b.category_id=c.id 
        WHERE 1=1 `;
        let values = [];
        if(categoryId){
            sql += " AND category_id = ? ";
            values.push(categoryId);
        }
        if(newBook){
            sql += " AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW() ";
        }

        if(limitPage && currentPage){
            sql +=" LIMIT ? OFFSET  ?" ;
            values.push(Number(limitPage));
            values.push(offset);
        }
        console.log(sql);
        console.log(values);
        let [results] = await conn.query(sql,values);
        return res.status(StatusCodes.OK).json(results);
        
    }catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버 오류"
        });
    }
    
    
};

export const detailBook = async(req, res) =>{
    
    try{
        const {bookId} = req.params;
        let sql = `SELECT b.*, c.category_name, 
        (SELECT count(*) FROM likes WHERE b.id=book_id) AS likes,
        EXISTS (SELECT 1 FROM likes WHERE b.id=book_id) AS liked   
        FROM books b 
        LEFT JOIN category c ON b.category_id = c.id 
        WHERE b.id = ? `;
        const values = [bookId];
        const [results] = await conn.query(sql, values);
        const book = results[0];

        if(book){
            return res.status(StatusCodes.OK).json(book);
        }else{
            return res.status(StatusCodes.NOT_FOUND).json({
                message : "상품조회실패"
            });
        }
    }catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버 오류"
        });
    }
    
};
