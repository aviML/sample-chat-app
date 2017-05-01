var express = require("express")
var fs = require("fs")

var app =  express()

var http = require("http")

var server = http.createServer(app)

var io = require("socket.io")(server)//socket will listen on server

io.on("connection",function(socket){
console.log("user logged in")
socket.on("disconnect",function(){console.log("user logged out")})
socket.on('chat message',function(msg){
console.log(msg);
io.emit('chat message',msg)
})
fs.readFile(__dirname+'/pic.jpg',function(err,buff){
io.emit('image',{image:true,buffer:buff.toString('base64')})
})
})

server.listen(8080,function(){
console.log("server is running")})

app.get('/',function(req,res){
res.sendFile(__dirname+"/index.html")
})

var obj ={name:"avnish",age:24}

console.log("Hello ",obj.name)