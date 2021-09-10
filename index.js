const express = require('express')
const app =express()
const server = require ('http').createServer(app)
const io = require('socket.io')(server,{cors:{origin:"*"}})
var mysql = require('mysql');
var cors=require('cors')
var bodyParser = require('body-parser')
app.use(bodyParser())
app.use(cors())
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_project"

  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get('/home',(req,res)=>{
    res.send('dsfsdfshhhf')
})


//send message

app.post('/send_message',(req,res)=>{
    console.log(req.body.message)
    let sql = 'INSERT INTO chatroom SET ?' 
let post = {         
        message: req.body.message,         
            
    }     
    con.query(sql, post, (err, res) => { 
        if(err) throw err;         
        console.log('success');         
        console.log(res); 
    }); 
});

    


//msg
app.get("/msg",(req,res)=>
{

   con.query(" SELECT * FROM chatroom JOIN messages ON chatroom.id_chatroom = messages.id_chatroom",(err,result,fields)=>{
       if(err){
        return   res.send({
            status:"400",
            message:err.message,
     
        })
       }
    return   res.send({
           status:"200",
           message:'get messages',
           data:result
       })
   })
})

//login

app.post("/login",(req,res)=>{
    if(!req.body.username||!req.body.password){
        return res.send({
            status:400,
            message:'please check params'
        })}
        con.query(`select * from login where username='${req.body.username}' and password='${req.body.password}'`,(error,result,fields)=>{
            if(error){
               return res.send({
                status:400,
                message:error
            }) 
            }
            if(result.length>0){
                return res.send({
                    status:200,
                    message:"success"
                })

            }else{
                return res.send({
                    status:200,
                    message:"wrong login please check"
                })
            }

        })
    })



server.listen(8080,() =>
{
    console.log("Server running");
})
io.on("connection",(socket)=>
{
    console.log("User connected:"+ socket.id);
});

