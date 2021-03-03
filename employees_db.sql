DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

Use employee_tracker_db;
git status
CREATE TABLE department (
department_id INT auto_increment NOT NULL PRIMARY KEY, 
name VARCHAR(30) NOT NULL
);


CREATE TABLE role (
role_id INT auto_increment NOT NULL PRIMARY KEY, 
title VARCHAR(30) NOT NULL, 
salary DECIMAL (10, 2) NOT NULL, 
department VARCHAR(30) NOT NULL, 
department_id INT NULL
);


CREATE TABLE employee (
employee_id INT NOT NULL PRIMARY KEY, 
first_name VARCHAR(30) NOT NULL, 
last_name VARCHAR(30) NOT NULL, 
role_id INT NULL, 
role VARCHAR(30), 
manager_id INT
);

