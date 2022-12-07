const { verify } = require('jsonwebtoken')
const { promisify } = require('util')
const authConfig = require('#config/auth')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).send({ error: 'token is missing' })
  const [, token] = authHeader.split(' ')

  /**
   * token obrigatório em toda requisição autenticada para que seja possível
   * identificar o id do usuário que está fazendo a requisição, assim não é
   * necessário enviar no req.body a identificação do usuário em cada requisição
   * isso funciona muito bem ao utilizar o /auth e posteriormente usar o axios
   * com interceptors para sempre enviar o token do lado do frontend
   */
  try {
    const { secret } = authConfig.jwt
    const decoded = await promisify(verify)(token, secret)
    req.id = decoded.id

    return next()
  } catch {
    return res.status(401).send({ error: 'invalid token' })
  }
}
