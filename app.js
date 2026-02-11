import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import booksRouter from './routes/books.js';
import cartRouter from './routes/cart.js';
import ordersRouter from './routes/orders.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
console.log(PORT);

app.use(express.json());  //우선 사용 안함.

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get('/', (req, res) =>{
    res.send('Hello World');
})

app.use('/users',usersRouter);
app.use('/auth',authRouter);
app.use('/books',booksRouter);
app.use('/cart',cartRouter);
app.use('/orders',ordersRouter);