import express from 'express';
const router = express.Router();

router
.route('/:bookId')
.post((req, res) =>{
    res.json({message : '좋아요 추가'});
})
.delete((req, res) => {
    res.json({message : '좋아요 취소'});
})