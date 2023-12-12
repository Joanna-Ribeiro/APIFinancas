const conexaoPool = require('../config/conexao.js')

async function verificarCadastroCorpoTransacao(req, res, next) {
    const { descricao, valor, data, categoria_id, tipo } = req.body

    if (!descricao || !valor || !data || !categoria_id || !tipo) {

        return res.status(403).json({ "mensagem": "Todos os campos obrigatórios devem ser informados!" });

    }

    if (tipo !== "entrada" && tipo !== "saida") {

        return res.status(400).json({ "mensagem": "As transações só podem ser do tipo entrada ou saida!" });

    }
    try {
        const verificaIdCategoria = await conexaoPool.query("SELECT * FROM categorias WHERE id = $1;", [categoria_id]);

        if (verificaIdCategoria.rowCount !== 1) {
            return res.status(400).json({ "mensagem": "A categoria informada não existe" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ "mensagem": "Erro interno do servidor" })
    }
};

module.exports = {
    verificarCadastroCorpoTransacao
}