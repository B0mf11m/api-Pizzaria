const express = require('express'); //Importando
const path = require('path'); //Importando
const router = express.Router(); //isso permite que agente crie diferentes URLs e endpoints pai o frontend possa fazer chamadas
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})

const clienteController = require('./clienteController');

router.get('/clientes',clienteController.listarCliente);
router.get('/clientes/:cpf',clienteController.buscarClientes);
router.post('clientes/:cpf',clienteController.adcionarClientes);
router.patch('/clientes/:cpf',clienteController.atualizarCliente);
router.delete('/clientes/:cpf',clienteController.deletarCliente);


module.exports = router;