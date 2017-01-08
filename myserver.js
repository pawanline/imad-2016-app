var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('public'));

app.get('/',function(req,res){
    //res.send('hello iam here');
    res.sendFile(__dirname+'/index.html');
    });

app.listen('8080');
console.log('listening on port 8080');
