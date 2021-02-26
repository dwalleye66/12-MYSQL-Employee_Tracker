const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_tracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

function start() {
  inquirer
    .prompt({
      name: "purpose",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "View all Departments",
        "View all Roles",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Role",
        "Done",
      ],
    })
    .then(function (answer) {
      // based on their answer, call corresponding function
      if (answer.purpose === "View all Employees") {
        viewAllEmp();
      } else if (answer.purpose === "View all Departments") {
        viewAllDept();
      } else if (answer.purpose === "View all Roles") {
        viewAllRoles();
      } else if (answer.purpose === "Add Employee") {
        addEmp();
      } else if (answer.purpose === "Add Department") {
        addDept();
      } else if (answer.purpose === "Add Role") {
        addRole();
      } else if (answer.purpose === "Update Employee Role") {
        updateRole();
      } else if (answer.purpose === "Done") {
        connection.end();
      } else {
        connection.end();
      }
    });
}

// function to view all employees
function viewAllEmp() {
  connection.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
  });
  start();
}

// function to view employees by department
function viewAllDept() {
  connection.query("SELECT * FROM department", function (err, results) {
    console.table(results);
  });
  start();
}

// function to view all roles
function viewAllRoles() {
  connection.query("SELECT * FROM role", function (err, results) {
    console.table(results);
  });
  start();
}

// function to add new employee
function addEmp() {
  connection.query("SELECT * FROM employee", function (err, results) {
    inquirer
      .prompt([
        {
          name: "firstname",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "lastname",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "role",
          type: "input",
          message: "What is this employee's role ID?",
        },
        {
          name: "manager",
          type: "input",
          message: "What is this employee's manager's ID?",
        },
      ])
      .then(function (answer) {
        // when finished prompting, insert a new item into the db with info
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.firstname,
            last_name: answer.lastname,
            role_id: answer.role,
            manager_id: answer.manager,
          },
          function (err) {
            if (err) throw err;
            console.log("Employee was added successfully!");
            // re-prompt the user for next step
            start();
          }
        );
      });
  });
}

// function to add new department
function addDept() {
  connection.query("SELECT * FROM department  ", function (err, results) {
    inquirer
      .prompt([
        {
          name: "deptname",
          type: "input",
          message: "What department are you adding?",
        },
      ])
      .then(function (answer) {
        // when finished prompting, insert a new item into the db with info
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: answer.deptname,
          },
          function (err) {
            if (err) throw err;
            console.log("Department was added successfully!");
            // re-prompt the user for next step
            start();
          }
        );
      });
  });
}

// function to add new employee
function addRole() {
  connection.query("SELECT * FROM role  ", function (err, results) {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What role are you adding?",
        },
        {
          name: "salary",
          type: "input",
          message:
            "What is the salary for this role? Please do not include $ or any commas.",
        },
        {
          name: "deptid",
          type: "input",
          message: "What is the department ID for this role?",
        },
      ])
      .then(function (answer) {
        // when finished prompting, insert a new item into the db with info
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.deptid,
          },
          function (err) {
            if (err) throw err;
            console.log("Role was added successfully!");
            // re-prompt the user for next step
            start();
          }
        );
      });
  });
}

// function to update an employee's role
function updateRole() {
  connection.query("SELECT * FROM employee", function (err, employeeData) {
    connection.query("SELECT * FROM role", function (err, roleData) {
      const allEmp = employeeData.map(
        (employee) => employee.first_name + " " + employee.last_name
      );
      const allRoles = roleData.map((role) => role.title);
      inquirer
        .prompt([
          {
            name: "selectemp",
            type: "list",
            message: "Please select which employee you would like to update.",
            choices: allEmp,
          },
          {
            name: "changerole",
            type: "list",
            message: "Please select the employee's new role.",
            choices: allRoles,
          },
        ])
        .then(function (answer) {
          const empObject = employeeData.find(
            (employee) =>
              employee.first_name + " " + employee.last_name ===
              answer.selectemp
          );
          const roleObject = roleData.find(
            (role) => role.title === answer.changerole
          );

          connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleObject.id, empObject.id],
            function (err) {
              if (err) throw err;
              console.log("Updated!");
            }
          );
          start();
        });
    });
  });