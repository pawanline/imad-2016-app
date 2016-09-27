var express = require('express');
var morgan = require('morgan');
var path = require('path');
var articles = {
'article-one' : {
    title:"Article One|Pawan kumar",
    heading:"Article One",
    date:'5 sep 2016',
    content:`
    <span>
           <a href="https://www.linkedin.com/in/pawan-kumar-430951111?trk=nav_responsive_tab_profile_pic"/> <img  src ="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" width="42" height="42" border = '0'/>
        </span>
        
        <span>
    <a href="https://twitter.com/pawanku18045433"/><img src ="https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Twitter_bird_logo_2012.svg/1259px-Twitter_bird_logo_2012.svg.png" width="42" height="42"/>
        </span>
        
         <P>
            <a href="<a href="https://www.facebook.com/profile.php?id=100004177570711"/><img src ="https://en.wikipedia.org/wiki/File:Facebook_New_Logo_(2015).svg" width="42" height="42"/>
        </P>`
  
},
'article-two' : {
    title:"Article Two|Pawan kumar",
    heading:"Article Two",
    date:'5 sep 2016',
    content:`
    <P>
            This is the content for my second article.i am writing it @3am on 19-9-16-
        </P>
        
        <P>
            This is the content for my second article.i am writing it @3am on 19-9-16-
        </P>
        
         <P>
            This is the content for my second article.i am writing it @3am on 19-9-16-
        </P>`
    
},
'article-three' : {
    title:"Article Three|Pawan kumar",
    heading:"Article Three",
    date:'5 sep 2016',
    content:`
    <P>
            This is the content for my third article.i am writing it @3am on 19-9-16-
        </P>
        
        <P>
            This is the content for my third article.i am writing it @3am on 19-9-16-
        </P>
        
         <P>
            This is the content for my third article.i am writing it @3am on 19-9-16-
        </P>`
    
},
};
function createTemplate(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    

var htmlTemplate = `<html>
<head>
    <title> ${title}</title>
    <meta name = "viewport" content="width-device-width,initial-scale-1"/>
    <style>
        .container{
     max-width: 800px;
    margin: 0 auto;
    font-size: 32px;
    color: #5f565f;
    font-family: sans-serif;
    padding-left: 20px;
    padding-right: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
    <div>
        <a href="/">Home</a>
    </div>
    <hr/>
    <h3>
        ${heading}
    </h3>
    <div>
      ${date};
    </div>
    <div>
       
        ${content}
        
    </div>
    </div>
</body>
</html>
`;
return htmlTemplate;
}

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter = 0;
app.get('/counter',function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
});
var names=[];
app.get('/submit-name',function(req,res){
                                                    //URL:/submit-name?name=xxxx
    //get the name from the request
    var name =req.query.name;//todo
    names.push(name);
    //JSON 
    res.send(JSON.stringify(names)); //todo
    
});

app.get('/:articleName',function(req,res){
   // articleName == article-one
    //article[articleName] == {} content object for article one
    var articleName = req.params.articleName;
     res.send(createTemplate(articles[articleName]));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
