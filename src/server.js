const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;

express().get('/', (req, res) => {
  res.send('root route');
});

express().listen(PORT, (res,req) => {
	console.log(`Listening on ${ PORT }`)
});