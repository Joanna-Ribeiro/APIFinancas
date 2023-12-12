const verificarCadastroCorpo = (req, res, next) => {
    const { nome, email, senha } = req.body

    console.log('PASSOU AQUI!')

    if (!nome || !email || !senha) { 
       
        return res.status(403).json({ "mensagem": "Todos os campos são obrigatórios!" });

    }
    next();
};

module.exports = {
    verificarCadastroCorpo
}