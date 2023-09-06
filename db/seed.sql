INSERT INTO departments (department_name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales'),
        ('Maintenance');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Sales Lead', 60000, 4),
        ('Salesperson', 40000, 4),
        ('Lead Software Engineer', 100000.0, 1),
        ('Software Engineer', 80000.0, 1),
        ('Accounting Manager',90000, 2),
        ('Accounts Payable', 50000, 2),
        ('Corporate Counsel', 250000, 3),
        ('Paralegal', 75000, 3),
        ('Head Custodian', 50000, 5),
        ('Nigh Custodian', 40000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Delorean', 1, NULL),
        ('Dave', 'Thomas', 2 , 1),
        ('Janis', 'Joplin', 3, NULL),
        ('Alan', 'Parsons', 4, 3),
        ('Fred', 'Nietzsche', 4 , 3),
        ('Jack', 'Kennedy', 7, NULL),
        ('Paul', 'McCartney', 8, 6),
        ('Serena', 'Williams', 5, NULL),
        ('Thomas', 'Cruise', 6, 8),
        ('Bertram', 'Russel', 9, NULL);

