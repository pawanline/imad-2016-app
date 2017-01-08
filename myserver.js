var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('public'));

app.get('/',function(req,res){
    //res.send('hello iam here');
    res.sendFile('public'+'/index.html');
    });

app.listen('3000');
console.log('listening on port 3000');
