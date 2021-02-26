-- CREATING OUR DATABASE --
DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

Use employee_tracker_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT, 
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  role_id INT NOT NULL, 
  manager_id INT, 
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Human Resources"), ("Legal"), ("Finance"), ("Artist");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", "100000", "7"), ("Software Developer", "70000", "2"), ("Lawyer", "60000", "3"), ("Lawyer", "60000", "4"), ("Actuary", "60000", "5"), ("Artist", "70000", "6"), ("Salesperson", "40000", "1");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Darin", "Wallace", "1"), ("Travis", "Morris", "2", "1"), ("Byron", "Ferguson", "3", "1"), ("Christopher", "Sinlasath", "4", "3"), ("Dirk", "Diggler", "5", "1"), ("George", "Michael", "Artist", "6", "1"), ("Warren", "Buffet", "1", "1");
-- Query for view all --
SELECT e.id, e.first_name, e.last_name, d.name AS department, r.title, r.salary, CONCAT_WS(" ", m.first_name, m.last_name) AS manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id ORDER BY e.id ASC;

-- Query for view all roles --
SELECT  r.id, r.title, r.salary, d.name as Department_Name FROM role AS r INNER JOIN department AS d ON r.department_id = d.id;

--Query for getting employees --
SELECT id, CONCAT_WS(' ', first_name, last_name) AS Employee_Name FROM employee

-- Query for updating --
UPDATE employee SET role_id = 3 WHERE id = 8;
UPDATE employee SET ? WHERE ?;

-- Query for Delete --
DELETE FROM department WHERE id = 13;