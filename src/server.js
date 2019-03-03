const express = require('express');
const server = express();
const PORT = process.env.PORT || 8080;
//const path = require('path');

server.set('port', PORT);

server.get('/', (req, res)=>{
  res.send('Home Page');
});

server.get('/about',(req,res)=>{
   response.send('About page');
});

//Express error handling middleware
server.use((req,res)=>{
   response.type('text/plain');
   response.status(505);
   response.send('Error page');
});

server.listen(PORT, (res,req)=>{
	console.log(`Listening on ${ PORT }`)
});