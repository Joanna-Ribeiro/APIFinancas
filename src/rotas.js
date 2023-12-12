const express = require('express');
const { validarUsuarioLogado } = require('./intermediarios/autenticacao');
const { verificarCadastroCorpo } = require('./intermediarios/validar-body-cadastro');
const { verificarCadastroCorpoTransacao } = require('./intermediarios/validar-body-cadastro-transacao');
const { cadastrarUsuario, loginUsuario, detalharUsuario, atualizarUsuario } = require('./controladores/usuario');
const {cadastrarTransacao, listarTransacoes, detalharTransacao, deletarTransacao, atualizarTransacao, obterExtrato} = require("./controladores/transacoes");
const { listarCategorias } = require("./controladores/categorias");

const rotas = express();

rotas.post('/usuario', verificarCadastroCorpo, cadastrarUsuario);

rotas.post('/login', loginUsuario)

rotas.use(validarUsuarioLogado)

rotas.get('/usuario', detalharUsuario)

rotas.put('/usuario', atualizarUsuario)

rotas.get('/categoria', listarCategorias)

rotas.get('/transacao/extrato', obterExtrato)

rotas.post('/transacao', verificarCadastroCorpoTransacao, cadastrarTransacao)

rotas.get('/transacao', listarTransacoes)

rotas.get('/transacao/:id', detalharTransacao)

rotas.delete('/transacao/:id', deletarTransacao)

rotas.put('/transacao/:id', verificarCadastroCorpoTransacao, atualizarTransacao)



module.exports = rotas