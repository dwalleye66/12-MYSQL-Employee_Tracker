INSERT INTO department (name)
VALUES 
("Sales"), 
("Legal"), 
("Finance"), 
("Manufacturing");

INSERT INTO role (title, salary, department)
VALUES 
("Software Developer", "70000", "Manufacturing"), 
("Mechanic", "60000", "Manufacturing"), 
("Lawyer", "80000", "Legal"), 
("Purchaser", "60000", "Finance"), 
("Con Artist", "70000", "sales"), 
("Sales person", "40000", "Sales");

INSERT INTO employee (employee_id, first_name, last_name, role_id)
VALUES 
(54867, "Darin", "Wallace", "Con Artist"),
(58976, "Travis", "Morris", "Purchaser"), 
(87564, "Byron", "Ferguson", "Software Developer"),
(42157, "Christopher", "Sinlasath", "Lawyer"),
(95345, "Warren", "Buffet", "Mechanic")
(24568, "Jill", "Pettis", "Sales Person");

