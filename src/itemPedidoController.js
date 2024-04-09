const db= require('./db');
const joi= require ('joi');

const itemPedidoShema=joi.object({
    forma_pgto: joi.string().required(),
    qtde_itens: joi.string().required(),
    valor_total: joi.string().required(),
    observacao:  joi.string().required(),
    id_produto: joi.string().required(),
    id_pedido: joi.string().required()
});
exports.listaritemPedido=(req,res)=>{
    db.query('SELECT * FROM item_pedido ',(err,result)=>{
        if(err){
            console.error('Erro ao buscar pedido:',err);
            res.status(500).json({erro: 'Erro interno do servidor '});
            return;
        }
        res.json(result);
    });
};
exports.buscarItem=(req,res)=>{
    const {id_item} = req.params;

    db.query('SELECT * FROM item_pedido WHERE id_item=?',id_item,(err,result)=>{
        if(err){
            console.error('Erro ao buscar pedido:',err);
            res.status(500).json({erro:'Erro interno do servidor  '});
            return;
        }
        if(result.length === 0){
            req.status(500).json({erro:'Item não encontrado'});
            return;
        }
        res.json(result);

    });}
    exports.buscarItem_produto=(req,res)=>{
        const {id_produto} = req.params;
    
        db.query('SELECT * FROM item_pedido WHERE item_pedido.id_produto= ?;',id_produto,(err,result)=>{
            if(err){
                console.error('Erro ao buscar item:',err);
                res.status(500).json({erro:'Erro interno do servidor  '});
                return;
            }
            if(result.length === 0){
                req.status(500).json({erro:'Item não encontrado'});
                return;
            }
            res.json(result);
    
        });}
        exports.buscarItem_pedido=(req,res)=>{
            const {id_pedido} = req.params;
        
            db.query('SELECT * FROM item_pedido WHERE item_pedido.id_pedido= ?;',id_pedido,(err,result)=>{
                if(err){
                    console.error('Erro ao buscar item:',err);
                    res.status(500).json({erro:'Erro interno do servidor  '});
                    return;
                }
                if(result.length === 0){
                    req.status(500).json({erro:'Item não encontrado'});
                    return;
                }
                res.json(result);
        
            });
    

};
    exports.adcionarItem=(req,res)=>{
        const{forma_pgto,qtde_itens,valor_total,observacao,id_produto,id_pedido} =req.body;
        const{error}=itemPedidoShema.validate({id_pedido,forma_pgto,qtde_itens,valor_total,observacao,id_produto,id_pedido});
        if(error){
            res.status(400),json({error:'Dados do pedido invalidos'})
            return;
        }
        const novoItem={
            forma_pgto,
            qtde_itens,
            valor_total,
            observacao,
            id_produto,
            id_pedido
        };
        db.query('INSERT INTO item_pedido SET ?',novoItem,(err,result)=>{
            if(err){
                console.error('Erro ao adcionar Item:',err);
                res.status(500).json({error: 'Erro interno do servidor'});
                return;
            }
            res.json({message:'Item adicionado com sucesso'})
        });
    }
    exports.atualizarItem=(req,res)=>{
        const{id_item}= req.params;
        const{forma_pgto,qtde_itens,valor_total,observacao,id_produto,id_pedido}=req.body;
        const{eror}=itemPedidoShema.validate({forma_pgto,qtde_itens,valor_total,observacao,id_produto,id_pedido});
        if(error){
            res.status(400).json({error: 'Dados do produto invalido'});
            return;
        }
        db.query('UPDATE item_pedido SET ? WHERE id_item=?',[atualizarItem,id_item],(err,result)=>{
            if(err){
                console.error('Erro ao atualizar Pedido',err);
                res.status(500).json({error: 'Erro  interno do servidor'});
                return;
            }
            res.json({message: 'Produto atualizado com sucesso'});
        });
    };
    exports.deletaritem= (req,res)=>{
        const {id_item}= req.params;
        db.query('DELET FROM item_pedido WHERE id_item=?',id_item,(err,result)=>{
            if(err){
                console.error('Erro ao deletar item:',err);
                res.status(500).json({error:'erro interno no servidor'});
                return;
            }
            res.json({message:'ITEM DELETADO COM SUCESSO '});
        });
    };