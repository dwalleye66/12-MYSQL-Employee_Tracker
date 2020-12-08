//--Dependencies--//
const inquirer = require("inquirer");
const mysql = require("mysql");
const { start } = require("repl");
const consoleTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Employees?",
                "View All Employees By Roles?",
                "View all Employees By Departments?",
                "Update Employee?",
                "Add Employee?",
                "Add Role?",
                "Add Department?"
            ]
        }    
    ])
    .then(function(answer) {
        if (answer.choice === "View All Employees?") {
            viewAllEmployees();
        }
        else if (answer.choice === "View All Employees By Roles?") {
            viewAllEmployeesByRoles();
        }
        else if (answer.choice === "View All Employees By Department?") {
            viewAllEmployeesByDepartments();
        }
        else if (answer.choice === "Add Department?") {
            addDepartment();
        }
        else if (answer.choice === "Add Employee?") {
            addEmployee();
        }           
        else if (answer.choice === "Add Role?") {
            addRole();
        }           
        else if (answer.choice === "Update Employee Role?") {
            updateEmployeeRole();
        } else{
          connection.end();  
        }
    }) 
}
//======View All Employees==========//
function viewAllEmployees() {
    let query = `SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title, department.name, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
  FROM employee
  LEFT JOIN role ON employee.role_id=role.id
  LEFT JOIN department ON department_id=department.id
  LEFT JOIN employee AS manager ON employee.manager_id=manager.id
  ORDER BY employee.id;`;
  connection.query(query, function(err, res){
    if(err) throw err;
    console.table(res);
    start();
  });
}

function viewAllEmployeesByRoles() {
  let query = `SELECT role.id, title, salary, department.name as department
  FROM role
  LEFT JOIN department ON role.department_id=department.id`;
  connection.query(query, function(err, res) {
    if(err) throw err;
    console.table(res);
    start();
  });
}

function viewAllEmployeesByDepartments() {
  let query = `SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title, department.name, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
  FROM employee
  LEFT JOIN role ON employee.role_id=role.id
  LEFT JOIN department ON department_id=department.id
  LEFT JOIN employee AS manager ON employee.manager_id=manager.id
  ORDER BY department.name;`;
  connection.query(query, function(err, res) {
    if(err) throw err;
    console.table(res);
    start();
  });
}

function addEmployee(roles, managers) {
  inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is the first name of the employee?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the last name of the employee?",
    },
    {
      name: "role",
      type: "list",
      message: "What is the role of the employee?",
      choices: roles
    },
    {
      name: "manager",
      type: "list",
      message: "Who is their manager?",
      choices: managers
    }]).then(function({firstName, lastName, role, manager}) {
          query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?)`;
      let role_id = role.split(', ')[1];
      let manager_id = manager.split(', ')[1];
      connection.query(query, [firstName, lastName, role_id, manager_id], function(err, res) {
        if(err) throw err;
        start();
      });
    });
}

function addRole(departments) {
  inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "What is the title of the role?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary of this role? (Use ###.## format)",
    },
    {
      name: "department",
      type: "list",
      message: "Which department will this be apart of?",
      choices: departments
    }]).then(function({title, salary, department}) {
      query = `INSERT INTO role (title, salary, department_id)
      VALUES (?, ?, ?)`;
      let department_id = department.split(', ')[1];
      connection.query(query, [title, salary, department_id], function(err, res) {
        if(err) throw err;
        start();
      });
    });
}

function addDepartment() {
  inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "What is the name of this department?",
    }]).then(function({name}) {
      query = `INSERT INTO department (name)
      VALUES (?)`;
      connection.query(query, [name], function(err, res) {
        if(err) throw err;
        start();
      });
    });
}

function getEmployeeRole() {
  let query = `SELECT role.id, title, salary, department.name as department
  FROM role
  LEFT JOIN department ON role.department_id=department.id`;
  let roles = [];
  connection.query(query, function(err, res) {
    if(err) throw err;
    res.forEach(role => {
      roles.push(`${role.title}, ${role.id}`);
    });
  });
  return roles;
}

function getDepartment() {
  let query = `SELECT department.id, department.name
  FROM department`
  let departments = [];
  connection.query(query, function(err, res) {
    if(err) throw err;
    res.forEach(department => {
      departments.push(`${department.name}, ${department.id}`);
    });
  });
  return departments;
}

function getEmployee() {
  let query = `SELECT employee.id, employee.first_name, employee.last_name
  FROM employee`;
  let employees = [];
  connection.query(query, function(err, res) {
    if(err) throw err;
    res.forEach(employee => {
      employees.push(`${employee.first_name}, ${employee.last_name}, ${employee.id}`);
    });
  });
  console.log(employees);
  return employees;
}

function updateEmployeeRole(employees, roles) {
  inquirer.prompt([
    {
      name: "yesOrNo",
      type: "confirm",
      message: "Are you sure you want to change the employee role? (If no, it won't add the information after)."
    },
    {
      name: "employee",
      type: "list",
      message: "Which employee would you like to change?",
      choices: employees
    },
    {
      name: "role",
      type: "list",
      message: "Which role would you like them to have?",
      choices: roles
    }]).then(function( {yesOrNo, employee, role} ) {
      let employee_id = employee.split(', ')[2];
      let role_id = role.split(', ')[1];
      if(yesOrNo === true) {
        query = `UPDATE employee
        SET role_id = ?
        WHERE id = ?`;
        connection.query(query, [role_id, employee_id], function(err, res) {
          if(err) throw err;
          start();
        });
      } else {
        start();
      }
  });
}
}


