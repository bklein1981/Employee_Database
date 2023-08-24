//const inquirer = require('inquirer');

// View All Departments
//     Presented with formatted table showing department names and ids
// View All Roles
//     Presented with formatted table showing job title, role id, department of role and salary
// Veiw All Employees
//     Presented with formatted table showing employee id, first and last name, job title, dempartment salary and manager
// Add a Department
//     Prompted to eneter a name for the department
// Add a Role
//     Prompted to enter a name, salary, and department for the role
// Add an Employee
//     Prompted to enter an employee’s first name, last name, role, and manager
// Update an employee role
//     Prompted to select an employee to update and their new role

const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'blue_cow4',
      database: 'employee_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );
    newTitle = 5;
    newSalary = 6;
    deptID = 7,
  db.query('DELETE FROM departments WHERE id = 6', function (err, results) {
    console.log(results);
  });