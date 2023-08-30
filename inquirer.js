//calling required modules
const inquirer = require('inquirer');
const mysql = require('mysql2');
const query = require('./lib/query')


//Main menu questions
const mainMenuQuestions = [
  {
    type: 'list',
    name: 'userAction',
    message: `What would you like to do?`,
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit']
  },
];

//initialization function
const init = async (db) => {
  console.log(`\b`);
  const answers = await inquirer.prompt(mainMenuQuestions)
  console.log(`\b`);
  if (answers.userAction === "View All Departments") {
    await query.viewAllDept(db);
    init(db);
  };
  if (answers.userAction === "View All Roles") {
    await query.viewAllRoles(db);
    init(db);
  };
  if (answers.userAction === "View All Employees") {
    await query.viewAllEmp(db);
    init(db);
  };
  if (answers.userAction === "Add a Department") {
    await query.createDept(db);
    init(db);
  };
  if (answers.userAction === "Add a Role") {
    await query.createRole(db);
    init(db);
  };
  if (answers.userAction === "Add an Employee") {
    await query.createEmployee(db);
    init(db)
  };
  if (answers.userAction === "Update an Employee Role") {
    await query.employeeUpdate(db);
    init(db)
  };
  if (answers.userAction === "Quit") {
    console.log("Goodbye");
    process.exit(0);
  }
}



//calling init function on startup
module.exports = { init }
