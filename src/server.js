import 'dotenv/config'
import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import routes from '#routes'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)

app.disable('x-powered-by')

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port: ${process.env.PORT}`)
})
