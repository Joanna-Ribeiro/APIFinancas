const jwt = require('jsonwebtoken')
const conexaoPool = require('../config/conexao')
const senhaJwt = require('../senhaJWT')

const validarUsuarioLogado = async (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(401).json({ mensagem: 'Usuário não autorizado' })
	}

	const token = authorization.split(' ')[1]

	try {
		const { id } = jwt.verify(token, senhaJwt)

		const { rows, rowCount } = await conexaoPool.query(
			'select * from usuarios where id = $1',
			[id]
		)

		if (rowCount < 1) {
			return res.status(401).json({ mensagem: 'Não autorizado' })
		}

		req.usuario = rows[0]

		const agora = Math.floor(Date.now() / 1000)
		if (req.usuario.exp < agora) {
			return res.status(401).json({ mensagem: 'Token expirado' })
		}

		next()
        
	} catch (error) {
		return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
	}
}

module.exports = {
	validarUsuarioLogado
}
