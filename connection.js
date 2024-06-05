const mysql = require('mysql')

var connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'bhavesh2603@mysql',
    database: 'consultancywebsite'
});

connection.connect((err) => {
    if(!err){
        console.log('Database is connected!')
    }
    else{
        console.log(err);
    }
});

module.exports = connection;