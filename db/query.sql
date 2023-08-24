-- View All Departments
--     Presented with formatted table showing department names and ids
SELECT *
FROM departments;
-- View All Roles
--     Presented with formatted table showing job title, role id, department of role and salary
SELECT roles.id AS ID, roles.title AS Title, departments.department_name AS Department, roles.salary AS Salary
FROM roles
INNER JOIN departments ON roles.department_id = departments.id;
-- Veiw All Employees
--     Presented with formatted table showing employee id, first and last name, job title, dempartment salary and manager
SELECT employees.id AS ID, employees.first_name AS FirstName, employees.last_name AS LastName, roles.title AS Title, departments.department_name AS Department, roles.salary AS Salary, employees.manager_id
FROM employees
INNER JOIN roles ON employees.role_id = roles.id 
INNER JOIN departments ON roles.department_id = departments.id;


SELECT CONCAT(first_name, ' ', last_name) AS manager_name
FROM employees
WHERE employees.id = employees.manager_id
-- Add a Department
--     Prompted to enter a name for the department
INSERT INTO departments (department_name)
Values (?)
-- Add a Role
--     Prompted to enter a name, salary, and department for the role
INSERT INTO roles (title, salary, department_id) Values (?,?,?)
-- Add an Employee
--     Prompted to enter an employee’s first name, last name, role, and manager
INSERT INTO employees (first_name, last_name, role_id, manager_id) Values (?,?,?,?)
-- Update an employee role
--     Prompted to select an employee to update and their new role