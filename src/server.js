require('dotenv/config')
require('./database')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const routes = require('#routes')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)

app.disable('x-powered-by')

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port: ${process.env.PORT}`)
})
