INSERT INTO departments (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_id) VALUES
('Sales Lead', 100000.00, 1),
('Salesperson', 80000.00, 1),
('Lead Engineer', 150000.00, 2),
('Software Engineer', 120000.00, 2),
('Accountant', 125000.00, 3),
('Legal Team Lead', 250000.00, 4),
('Lawyer', 190000.00, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, 0),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodriguez', 3, 0),
('Kevin', 'Tupik', 4, 3),
('Malia', 'Brown', 5, 0),
('Sarah', 'Lourd', 6, 5),
('Tom', 'Allen', 7, 0),
('Samantha', 'Jones', 1, 7);
