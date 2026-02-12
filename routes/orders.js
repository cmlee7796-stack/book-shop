import express from 'express';
const router = express.Router();


router
.route('/')
.post((req, res) =>{
    res.json({message : '주문요청' });

})
.get((req, res) =>{
    res.json({message : '주문 조회'});
})

router
.route('/:orderId')
.get((req, res) => {
    const {orderId} = req.params;
    res.json({message : `${orderId} 주문상세조회`});
})
    
export default router;