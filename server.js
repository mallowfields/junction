require('dotenv').config()
const express = require('express')
const history = require('connect-history-api-fallback')
const app = express()
app.use(history())
app.use(express.static(`${__dirname}/dist`))

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server running on port: ${port}/`)
})
