const express = require('express'); //Importando
const path = require('path'); //Importando
const router = express.Router(); //isso permite que agente crie diferentes URLs e endpoints pai o frontend possa fazer chamadas
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})

const clienteController = require('./clienteController');
const loginController = require('./loginController');
const produtoController = require('./produtoController');
const pedidoController= require('./pedidoController');
const itemPedidoController= require('./itemPedidoController');
//************************************************CLIENTE************************************************
router.get('/clientes',loginController.autenticartoken,clienteController.listarCliente);
router.get('/clientes/:cpf',loginController.autenticartoken,clienteController.buscarClientes);
router.post('clientes/:cpf',clienteController.adcionarClientes);
router.patch('/clientes/:cpf',loginController.autenticartoken,clienteController.atualizarCliente);
router.delete('/clientes/:cpf',loginController.autenticartoken,clienteController.deletarCliente);
router.post('/login',loginController.loginCliente);
//************************************************PRODUTO************************************************
router.get('/produto',produtoController.listarProdutos);
router.get('/produto/:id_produto',produtoController.buscarProdutos_id);
router.get('/produto/nome/:nome',produtoController.buscarProdutos_nome);    
router.post('/produto/id_produto',loginController.autenticartoken,produtoController.adcionarProduto);
router.patch('/produto/id_produto',loginController.autenticartoken,produtoController.atualizarProduto);
router.delete('/produto/id_produto',loginController.autenticartoken,produtoController.deletarProduto);
router.post('/login',loginController.loginCliente);
//************************************************PEDIDO************************************************
router.get('/pedido',pedidoController.listarPedido);
router.get('/pedido/:id_pedido',pedidoController.buscarPedido);
router.get('/pedido/cliente/:id_cliente',pedidoController.buscarPedido_cliente);
router.post('/pedido/:id_pedido',pedidoController.adcionarPedido);
router.patch('/pedido/:id_pedido',pedidoController.atualizarPedido);
router.delete('/pedido/:id_pedido',pedidoController.deletarPedido);
router.post('/login',loginController.loginCliente);
//************************************************ITEM_PEDIDO************************************************
router.get('/item',itemPedidoController.listaritemPedido);
router.get('/item/:id_item',itemPedidoController.buscarItem);
router.get('/item/pedido/:id_pedido',itemPedidoController.buscarItem_pedido);
router.get('/item/produto/:id_produto',itemPedidoController.buscarItem_produto);
router.post('/item/:id_item',itemPedidoController.adcionarItem);
router.patch('/item/:id_item',itemPedidoController.atualizarItem);
router.delete('/item/:id_item',itemPedidoController.deletaritem);



module.exports = router;