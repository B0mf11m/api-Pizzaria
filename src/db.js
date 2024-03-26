const mysql = require ('mysql');

const db = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database:  'pizzariam',
});
db.connect((err) => {
    if(err){
        console.error('Erro ao conectar ao MySQL',err);
    }else{
        console.error('Conectado ao MySQL');
    }
})

module.exports = db;