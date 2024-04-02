const db = require('./db');
const joi = require('joi');
const bcrypt = require('bcrypt');

const clientSchema = joi.object({
    nome: joi.string().required(),
    endereco: joi.string().required(),
    bairro: joi.string().required(),
    cep: joi.string().required(),
    cpf: joi.string().length(11).required(),
    login: joi.string().required(),
    senha: joi.string().min(6).required(),

})

exports.listarCliente = (req, res) => {
    db.query('SELECT * FROM cliente', (err, result) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err);
            res.status(500).json({ erro: 'Erro interno do servidor' });
            return;
        }
        res.json(result);
    });
};

exports.buscarClientes = (req, res) => {
    const { cpf } = req.params;

    db.query('SELECT * FROM cliente WHERE cpf = ?', cpf, (err, result) => {
        if (err) {
            console.error('erro ao buscar o cliente:', err);
            res.status(500).json({ erro: 'Erro interno do servidor' });
            return;

        }
        if (result.length === 0) {
            res.status(404).json({ erro: 'Cliente não encontrado' });
            return;
        }
        res.json(result[0]);
    });
};
exports.adcionarClientes = (req,res) =>{
    const {nome,endereco,bairro,cep,cpf,login,senha} = req.body;

    const{error} = clientSchema.validate({nome,endereco,bairro,cep,cpf,login,senha});
    if (error) {
        res.status(400).json({error:'Dados de clientes invalidos'})
        return;
    }
    bcrypt.hash(senha,10,(err,hash) => {
        if(err){
            console.error('Erro ao criptografar a senha:',err);
            res.status(500).json({error:'Erro interno do servidor'});
            return;
        }
        const novoCliente ={
            nome,
            endereco,
            bairro,
            cep,
            cpf,
            login,
            senha: hash
        };
        db.query('INSERT INTO cliente SET ?',novoCliente,(err,result)=>{
            if (err) {
                console.error('Erro ao adicionar Cliente:',err);
                res.status(500).json({error: 'Erro interno do servidor'});
                return;
            }
            res.json({message: 'Cliente adcionado com sucesso'})
        });
    });
};

exports.atualizarCliente= (req,res)=>{
    const{cpf} = req.params;
    const{nome,endereco,bairro,cep,login,senha} = req.body;

    const{eror}= clientSchema.validate({nome,endereco,bairro,cep,cpf,login,senha});
    if(error){
        res.status(400).json({error: 'Dados de clientes invalidos'});
        return;
    }
    bcrypt.hash(senha,10,(err,hash)=>{
        if(err){
        console.error('Erro ao criptografar a senha:',err);
        res.status(500).json({error:'erro interno no servidor'});
        return;};
        const clienteAtualizado ={
            nome,
            endereco,
            bairro,
            cep,
            login,
            senha: hash}
        db.query('UPDATE cliente SET ? WHERE cpf=?',[clienteAtualizado,cpf],(err,result)=>{
            if(err){
                console.error('Erro ao atualizar o cliente',err);
                res.status(500).json({error: 'Erro  interno do servidor'});
                return;
            }
            res.json({message: 'Cliente atualizado com sucesso'});
        });
    });

};
exports.deletarCliente = (req,res)=>{
    const{ cpf} =req.params;
    db.query('DELET FROM cliente WHERE cpf=?',cpf,(err,result)=>{
        if(err){
            console.error('Erro ao deletar cliente:',err);
            res.status(500).json({error: 'Erro interno no servidor'});
            return;
        }
        res.json({message:'Cliente deletado com sucesso'});
    });
};