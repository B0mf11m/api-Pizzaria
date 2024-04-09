const db= require('./db');
const joi= require ('joi');

const pedidoShema=joi.object({
    forma_pgto: joi.string().required(),
    qtde_itens: joi.string().required(),
    valor_total: joi.string().required(),
    observacao:  joi.string().required(),
    id_cliente: joi.string().required(),
    id_entregador: joi.string().required()
});
exports.listarPedido=(req,res)=>{
    db.query('SELECT * FROM pedido ',(err,result)=>{
        if(err){
            console.error('Erro ao buscar pedido:',err);
            res.status(500).json({erro: 'Erro interno do servidor '});
            return;
        }
        res.json(result);
    });
};

exports.buscarPedido=(req,res)=>{
    const {id_pedido} = req.params;

    db.query('SELECT * FROM pedido WHERE id_pedido=?',id_pedido,(err,result)=>{
        if(err){
            console.error('Erro ao buscar pedido:',err);
            res.status(500).json({erro:'Erro interno do servidor  '});
            return;
        }
        if(result.length === 0){
            req.status(500).json({erro:'Pedido não encontrado'});
            return;
        }
        res.json(result);

    });}
    exports.buscarPedido_cliente=(req,res)=>{
        const {id_cliente} = req.params;
    
        db.query('SELECT * FROM pedido WHERE pedido.id_cliente= ?;',id_cliente,(err,result)=>{
            if(err){
                console.error('Erro ao buscar pedido:',err);
                res.status(500).json({erro:'Erro interno do servidor  '});
                return;
            }
            if(result.length === 0){
                req.status(500).json({erro:'Pedido não encontrado'});
                return;
            }
            res.json(result);
    
        });

};
exports.adcionarPedido=(req,res)=>{
    const{forma_pgto,qtde_itens,valor_total,observacao,id_cliente,id_entregador} =req.body;
    const{error}=pedidoShema.validate({id_pedido,forma_pgto,qtde_itens,valor_total,observacao,id_cliente,id_entregador});
    if(error){
        res.status(400),json({error:'Dados do pedido invalidos'})
        return;
    }
    const novoPedido={
        forma_pgto,
        qtde_itens,
        valor_total,
        observacao,
        id_cliente,
        id_entregador
    };
    db.query('INSERT INTO pedido SET ?',novoPedido,(err,result)=>{
        if(err){
            console.error('Erro ao adcionar pedido:',err);
            res.status(500).json({error: 'Erro interno do servidor'});
            return;
        }
        res.json({message:'pedido adicionado com sucesso'})
    });
}
exports.atualizarPedido=(req,res)=>{
    const{id_pedido}= req.params;
    const{forma_pgto,qtde_itens,valor_total,observacao}=req.body;
    const{eror}=pedidoShema.validate({id_pedido,forma_pgto,qtde_itens,valor_total,observacao});
    if(error){
        res.status(400).json({error: 'Dados do produto invalido'});
        return;
    }
    db.query('UPDATE pedido SET ? WHERE id_pedido=?',[atualizarPedido,id_pedido],(err,result)=>{
        if(err){
            console.error('Erro ao atualizar Pedido',err);
            res.status(500).json({error: 'Erro  interno do servidor'});
            return;
        }
        res.json({message: 'Produto atualizado com sucesso'});
    });
};
exports.deletarPedido= (req,res)=>{
    const {id_pedido}= req.params;
    db.query('DELET FROM pedido WHERE id_pedido=?',id_pedido,(err,result)=>{
        if(err){
            console.error('Erro ao deletar item:',err);
            res.status(500).json({error:'erro interno no servidor'});
            return;
        }
        res.json({message:'PEDIDO DELETADO COM SUCESSO '});
    });
};