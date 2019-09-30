//init socket, connection to server
var socket = io.connect('/');
// var socket = io.connect("http://localhost:6565");
socket.on('connect', function(data){
    socket.emit('join','hello server from client');
});

//listens to thread event
socket.on("thread", function(data){
    $("#thread").append("<li class='list-group-item'>"+data+"</li>");
});

//disable auto complete
$("form :input").attr("autocomplete", "off");

socket.on("online",function(data){
    $("#online").text(data);
})

//send message to server
$("form").submit(function(){
    let name = $("#user").val();
    name===""?name="default":name;
    let message = $("#message").val();
    socket.emit("message", name +" : " + message);
    this.reset();
    $("#user").val(name);
    return false;
});