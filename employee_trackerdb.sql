-- CREATING OUR DATABASE --
DROP DATABASE IF EXISTS employee_tacker;

CREATE DATABASE employee_trackerDB;

Use employee_trackerDB;

-- CREATE TABLE "DEPARTMENT" -- 
CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
 );
 
-- CREATE TABLE "ROLE"
CREATE TABLE ROLE (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
  );
  
-- CREATE TABLE "EMPLOYEE"
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
  );
 
 -- DEPARTMENT INSERTS -----
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

-- ROLE INSERTS -------
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 190000, 4);

-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jessica", "Johnston", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tim", "Murrell", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Abigail","Kirk",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("David", "Harbert", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Dan", "Ediger", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Donovan", "Giron", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Carson", "Taggart", 2, 7);

-- CREATE SELCTION --
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


  

 
  
  