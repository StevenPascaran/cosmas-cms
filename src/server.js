const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8080

express()
//.use(express.static(path.join(__dirname, 'src/styles')))
//.set('view engine', 'ejs')
.get('/', (req, res) {
	res.send('index')
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
