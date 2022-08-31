const express=require('express');
const router=express.Router();

const db=require('../config/db.config')
const mysql = require('mysql')
const orderDetails=require("./orderDetails")
const connection = mysql.createConnection(db.database);
connection.connect(function (err) {
    if(err){
        console.log(err)
    }else{
        console.log("connected to the mysql server")
        var userTable="CREATE TABLE IF NOT EXISTS orders (oid varchar(255) PRIMARY KEY,customerName varchar(255),date varchar(255),totalPrice DOUBLE,CONSTRAINT FOREIGN KEY (customerName) REFERENCES customer (id) )"
        connection.query(userTable,function (err, result) {
            if (err) throw err;
            //console.log(result)
            if (result.warningCount === 0) {
                console.log("orders table crated");

           /* const oid = "05";
            const code = "i001";
            const qty = 5;
            const unitPrice = 1000.0;
            var query = "INSERT INTO orderDetails (oid,code,qty,unitPrice) VALUES (?,?,?,?)";
            connection.query(query, [oid, code, qty, unitPrice], (err) => {
                if (err) throw err;
                console.log("order details tika complete")
            })*/

        }
        })


    }
})

//get all
router.get('/',(req,res)=>{
    var query="SELECT * FROM orders";
    connection.query(query,(err,rows)=>{
        if(err) throw  err;
        res.send(rows)
    })
})

//save
router.post('/',(req,res)=>{
    const oid=req.body.oid;
    const customerName=req.body.customerName;
    const date=req.body.date;
    const totalPrice=req.body.totalPrice;

    var query="INSERT INTO orders (oid,customerName,date,totalPrice) VALUES (?,?,?,?)";
    connection.query(query,[oid,customerName,date,totalPrice],(err)=>{
        if(err){
            res.send({"message":"duplicate entity"})
            //throw err;
        }else{
            res.send({"message":"order created"})
        }
    })
})

//update
router.put('/',(req,res)=>{
    const oid=req.body.oid;
    const customerName=req.body.customerName;
    const date=req.body.date;
    const totalPrice=req.body.totalPrice;
    var query="UPDATE orders SET customerName=?,date=?,totalPrice=? WHERE oid=?";
    connection.query(query,[customerName,date,totalPrice,oid],(err,rows)=>{
        if(err){
            throw err;
        }else{
            if(rows.affectedRows>0 ){
                res.send({"message": "order updated"});
            }else{
                res.send({"message":"order not found"})
            }
        }
    })
    console.log(req.body)
})

//delete
router.delete('/:oid',(req,res)=>{
    const oid=req.params.oid;
    var query="DELETE FROM orders WHERE oid=?"
    connection.query(query,[oid],(err,rows)=>{
        if(err) console.log(err)
        if(rows.affectedRows>0){
            res.send({"message":"order deleted"})
        }else{
            res.send({"message":"order not found"})
        }
    })
})

//search
router.get('/:oid',(req,res)=>{
    const oid=req.params.oid;
    var query="SELECT * FROM orders WHERE oid=?"
    connection.query(query,[oid],(err,rows)=>{
        if(err) console.log(err)
        res.send(rows)
    })
})

module.exports=router
