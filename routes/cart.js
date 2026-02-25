import express from 'express';
import { addToCart, getCartItems, removeCartItem } from '../controller/CartController.js';

const router = express.Router();

router
.route('/')
.post(addToCart)
.get(getCartItems)
.delete(removeCartItem)

export default router;