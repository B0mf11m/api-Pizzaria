const express = require('express'); //Importando
const path = require('path'); //Importando
const router = express.Router(); //isso permite que agente crie diferentes URLs e endpoints pai o frontend possa fazer chamadas
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})

const clienteController = require('./clienteController');
const loginController = require('./loginController');
const produtoController = require('./produtoController');

//************************************************CLIENTE************************************************
router.get('/clientes',loginController.autenticartoken,clienteController.listarCliente);
router.get('/clientes/:cpf',loginController.autenticartoken,clienteController.buscarClientes);
router.post('clientes/:cpf',clienteController.adcionarClientes);
router.patch('/clientes/:cpf',loginController.autenticartoken,clienteController.atualizarCliente);
router.delete('/clientes/:cpf',loginController.autenticartoken,clienteController.deletarCliente);
router.post('/login',loginController.loginCliente);
//************************************************PRODUTO************************************************
router.get('/produto',produtoController.listatProdutos);
router.get('/produto/:id_produto',produtoController.buscarProdutos_id);
router.get('/produto/nome/:nome',produtoController.buscarProdutos_nome);
router.post('/produto/id_produto',produtoController.adcionarProduto);





module.exports = router;