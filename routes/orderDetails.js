const express=require('express');
const router=express.Router();

const db=require('../config/db.config')
const mysql = require('mysql')
const connection = mysql.createConnection(db.database);
connection.connect(function (err) {
    if(err){
        console.log(err)
    }else{
        console.log("connected to the mysql server")
        var userTable="CREATE TABLE IF NOT EXISTS orderDetails (oid varchar(255),code varchar(255),qty INT ,unitPrice DOUBLE,CONSTRAINT FOREIGN KEY (oid) REFERENCES orders (oid),CONSTRAINT FOREIGN KEY (code) REFERENCES item (code) )"
        connection.query(userTable,function (err, result) {
            if(err) throw err;
            //console.log(result)
            if(result.warningCount===0){
                console.log("orderDetails table crated");
            }

        })
    }
})

//get all
router.get('/',(req,res)=>{
    var query="SELECT * FROM orderDetails";
    connection.query(query,(err,rows)=>{
        if(err) throw  err;
        res.send(rows)
    })
})

//save
router.post('/',(req,res)=>{
    const oid=req.body.oid;
    const code=req.body.code;
    const qty=req.body.qty;
    const unitPrice=req.body.unitPrice;

    var query="INSERT INTO orderDetails (oid,code,qty,unitPrice) VALUES (?,?,?,?)";
    connection.query(query,[oid,code,qty,unitPrice],(err)=>{
        if(err){
            res.send({"message":err})
            //throw err;
        }else{
            res.send({"message":"orderDetails created"})
        }
    })
})

//update
router.put('/',(req,res)=>{
    const oid=req.body.oid;
    const code=req.body.code;
    const qty=req.body.qty;
    const unitPrice=req.body.unitPrice;
    var query="UPDATE orderDetails SET qty=?,unitPrice=? WHERE oid=?";
    connection.query(query,[qty,unitPrice,oid],(err,rows)=>{
        if(err){
            throw err;
        }else{
            if(rows.affectedRows>0 ){
                res.send({"message": "orderDetails updated"});
            }else{
                res.send({"message":"orderDetails not found"})
            }
        }
    })
    console.log(req.body)
})

//delete
router.delete('/:oid',(req,res)=>{
    const oid=req.params.oid;
    var query="DELETE FROM orderDetails WHERE oid=?"
    connection.query(query,[oid],(err,rows)=>{
        if(err) console.log(err)
        if(rows.affectedRows>0){
            res.send({"message":"orderDetails deleted"})
        }else{
            res.send({"message":"orderDetails not found"})
        }
    })
})

//search
router.get('/:oid',(req,res)=>{
    const oid=req.params.oid;
    var query="SELECT * FROM orderDetails WHERE oid=?"
    connection.query(query,[oid],(err,rows)=>{
        if(err) console.log(err)
        res.send(rows)
    })
})

module.exports=router
