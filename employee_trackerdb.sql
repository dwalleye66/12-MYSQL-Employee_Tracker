DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

Use employee_tracker_db;

CREATE TABLE department(
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, 
name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, 
title VARCHAR(30) NOT NULL, 
salary DECIMAL NOT NULL, 
department_id INT NOT NULL
);

CREATE TABLE employee(
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, 
first_name VARCHAR(30) NOT NULL, 
last_name VARCHAR(30) NOT NULL, 
role_id INT NOT NULL, 
manager_id INT
);

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Con Artist", 75000 , 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Darin", "Wallace", 1);