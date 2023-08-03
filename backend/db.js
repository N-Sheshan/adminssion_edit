const mysql = require('mysql')
const pool = mysql.createConnection({
    connectionLimit :100,
    host : 'localhost',
    user : 'root',
    password : '',
    database :'postform'
})
module.exports=pool;