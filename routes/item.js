const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('item get')
})
router.post('/',(req,res)=>{
    res.send('item post')
})
module.exports=router