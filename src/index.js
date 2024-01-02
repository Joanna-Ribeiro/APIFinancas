const express = require('express')
const rotas  = require('./rotas')

const app = express();

app.use(express.json());

app.use(rotas);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Executando na porta 3000");
});