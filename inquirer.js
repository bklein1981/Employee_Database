//calling required modules
const inquirer = require('inquirer');
const mysql = require('mysql2');

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


//SQL query for viewing departments
const viewAllDept = async () => {
  const [rows, fields] = await db.promise().query(`SELECT * FROM departments`)
  console.table(rows);
  init();
}

//SQL query for viewing all employees
const viewAllEmp = async () => {
  console.log('function viewAllEmp is running')
  const[rows, fields] = await db.promise().query(`SELECT employees.id AS ID, employees.first_name AS FirstName, employees.last_name AS LastName, roles.title AS Title, 
  departments.department_name AS Department, roles.salary AS Salary, CONCAT (managers.first_name,' ',managers.last_name) AS manager_name FROM employees
  LEFT JOIN roles ON employees.role_id = roles.id
  LEFT JOIN employees AS managers ON managers.id = employees.manager_id
  LEFT JOIN departments ON roles.department_id = departments.id;`)
  console.table(rows);
  init();
  }

 //Question list and SQL query for creating new department 
  const deptQuestion = [
    {
      type: 'input',
      name: 'deptAdd',
      message: 'What is the name of the department?'
    } 
  ];
const createDept = async () => {
  console.log('createDept is running');
  let answer = await inquirer.prompt(deptQuestion)
  db.query(`INSERT INTO departments (department_name) Values (?)`, [answer.deptAdd])
  init();
};

const roleParse = async () => { const [rows] = await db.promise().execute(`SELECT title FROM roles`)

  const myArray = rows.map(element => element.title);
  console.log(myArray)
 }

// Questions and SQL query for creating new roles
const roleQuestions = [
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
    choices: `[]`
  } 
];
const createRole = async () => {
  console.log('createRole is running');
  let answer = await inquirer.prompt(roleQuestions)
  db.query(`INSERT INTO roles (title, salary, department_id) Values (?,?,?)`, [answer.roleName, answer.roleSalary, answer.roleDept])
  init();
};

//Questions and SQL queries for creating new employees
const employeeQuestion = [
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
  type: 'input',
  name: 'role',
  message: `What is the new employee's role?`,
},
{
  type: 'input',
  name: 'manager',
  message: `Who is the employee's new manager?`,
}  
];
const createEmployee = async () => {
  let answer = await inquirer.prompt(employeeQuestion)
  db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) Values (?,?,?,?)`, [answer.firstName, answer.lastName, answer.role, answer.manager])
  init();
};

//Questions and SQL query for updating employee role
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
  init();
}

//Main menu questions
const mainMenuQuestions = [
  {
   type: 'list',
   name: 'userAction',
   message: 'What would you like to do?',
   choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
  },
];

//initialization function
const init = () => {
inquirer
  .prompt(mainMenuQuestions
  ).then (answers => {
    if (answers.userAction ==="View All Departments") {
    viewAllDept()
    };
    if (answers.userAction ==="View All Employees") {
      viewAllEmp() 
    };
    if(answers.userAction ==="Add a Department") {
      createDept();
    };
    if(answers.userAction ==="Add a Role") {
      createRole();
    };
    if(answers.userAction ==="Add an Employee") {
      createEmployee();
    };
    if(answers.userAction ==="Update an Employee Role") {
      employeeUpdate();
    }
  })

}

//calling init function on startup
init();
