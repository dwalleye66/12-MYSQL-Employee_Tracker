USE employee_tracker_DB;

INSERT INTO department (name)
VALUES 
    ("Human Resources"),
    ("Operations"),
    ("Accounting"),
    ("Information Technology");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Manager", 50000.00,1),
    ("Clerk", 30000.00,1);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES 
    ("Darin","Wallace",1,NULL),
    ("Joe","Biden",2,1);