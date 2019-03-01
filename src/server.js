const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8080

express().get('/index', function (req, res) {
	res.send('hello')
})

express().listen(PORT, () => console.log(`Listening on ${ PORT }`))
