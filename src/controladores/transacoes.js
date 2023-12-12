const conexaoPool = require('../config/conexao.js')

async function cadastrarTransacao(req, res) {
    const { tipo, descricao, valor, data, categoria_id } = req.body;
    const usuario = req.usuario.id;
    try {
        const transacao = await conexaoPool.query(
            "INSERT INTO transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) VALUES ($1, $2, $3, $4, $5, $6) returning *",
            [descricao, valor, data, categoria_id, usuario, tipo]
        );

        return res.status(201).json(transacao.rows[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

async function listarTransacoes(req, res) {
    const usuario = req.usuario.id;
    try {
        const transacoesUsuario = await conexaoPool.query(
            "SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome FROM transacoes t INNER JOIN categorias c ON t.categoria_id = c.id AND t.usuario_id = $1",
            [usuario]
        );
        return res.json(transacoesUsuario.rows);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

async function detalharTransacao(req, res) {
    const usuario = req.usuario.id;
    const transacaoId = req.params.id;

    try {
        const transacaoDetalhada = await conexaoPool.query("SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome FROM transacoes t INNER JOIN categorias c ON t.id = $1 AND t.categoria_id = c.id AND t.usuario_id = $2", [transacaoId, usuario]);

        if (transacaoDetalhada.rowCount !== 1) {
            return res.status(401).json({ "mensagem": "Transação não encontrada" })
        }
        return res.status(201).json(transacaoDetalhada.rows[0]);
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

async function atualizarTransacao(req, res) {
    const id_transacao = req.params.id;
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const usuario = req.usuario.id;

    try {

        const transacaoExiste = await conexaoPool.query("select * from transacoes where id = $1 AND usuario_id = $2", [id_transacao, usuario]);

        if (transacaoExiste.rowCount !== 1) {
            return res.status(401).json({ "mensagem": "Transação não encontrada" })
        }

        const transacaoAtualizada = await conexaoPool.query(
            "UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6",
            [descricao, valor, data, categoria_id, tipo, id_transacao]
        );

        return res.status(204).json(transacaoAtualizada.rows[0]);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}


async function deletarTransacao(req, res) {
    const transacaoId = req.params.id;
    const usuario = req.usuario.id;
    try {
        const TransacaoExiste = await conexaoPool.query("SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2 ", [transacaoId, usuario]);

        if (TransacaoExiste.rowCount !== 1) {
            return res.status(401).json({ "mensagem": "Transação não encontrada" })
        }

        await conexaoPool.query("DELETE FROM transacoes WHERE id = $1", [transacaoId]);

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

async function obterExtrato(req, res) {
    const usuario = req.usuario.id;

    try {

        const extratoEntrada = await conexaoPool.query("SELECT SUM(valor) as entrada from transacoes WHERE usuario_id = $1 AND tipo = $2", [usuario, "entrada"]);

        const extratoSaida = await conexaoPool.query("SELECT SUM(valor) as saida from transacoes WHERE usuario_id = $1 AND tipo = $2", [usuario, "saida"]);

        if (extratoEntrada.rows[0].entrada === null) {
            extratoEntrada.rows[0].entrada = 0;
        }
        if (extratoSaida.rows[0].saida === null) {
            extratoSaida.rows[0].saida = 0;
        }
        return res.status(201).json({
            "entrada": Number(extratoEntrada.rows[0].entrada),
            "saida": Number(extratoSaida.rows[0].saida)
        });
    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });
    }
}

module.exports = {
    cadastrarTransacao,
    listarTransacoes,
    detalharTransacao,
    deletarTransacao,
    atualizarTransacao,
    obterExtrato
};