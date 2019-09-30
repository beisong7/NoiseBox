var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// import Web from './routes/web'

// var APPPORT = 6565;
var APPPORT = 8090;

var syn = 0;
var x = 0;


let d = '';
// Web();
app.get("/", function(req, res, next){
    res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static("public"));

io.on("connection", function(client){
    
    client.on("join",function(){
        // console.log(data);
        x++;
        let data = x + " guest(s) online";
        client.emit("online", data);
        client.broadcast.emit("online", data);
        console.log(x + " visitors online");
        console.log("chat visitor joined");
    });

    client.on("message", function(data){
        client.emit("thread",data);
        client.broadcast.emit("thread", data);
    });

    client.on("synfront",()=>{
        syn++;
        console.log('synergy front connected');
        client.emit("synres",syn);
        client.broadcast.emit("synres",syn);
    });

    client.on("synres",()=>{
        syn++;
        console.log('synergy admin connected');
        client.emit("synres",syn);
        client.broadcast.emit("synres",syn);
    });

    client.on('disconnect',()=>{
        x--;
        x<0?x=0:x;
        let data = x + " guest(s) online";
        client.emit("online", data);
        client.broadcast.emit("online", data);

        syn--;
        syn<0?syn=0:syn;
        client.emit("synres",syn);
        client.broadcast.emit("synres",syn);

        console.log('a visitor left');
        console.log(x + " visitors online");
        console.log(client + " what is this");
    });

    


})

server.listen(APPPORT,function(e){
    console.log('server has started at '+APPPORT);
});
