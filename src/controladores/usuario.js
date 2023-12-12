const conexaoPool = require('../config/conexao.js')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const senhaJwt = require('../senhaJWT.js')

async function cadastrarUsuario(req, res) {

  const { nome, email, senha } = req.body

  try {
    let verificarEmail = "SELECT * FROM usuarios WHERE email = $1;";
    let resultadoVerificacao = await conexaoPool.query(verificarEmail, [email]);

    if (resultadoVerificacao.rowCount > 0) {
      return res.status(400).json({ mensagem: 'Este email já está registrado' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const cadastroUsuario = await conexaoPool.query(
      `INSERT INTO usuarios (nome, email, senha) values ($1, $2, $3) returning *`,
      [nome, email, senhaCriptografada]
    );

    return res.status(201).json({
      id: cadastroUsuario.rows[0].id,
      nome: cadastroUsuario.rows[0].nome,
      email: cadastroUsuario.rows[0].email
    });

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor!" });
  }
}


async function loginUsuario(req, res) {
  const { email, senha } = req.body;

  try {

    const usuario = await conexaoPool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (usuario.rowCount < 1) {
      return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);

    if (!senhaValida) {
      return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const token = jwt.sign({ id: usuario.rows[0].id }, senhaJwt, {
      expiresIn: "8h",
    });

    const { senha: _, ...usuarioLogado } = usuario.rows[0];

    return res.json({ usuario: usuarioLogado, token });

  }

  catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

async function detalharUsuario(req, res) {

  const { id, nome, email } = req.usuario;
  const infoUsuario = { id, nome, email };

  return res.status(200).json(infoUsuario);

}

async function atualizarUsuario(req, res) {
  const { nome, email, senha } = req.body;
  const { id } = req.params;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const verificarEmail = "SELECT * FROM usuarios WHERE email = $1;";
    const resultadoVerificacao = await conexaoPool.query(verificarEmail, [email]);

    if (resultadoVerificacao.rowCount > 0) {
      return res.status(400).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário.' });
    }

    const queryAtualizarUsuario = `
      UPDATE usuarios 
      SET nome = $1, email = $2, senha = $3 
      WHERE id = $4
    returning *`;

    const { rowCount } = await conexaoPool.query(queryAtualizarUsuario, [nome, email, senhaCriptografada, req.usuario.id]);

    if (rowCount === 0) {
      return res.status(404).json({ mensagem: 'Usuário informado não existe ou não tem permissão para atualizar.'});
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ mensagem: "Ocorreu um erro ao processar a requisição." });
  }
}

module.exports = {
  cadastrarUsuario,
  loginUsuario,
  detalharUsuario,
  atualizarUsuario
}
