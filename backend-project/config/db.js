const mysql = require('mysql2');

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Your MySQL password
    database: 'EPMS'
});

module.exports = db;