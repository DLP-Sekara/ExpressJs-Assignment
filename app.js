const express=require('express');
const customer=require('./routes/customer')
const item=require('./routes/item')
//const user=require('./routes/user')
const app=express();
const port=4000;

app.use(express.json())
app.use('/customer',customer)
app.use('/item',item)
//app.use('/user',user)

app.get('/',(req,res)=>{
    console.log("get request has come")
    res.send('hello express')
})

app.listen(port,()=>{
    console.log(`app staring on ${port}`)
})
/*
app.get('/customer',(req,res)=>{
    console.log(req.body);
    console.log(req.body.name);
    res.send(`<h2>hello customer gg </h2>`)
})
app.post('/customer',(req,res)=>{
    console.log(req.body);
    res.send(`<h2>hello customer post request </h2>`)
})


app.get('/customer/:id',(req,res)=>{
    console.log(req.params);
    res.send('hello customer vv')
})
app.get('/item',(req,res)=>{
    res.send('hello item f f')
})



app.listen(port,(req,res)=>{
    console.log("Express app listen on port ${port}")
})*/
