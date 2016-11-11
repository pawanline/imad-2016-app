var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var Pool = require('pg').Pool;
var config = {
    user:'pawanline',
    database:'pawanline',
    host:'db.imad.hasura.io',
    port:'5432',
    password:process.env.DB_PASSWORD
}
function createtemplate(data)
{
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    var htmltemplate=
               `
               <html>
    <head>
        <title> ${title} </title>
        <link href="/ui/style.css" rel="stylesheet" />
        <meta name="viewport" content="width-device-width,initial-scale=1"/>
    </head>
    <body>
        <div>
         <a href='/'>Home</a>
        </div>
        <hr/>
        <h> ${heading}</h>
        <hr/>
        <hr/>
        <div>
            ${date.toDateString()}
        </div>
        <hr/>
        <div class = "center">
         <p1> 
              ${content}
        </p1>
        </div>
        
        
    </body>
</html>`;
return htmltemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool = new Pool(config);
app.get('/test-db', function(req, res){
    pool.query('SELECT * FROM test',function(err,result){
     if (err)
     {
         res.status(500).send(err.toString());
     }
     else
     {
         res.send(JSON.stringify(result.rows));
     }
    });
});
  

var c=0;
app.get('/counter', function (req, res) {
    c=c+1;
  res.send(c.toString());
}); 

var names=[];
app.get('/submit-name:name', function (req, res) {
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});





app.get('/articles/:articlename', function (req, res) {
    pool.query("SELECT * FROM article WHERE title='"+req.params.articlename+"'",function(err,result){
        if(err)
        {
            res.status(500).send(err.tostring());
        }
        if(result.rows.length===0)
        {
            res.status(404).send(err.tosrting());
        }
        else
        {
            var articledata=result.rows[0];
            res.send(createtemplate(articledata));
        }    
    });
});
  

 
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});