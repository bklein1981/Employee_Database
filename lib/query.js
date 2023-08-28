const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: 'blue_cow4',
    database: 'employee_db'
  },
  console.log(`Connected to the classlist_db database.`)
);

const updateQuestion =[
  {
    type: 'input',
    name: 'employee',
    message: `Which employees role do you want to update?`,
  },
  {
    type: 'input',
    name: 'role',
    message: `Which role do you want to assign to the selected employee?`,
  }   
]
const employeeUpdate = async () => {
  let answer = await inquirer.prompt(updateQuestion)
  db.query(`Update employees SET role_id = ? WHERE id = ?`, [answer.role, answer.employee])
}

module.exports = {employeeUpdate}