//counter code
var button = document.getElementById('counter') ;
var counter = 0;
button.onclick = function(){
    


            //create a request object
            var request = new XMLHTTPRequest();
            
            //counter the response and store it in a variable
            request.onreadystatechange == function(){
              if(request.readystate === XMLHttpRequest.DONE)  {
                  //Take some action
                  if(request.status === 200){
                      var counter = request.responseText;
                       
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();
                  }
              }
              //not done yet
              
            };
            //make the request
            request.open('GET','')
           
    
};