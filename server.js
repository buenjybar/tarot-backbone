//var connect = require('connect');
//connect.createServer( connect.static(___dirname)).listen(80);

//var http = require('http');
//var connect = require('connect');

//var app = connect()
    //.use(connect.logger('dev'))
    //.use(connect.static('public'))
    //.use(function(req, res){
    //    console.dir('req:' + req);

  //  });

//http.createServer(app).listen(3000);




var ws = require('websocket.io'),
    http = require('http'),
    server = ws.listen(8080);


server.on('connection', function(client){
   client.on('message',function(msg){
       console.log("message :" + msg);
   });
    
    client.on('close',function(msg){
        console.log("close :" + msg);
   });
    
});

var server = http.createServer(function(request,response){
  response.writeHeader(200, {"Content-Type": "text/plain"});
  response.write("Server Started");
  if (request.url == "/"){
    for (var i = 0; i < wss.client.length; i++) {
      var ws = wss.clients[i];
      sys.puts("sent msg");
      ws.send("photo plox");
    }
  }
  response.end();
}).listen(3000);