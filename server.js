var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;


var config = {
    user:'pawanline',
    database:'pawanline',
    host:'db.imad.hasura.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles={
    'article-one':{
    title : 'Article One | Venkatesh',
    heading: 'Article One',
    date: 'Sep 05, 2016',
    content:`
                <p>
                    This is my first article
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque laoreet lectus ac augue ornare, sed facilisis enim tempor. Sed venenatis leo non orci interdum, ut ullamcorper quam lacinia. Nullam eget rhoncus leo, ac pellentesque felis. Cras egestas aliquet augue, nec viverra orci egestas id. Sed nec tortor at tortor tincidunt volutpat eu at ipsum. Integer euismod euismod est, mattis aliquet quam finibus vel. Fusce venenatis lectus nec laoreet ultricies. Aliquam erat volutpat. Vestibulum eget libero augue. 
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar felis eget eros accumsan porttitor. Morbi posuere feugiat diam vitae egestas. In et semper metus. Praesent feugiat nec turpis ut consequat. Ut condimentum mi leo, et malesuada nunc sagittis sed. Donec cursus ornare ante, non sodales lacus bibendum facilisis. Nulla quis leo placerat, molestie risus eu, cursus mi. Maecenas quis leo dictum, dignissim mauris et, accumsan libero. Integer nec ullamcorper est, quis ornare dui. Etiam in pulvinar turpis, vitae semper quam. 
                </p>`
},
    'article-two':{
    title : 'Article Two | Venkatesh',
    heading: 'Article Two',
    date: 'Sep 06, 2016',
    content:`
                <p>
                    This is my first article
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque laoreet lectus ac augue ornare, sed facilisis enim tempor. Sed venenatis leo non orci interdum, ut ullamcorper quam lacinia. Nullam eget rhoncus leo, ac pellentesque felis. Cras egestas aliquet augue, nec viverra orci egestas id. Sed nec tortor at tortor tincidunt volutpat eu at ipsum. Integer euismod euismod est, mattis aliquet quam finibus vel. Fusce venenatis lectus nec laoreet ultricies. Aliquam erat volutpat. Vestibulum eget libero augue. 
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar felis eget eros accumsan porttitor. Morbi posuere feugiat diam vitae egestas. In et semper metus. Praesent feugiat nec turpis ut consequat. Ut condimentum mi leo, et malesuada nunc sagittis sed. Donec cursus ornare ante, non sodales lacus bibendum facilisis. Nulla quis leo placerat, molestie risus eu, cursus mi. Maecenas quis leo dictum, dignissim mauris et, accumsan libero. Integer nec ullamcorper est, quis ornare dui. Etiam in pulvinar turpis, vitae semper quam. 
                </p>`
},
    'article-three':{
    title : 'Article Three | Venkatesh',
    heading: 'Article Three',
    date: 'Sep 07, 2016',
    content:`
                <p>
                    This is my first article
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque laoreet lectus ac augue ornare, sed facilisis enim tempor. Sed venenatis leo non orci interdum, ut ullamcorper quam lacinia. Nullam eget rhoncus leo, ac pellentesque felis. Cras egestas aliquet augue, nec viverra orci egestas id. Sed nec tortor at tortor tincidunt volutpat eu at ipsum. Integer euismod euismod est, mattis aliquet quam finibus vel. Fusce venenatis lectus nec laoreet ultricies. Aliquam erat volutpat. Vestibulum eget libero augue. 
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar felis eget eros accumsan porttitor. Morbi posuere feugiat diam vitae egestas. In et semper metus. Praesent feugiat nec turpis ut consequat. Ut condimentum mi leo, et malesuada nunc sagittis sed. Donec cursus ornare ante, non sodales lacus bibendum facilisis. Nulla quis leo placerat, molestie risus eu, cursus mi. Maecenas quis leo dictum, dignissim mauris et, accumsan libero. Integer nec ullamcorper est, quis ornare dui. Etiam in pulvinar turpis, vitae semper quam. 
                </p>`
}
};
/*
var pool = new Pool(config);
app.get('/test-db', function (req, res) {
  pool.query('SELECT * FROM article',function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          res.send(JSON.stringify(result));
      }
  });
});
*/

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date = data.date;
    var content = data.content;
    
var htmlTemplate=`<html>
    <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
    <div class="container">
        <div>
            <a href="/">Home</a>
            <hr />
            <h3>
                ${heading}
            </h3>
            <div>
                ${date}
            </div>
            <div>
                ${content}
            </div>
        </div>
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter',function(req,res){
	counter=counter+1;
	res.send(counter.toString());
});

var names=[];
app.get('/submit-name/',function(req,res){
    var name = req.query.name;
	names.push(name);
	res.send(JSON.stringify(names));
});

app.get('/:articleName', function (req, res) {
  //res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/profileimage.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profileimage.jpg'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});