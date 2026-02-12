import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import booksRouter from './routes/books.js';
import cartRouter from './routes/cart.js';
import ordersRouter from './routes/orders.js';

const app = express();
dotenv.config();

app.use(express.json()); 

app.listen(process.env.PORT);


app.get('/', (req, res) =>{
    res.send('Hello World');
})

app.use('/users',usersRouter);
app.use('/auth',authRouter);
app.use('/books',booksRouter);
app.use('/cart',cartRouter);
app.use('/orders',ordersRouter);