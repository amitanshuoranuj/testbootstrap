var http = require("http");
var fs = require("fs");
var path = require("path");

console.log("Starting");
var port = "80";

var server = http.createServer(function(req, res){
	console.log("Received Request: "+ req.url);
	var filePath = "."+req.url;
	if (filePath == './')
		filePath = './index.html';
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
		        contentType = 'text/css';
        		break;
	}
        
	fs.exists(filePath, function(exists) {
		if (exists) {               
        		fs.readFile(filePath, function(error, content) {
            			if (error) {
					res.writeHead(500);
					res.end();      
				} else {                   
					res.writeHead(200, { 'Content-Type': contentType });
					res.end(content, 'utf-8');
				}
        		});
    		}
	});
	/*if(request.url=="/" || request.url=="/index.html"){
		fs.readFile("./index.html", function(error, data){
			if(error){
				response.writeHead(404, {"Content-type": "text/plain"});
				response.end("Sorry the page was not found");
			} else{
				response.writeHead(200, {"Content-type": "text/html"});
				response.end(data);
			}
		});
	
	}else 
	{
		fs.readFile("."+request.url, function(error, data){
			if (error){
				response.writeHead(404, {"Content-type": "text/plain"});
                                response.end("Sorry the page was not found");
			}else { 
				response.writeHead(200, {"Content-type": "text/html"});
                                response.end(data);
			}
		//response.writeHead(200, {"Content-type":"text/plain"});
        	//response.end("Hello World!!");
		});
	}*/
});
server.listen(port);
