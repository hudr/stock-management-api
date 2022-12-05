import 'dotenv/config'
import cors from 'cors'
import express from 'express'
const app = express()

// Permite acesso externo
app.use(cors())

// Desativa o X-Powered-By: Express
app.disable('x-powered-by')

// Criamos uma rota raiz com o texto Hello World!
app.get('/', (_req, res) => {
  res.send({ message: 'Hello World!' })
})

// Passamos a porta onde o servidor ficará ouvindo
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port: ${process.env.PORT}`)
})
