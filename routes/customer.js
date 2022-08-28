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
        var userTable="CREATE TABLE IF NOT EXISTS customer (id varchar(255) PRIMARY KEY,name varchar(255),address varchar(255),contact varchar(255) )"
        connection.query(userTable,function (err, result) {
            if(err) throw err;
            if(result.warningCount===0){
                console.log("customer table crated");
            }

        })
    }
})

//get all
router.get('/',(req,res)=>{
    var query="SELECT * FROM customer";
    connection.query(query,(err,rows)=>{
        if(err) throw  err;
        res.send(rows)
    })
})

//save
router.post('/',(req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const address=req.body.address;
    const contact=req.body.contact;

    var query="INSERT INTO customer (id,name,address,contact) VALUES (?,?,?,?)";
    connection.query(query,[id,name,address,contact],(err)=>{
        if(err){
            res.send({"message":"duplicate entity"})
            //throw err;
        }else{
            res.send({"message":"customer added"})
        }
    })
})

//update
router.put('/',(req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const address=req.body.address;
    const contact=req.body.contact;
    var query="UPDATE customer SET name=?,address=?,contact=? WHERE id=?";
    connection.query(query,[name,address,contact,id],(err,rows)=>{
        if(err){
            throw err;
        }else{
            if(rows.affectedRows>0 ){
                res.send({"message": "customer updated"});
            }else{
                res.send({"message":"customer not found"})
            }
        }
    })
    console.log(req.body)
})

//delete
router.delete('/:id',(req,res)=>{
    const id=req.params.id;
    var query="DELETE FROM customer WHERE id=?"
    connection.query(query,[id],(err,rows)=>{
        if(err) console.log(err)
        if(rows.affectedRows>0){
            res.send({"message":"customer deleted"})
        }else{
            res.send({"message":"customer not found"})
        }
    })
})

//search
router.get('/:id',(req,res)=>{
    const id=req.params.id;
    var query="SELECT * FROM customer WHERE id=?"
    connection.query(query,[id],(err,rows)=>{
        if(err) console.log(err)
        res.send(rows)
    })
})

module.exports=router