const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8080

express().get('/', function (req, res) {
	res.send('index')
})
express.listen(PORT, () => console.log(`Listening on ${ PORT }`))
