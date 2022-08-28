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
        var userTable="CREATE TABLE IF NOT EXISTS item (code varchar(255) PRIMARY KEY,name varchar(255),qty INT ,price DOUBLE )"
        connection.query(userTable,function (err, result) {
            if(err) throw err;
            if(result.warningCount===0){
                console.log("item table crated");
            }
        })
    }
})
//get all
router.get('/',(req,res)=>{
    var query="SELECT * FROM item";
    connection.query(query,(err,rows)=>{
        if(err) throw  err;
        res.send(rows)
    })
})

//save
router.post('/',(req,res)=>{
    const code=req.body.code;
    const name=req.body.name;
    const qty=req.body.qty;
    const price=req.body.price;

    var query="INSERT INTO item (code,name,qty,price) VALUES (?,?,?,?)";
    connection.query(query,[code,name,qty,price],(err)=>{
        if(err){
            res.send({"message":"duplicate entity"})
            //throw err;
        }else{
            res.send({"message":"item added"})
        }
    })
})

//update
router.put('/',(req,res)=>{
    const code=req.body.code;
    const name=req.body.name;
    const qty=req.body.qty;
    const price=req.body.price;
    var query="UPDATE item SET name=?,qty=?,price=? WHERE code=?";
    connection.query(query,[name,qty,price,code],(err,rows)=>{
        if(err){
            throw err;
        }else{
            if(rows.affectedRows>0 ){
                res.send({"message": "item updated"});
            }else{
                res.send({"message":"item not found"})
            }
        }
    })
    console.log(req.body)
})

//delete
router.delete('/:code',(req,res)=>{
    const code=req.params.code;
    var query="DELETE FROM item WHERE code=?"
    connection.query(query,[code],(err,rows)=>{
        if(err) console.log(err)
        if(rows.affectedRows>0){
            res.send({"message":"item deleted"})
        }else{
            res.send({"message":"item not found"})
        }
    })
})

//search
router.get('/:code',(req,res)=>{
    const code=req.params.code;
    var query="SELECT * FROM item WHERE code=?"
    connection.query(query,[code],(err,rows)=>{
        if(err) console.log(err)
        res.send(rows)
    })
})

module.exports=router