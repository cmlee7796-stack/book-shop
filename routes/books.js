import express from 'express';
const router = express.Router();

router
.route('/')
.get((req, res) =>{
    const {query} = req;
    console.log(query);
    res.json({message : '목록조회'});
});


router
.route('/:bookId')
.get((req,res) =>{
    const {bookId} = req.params;
    res.json({message : `${bookId} 상세조회`});
})


export default router;