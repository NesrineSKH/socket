const express = require('express')
const app =express()
const server = require ('http').createServer(app)
const io = require('socket.io')(server,{cors:{origin:"*"}})


app.get('/home',(req,res)=>{
    res.send('dsfsdfsf')
})


server.listen(3001,() =>
{
    console.log("Server running");
})
io.on("connection",(socket)=>
{
    console.log("User connected:"+ socket.id);
});

