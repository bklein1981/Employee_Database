const inquirer = require('inquirer');

//SQL query for viewing departments
const viewAllDept = async (db) => {
  const [rows, fields] = await db.promise().query(`SELECT * FROM departments`)
  console.table(rows)
}

//SQL query for viewing all roles
const viewAllRoles = async (db) => {
  const [rows, fields] = await db.promise().query(`SELECT roles.id AS ID, roles.title AS Title, departments.department_name AS Department, roles.salary AS Salary
  FROM roles
  INNER JOIN departments ON roles.department_id = departments.id;`)
  console.table(rows);

}

//SQL query for viewing all employees
const viewAllEmp = async (db) => {
  const [rows, fields] = await db.promise().query(`SELECT employees.id AS ID, employees.first_name AS FirstName, employees.last_name AS LastName, roles.title AS Title, 
  departments.department_name AS Department, roles.salary AS Salary, CONCAT (managers.first_name,' ',managers.last_name) AS manager_name FROM employees
  LEFT JOIN roles ON employees.role_id = roles.id
  LEFT JOIN employees AS managers ON managers.id = employees.manager_id
  LEFT JOIN departments ON roles.department_id = departments.id;`)
  console.table(rows);
}

//Create new department 
const deptQuestion = [
  {
    type: 'input',
    name: 'deptAdd',
    message: 'What is the name of the department?'
  }
];
const createDept = async (db) => {
  let answer = await inquirer.prompt(deptQuestion)
  db.query(`INSERT INTO departments (department_name) Values (?)`, [answer.deptAdd])
};

//Create new role
const getRoleQuestions = async (db) => {
  const [rows] = await db.promise().execute(`SELECT * FROM departments`)

  const myArray = rows.map(element => ({
    name: element.department_name,
    value: element.id
  }));
  return [
    {
      type: 'input',
      name: 'roleName',
      message: 'What is the name of the role?'
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'What is the salary for the role?'
    },
    {
      type: 'list',
      name: 'roleDept',
      message: 'Which department does the role belong to?',
      choices: myArray
    }
  ];
}
const createRole = async (db) => {
  let roleQs = await getRoleQuestions(db);
  let answer = await inquirer.prompt(roleQs)
  db.query(`INSERT INTO roles (title, salary, department_id) Values (?,?,?)`, [answer.roleName, answer.roleSalary, answer.roleDept])
};

//Create new employee
const employeeQuestion = async (db) => {

    const [role] = await db.promise().execute(`SELECT * FROM roles`);
    const [manager] = await db.promise().execute(`SELECT id, CONCAT (employees.first_name,' ',employees.last_name) AS manager_name FROM employees`);

    let roleArray = role.map (element => ({
      name: element.title,
      value: element.id
    }));
    let managerArray = manager.map (element => ({
      name: element.manager_name,
      value: element.id
    }))
    let noManger = {
      name: 'None',
      value: null
    }
    managerArray.push(noManger);
    console.log(managerArray)
return [
  {
    type: 'input',
    name: 'firstName',
    message: `What is new employee's first name?`
  },
  {
    type: 'input',
    name: 'lastName',
    message: `What is new employee's last name?`
  },
  {
    type: 'list',
    name: 'role',
    message: `What is the new employee's role?`,
    choices: roleArray
  },
  {
    type: 'list',
    name: 'manager',
    message: `Who is the employee's new manager?`,
    choices: managerArray,
  }
];
}

const createEmployee = async (db) => {
  let employeeQs = await employeeQuestion(db);
  let answer = await inquirer.prompt(employeeQs)
  db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) Values (?,?,?,?)`, [answer.firstName, answer.lastName, answer.role, answer.manager])
};

//Update an employee's role
const updateQuestion = async (db) => {
  const [employee] = await db.promise().execute(`SELECT id, CONCAT (employees.first_name,' ',employees.last_name) AS employee_name
  FROM employees`);
  const [role] = await db.promise().execute(`SELECT * FROM roles`);

  let employeeArray = employee.map(element => ({
    name: element.employee_name,
    value: element.id

  }))
  let roleArray = role.map(element => ({
    name: element.title,
    value: element.id
  }))
  return [
  {
    type: 'list',
    name: 'employee',
    message: `Which employees role do you want to update?`,
    choices: employeeArray
  },
  {
    type: 'list',
    name: 'role',
    message: `Which role do you want to assign to the selected employee?`,
    choices: roleArray
  }
]}
const employeeUpdate = async (db) => {
  let updateQs = await updateQuestion(db);
  let answer = await inquirer.prompt(updateQs)
  db.query(`Update employees SET role_id = ? WHERE id = ?`, [answer.role, answer.employee])
}


module.exports = {
  viewAllDept,
  viewAllRoles,
  viewAllEmp,
  createDept,
  createRole,
  createEmployee,
  employeeUpdate
}