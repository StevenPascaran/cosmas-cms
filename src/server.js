const express = require('express');
const server = express();
const PORT = process.env.PORT || 8080;
//const path = require('path');

server.set('port', PORT);

server.get('/', (req, res)=>{
  res.send('Home Page');
});

server.listen(PORT, (res,req)=>{
	console.log(`Listening on ${ PORT }`)
});