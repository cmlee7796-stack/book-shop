import conn from '../mariadb.js';
import { StatusCodes } from 'http-status-codes';


export const order = async (req, res) => {
   const {items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } = req.body;
    try{

        console.log(req.body);
        let sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, address, receiver, contract) 
                    VALUES (?, ?, ?, ?, ?, ?, ?);`;
        let values = [firstBookTitle, totalQuantity, totalPrice,userId,delivery.address, delivery.receiver, delivery.contract];
        let [results] = await conn.query(sql, values);
        let orderId = results.insertId;

        sql =`SELECT * FROM cart_items WHERE id IN (?)`;
        let [cartItems] = await conn.query(sql, [items]);

        sql =`INSERT INTO order_items (order_id, book_id, quantity) VALUES ?`;

        values = [];  //초기화
        cartItems.forEach((item) =>
        values.push([orderId, item.book_id, item.quantity])
        )
        results = await conn.query(sql, [values]);
        
        let result = await deleteCartItems(conn, items);
        
        return res.status(StatusCodes.OK).json({results, result});

    }catch(err){
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버 오류"
        });
    }

}

export const getOrders = async (req, res ) => {
    const {userId} = req.body;
    try{
        let sql = `SELECT o.id, book_title, total_quantity, total_price, address, receiver, contract, created_at
        FROM orders o
        WHERE o.user_id = ?
        ORDER BY o.created_at DESC`;
        let values = [userId];
        let [results] = await conn.query(sql, values);
        return res.status(StatusCodes.OK).json(results);

    }catch(err){
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버 오류"
        });
    }
}

export const orderDetail = async (req, res) => {
    const {userId} = req.body;
    const {orderId} = req.params;
    try{
            let sql = `SELECT book_id, title, author, quantity, price
            FROM order_items ob
            LEFT JOIN books b ON ob.book_id = b.id
            LEFT JOIN orders o ON ob.order_id = o.id
            WHERE o.user_id = ? AND o.id = ?`;
            let values = [userId, orderId];
            let [results] = await conn.query(sql, values);
            return res.status(StatusCodes.OK).json(results);
    }catch(err){
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버 오류"
        });
    }

}

const deleteCartItems = async (conn, items) => {
  
    try{   
        
        let sql = `DELETE  FROM cart_items WHERE id IN (?)`;
        let result = await conn.query(sql, [items]);
        return result;
    }catch(err){
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버 오류"
        });
    }   
    res.json('주문목록조회');
}
