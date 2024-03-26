const express = require('express'); //Importando
const path = require('path'); //Importando
const db = require("./db");
const app = express();
 
const router = express.Router(); //isso permite que agente crie diferentes URLs e endpoints pai o frontend possa fazer chamadas
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})
 
app.use(router) // falar para o app usar o router
 
app.listen(3333, () => {
    console.log('Servidor Rodando');
})