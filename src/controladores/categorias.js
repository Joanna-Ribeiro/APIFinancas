const conexaoPool = require('../config/conexao.js')

async function listarCategorias(req, res) {
    try {
        const categorias = await conexaoPool.query(
        "SELECT * FROM categorias"
        );

        return res.json(categorias.rows);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = {
    listarCategorias
};