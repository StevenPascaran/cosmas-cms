const express = require('express');
const server = express();
const PORT = process.env.PORT || 8080;
//const path = require('path');

server.set('port', PORT);

server.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
});

server.get('/about',(req,res)=>{
   res.send('About page');
});

//Express error handling middleware
server.use((req,res)=>{
   res.type('text/plain');
   res.status(505);
   res.send('Error page');
});

server.listen(PORT, (res,req)=>{
	console.log(`Listening on ${ PORT }`)
});