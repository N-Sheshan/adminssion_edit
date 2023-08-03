const pool = require('../../bd');
const query = require('./queries')
const mysql = require('mysql')


const getdata=(req,res)=>{
    pool.getConnection((err,result)=>{
        if (err) throw err
        console.log(`connected as id`)
        result.query('SELECT * FROM hsc_aca',(err,rows)=>{
            if(!err){
                res.send(rows)
            }else {
                console.log(err)
            }
        })
    })
}


module.exports = {
    getdata,
}

