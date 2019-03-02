const express = require('express');
const PORT = process.env.PORT || 8080;
const path = require('path');

express().get('/', (req, res) => {
  res.send('root route');
});

express().listen(PORT, (res,req) => {
	console.log(`Listening on ${ PORT }`)
});