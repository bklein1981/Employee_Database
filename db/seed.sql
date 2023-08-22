INSERT INTO department (department_name)
VALUES  ('History'),
        ('Philosophy'),
        ('Psychology');

INSERT INTO role (title, salary, department_id)
VALUES  ('Professor', 70000.0, 1),
        ('Associate Professor', 60000.0, 1),
        ('Adjunct Professor', 50000.0, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Johnson', 1, 1),
        ('Dave', 'Davidson', 2 , 1),
        ('Jan', 'Janson', 3, 1);