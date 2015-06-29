/*
    Tiny server that supports serving static files using NodeJS & Express
    Nb: if onyl serving static stuff, using nginx may be more effiscient

    stephaneAG - 2014
*/

var express = require('express');
 
var server = express();
//server.use(express.static(__dirname + '/public'));
server.use(express.static (__dirname )); // serve file in the current directory ( debug )

var port = 10001;
server.listen(port, function() {
  console.log('server listening on port ' + port);
});

