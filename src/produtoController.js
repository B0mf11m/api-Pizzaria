const db = require('./db');
const joi = require('joi');

const produtoShema= joi.object({
    id_produto:joi.string().required(),
    nome:joi.string().required(),
    descricao:joi.string().required(),
    valor_unitario:joi.string().required(),
    imagem:joi.string().required()
});
exports.listatProdutos=(req, res) => {
    db.query('SELECT * FROM produto', (err, result) => {
        if (err) {
            console.error('Erro ao buscar o produto:', err);
            res.status(500).json({ erro: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
};

exports.buscarProdutos_id = (req, res) => {
    const { id_produto } = req.params;

    db.query('SELECT * FROM produto WHERE id_produto = ?', id_produto, (err, result) => {
        if (err) {
            console.error('erro ao buscar o produto:', err);
            res.status(500).json({ erro: 'Erro interno do servidor' });
            return;

        }
        if (result.length === 0) {
            res.status(404).json({ erro: 'Produto não encontrado' });
            return;
        }
        res.json(result[0]);
    });
};
exports.buscarProdutos_nome = (req, res) => {
    const { nome } = req.params;

    db.query('SELECT * FROM produto WHERE nome LIKE ?', [`${nome}%`], (err, result) => {
        if (err) {
            console.error('erro ao buscar o produto:', err);
            res.status(500).json({ erro: 'Erro interno do servidor' });
            return;

        }
        if (result.length === 0) {
            res.status(404).json({ erro: 'Produto não encontrado' });
            return;
        }
        res.json(result);
    });
};

exports.adcionarProduto = (req,res) =>{
    const {id_produto,nome,descricao,valor_unitario,imagem} = req.body;

    const{error} = produtoShema.validate({id_produto,nome,descricao,valor_unitario,imagem});
    if (error) {
        res.status(400).json({error:'Dados do produto invalidos'})
        return;
    }
        const novoProduto ={
            nome,
            descricao,
            valor_unitario,
            imagem
            
        };
        db.query('INSERT INTO produto SET ?',novoProduto,(err,result)=>{
            if (err) {
                console.error('Erro ao adicionar Produto:',err);
                res.status(500).json({error: 'Erro interno do servidor'});
                return;
            }
            res.json({message: 'produto adcionado com sucesso'})
        });
    }

   