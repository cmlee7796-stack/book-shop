import express from 'express';
import {order, getOrders, orderDetail} from '../controller/OrderController.js';
const router = express.Router();


router
.route('/')
.post(order)
.get(getOrders)

router
.route('/:orderId')
.get(orderDetail)
    
export default router;