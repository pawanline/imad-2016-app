//counter code
var button = document.getElementById('counter') ;

button.onclick = function(){
    


            //create a request object
            var request = new XMLHttpRequest();
            
            //counter the response and store it in a variable
           request.onreadystatechange = function(){
              if(request.readyState === XMLHttpRequest.DONE)  {
                  //Take some action
                  if(request.status === 200){
                      var counter = request.responseText;
                       
            var update = document.getElementById('count');
            update.innerHTML = counter.toString();
                  }
              }
              //not done yet
              
            };
            //make the request
            request.open('GET','http://pawanline.imad.hasura-app.io/counter',true);
            request.send(null);
           
    
};