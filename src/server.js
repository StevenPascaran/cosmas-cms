const express = require('express');
const PORT = process.env.PORT || 8080;
const path = require('path');

//express().get('/', (req, res) => {
//  res.send('root route');
//});

const http = require('http'),
      server = http.createServer(),
	  url = require('url');

server.on('request',(request,response)=>{
   response.writeHead(200,{'Content-Type':'text/plain'});
   response.write('Hello world');
   response.end();
});

server.listen(PORT, (res,req) => {
	console.log(`Listening on ${ PORT }`)
});

//express().listen(PORT, (res,req) => {
//	console.log(`Listening on ${ PORT }`)
//});