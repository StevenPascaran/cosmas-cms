const express = require('express');
const PORT = process.env.PORT || 8080;
const path = require('path');

//express().get('/', (req, res) => {
//  res.send('root route');
//});

const http = require('http'),
      server = http.createServer(),
	  url = require('url');

makeServer = function (request,response){
   let path = url.parse(request.url).pathname;
   console.log(path);
   if(path === '/'){
      response.writeHead(200,{'Content-Type':'text/plain'});
      response.write('Hello world');
   }
   else if(path === '/about'){
     response.writeHead(200,{'Content-Type':'text/plain'});
     response.write('About page');
   }
   else if(path === '/blog'){
     response.writeHead(200,{'Content-Type':'text/plain'});
     response.write('Blog page');
   }
   else{
     response.writeHead(404,{'Content-Type':'text/plain'});
     response.write('Error page');
   }
   response.end();
 },
 
server = http.createServer(makeServer);

server.listen(PORT, (res,req) => {
	console.log(`Listening on ${ PORT }`)
});

//express().listen(PORT, (res,req) => {
//	console.log(`Listening on ${ PORT }`)
//});