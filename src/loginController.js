const db= require('./db');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET= 'bomfim';

exports.loginCliente= (req,res)=>{
    const{login,senha} = req.body;
    db.query('SELECT * FROM cliente WHERE login=?',login,(err,results)=>{
        if(err){
            console.error('Erro ao buscar cliente:',err);
            res.status(500).json({error: 'erro interno no servidor'});
            return;
        }
        if(results.length === 0){
            res.status(404).json({ erro: 'Cliente não encontrado' });
            return;
        }
        const cliente = results[0]
        bcrypt.compare(senha,cliente.senha,(err,passwordMatch)=>{
            if(err || !passwordMatch){
                res.status(401).json({error:'Credenciais invalidas'});

            }else{
                const token= jwt.sign({cpf:cliente.login},SECRET,{expiresIn:'1h'});
                res.status(200).json({
                    auth: true,
                    token,
                    message: 'Usuario logado'
                });
            }
        });
    });
};
exports.autenticartoken=(req,res,next)=>{
    const token= req.header('Autorization');
    if(!token){
        return res.status(401).json({error: 'Token não fornecido'});
    }
    jwt.verify(token,SECRET,(err,decoded)=>{
        if(err){
            res.status(401).json({error: 'token invalido'});
    
        }
        req.usuario=decoded;
        next;
    });
}