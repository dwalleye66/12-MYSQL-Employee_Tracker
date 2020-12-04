//--Dependencies--//
const inquirer = require("inquirer");
const mysql = require("mysql");
const { start } = require("repl");

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
        else if (answer.choice === "Update Employee?") {
            updateEmployee();
        }
        else if (answer.choice === "Add Employee?") {
            addEmployee();
        }           
        else if (answer.choice === "Add Role?") {
            addRole();
        }           
        else if (answer.choice === "Add Department?") {
            addDepartment();
        } else{
          connection.end();  
        }
    }) 
}
//======View All Employees==========//
function viewAllEmployees() {
    connection.query()
}


