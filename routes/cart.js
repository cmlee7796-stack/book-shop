import express from 'express';
const router = express.Router();

router
.route('/')
.post((req, res) => {
    console.log(req.body);
    console.log(`장바구니 담기 요청됨`);
    res.json({message: '장바구니 담기 완료'});
})
.get((req, res) =>{
    const {bookId} = req.body;
    console.log(`장바구니 조회 요청됨`);
    res.json({message: `${bookId} 장바구니 조회`});
})
.delete((req, res) =>{
    const {bookId} = req.params;
})

export default router;