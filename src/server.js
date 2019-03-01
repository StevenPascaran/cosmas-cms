const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8080

express().all('/index', function (req, res) {
	console.log('Accessing the secret section ...')
})

express().listen(PORT, () => console.log(`Listening on ${ PORT }`))
