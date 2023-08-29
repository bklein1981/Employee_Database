const mysql = require('mysql2');
const { init } = require('./inquirer');

//establish connection
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: 'blue_cow4',
    database: 'employee_db'
  },
  console.log(`Connected to the classlist_db database.`)
);

init(db);