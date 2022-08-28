/*
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
        var userTable="CREATE TABLE IF NOT EXISTS user (id varchar(255) PRIMARY KEY,name varchar(255),address varchar(255),contact varchar(255) )"
        connection.query(userTable,function (err, result) {
            if(err) throw err;
            //console.log(result)
            if(result.warningCount===0){
                console.log("user table crated");
            }

        })
    }
})

//get all
router.get('/',(req,res)=>{
    var query="SELECT * FROM user";
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

    var query="INSERT INTO user (id,name,address,contact) VALUES (?,?,?,?)";
    connection.query(query,[id,name,address,contact],(err)=>{
        if(err){
            res.send({"message":"duplicate entity"})
            //throw err;
        }else{
            res.send({"message":"user created"})
        }
    })
})

//update
router.put('/',(req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const address=req.body.address;
    const contact=req.body.contact;
    var query="UPDATE user SET name=?,address=?,contact=? WHERE id=?";
    connection.query(query,[name,address,contact,id],(err,rows)=>{
        if(err){
            throw err;
        }else{
            if(rows.affectedRows>0 ){
                res.send({"message": "user updated"});
            }else{
                res.send({"message":"user not found"})
            }
        }
    })
    console.log(req.body)
})

//delete
router.delete('/:id',(req,res)=>{
    const id=req.params.id;
    var query="DELETE FROM user WHERE id=?"
    connection.query(query,[id],(err,rows)=>{
        if(err) console.log(err)
        if(rows.affectedRows>0){
            res.send({"message":"user deleted"})
        }else{
            res.send({"message":"user not found"})
        }
    })
})

//search
router.get('/:id',(req,res)=>{
    const id=req.params.id;
    var query="SELECT * FROM user WHERE id=?"
    connection.query(query,[id],(err,rows)=>{
        if(err) console.log(err)
        res.send(rows)
    })
})

module.exports=router*/
