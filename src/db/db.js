// dbConfig.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'teste',
  port: 3306,
});

function executeQuery(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
        
      }
      console.log('Conectado Mysql!')
    });
  });
}

module.exports = { connection, executeQuery };
