require('dotenv').config()
const express = require('express')
const history = require('connect-history-api-fallback')
const app = express()
app.use(history())
app.use(express.static(`${__dirname}/dist`))

const port = process.env.PORT || 8080
const hostname = '127.0.0.1'

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
