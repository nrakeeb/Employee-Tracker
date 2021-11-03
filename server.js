const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

const dbQueries = require("./db/queries");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

let queries = new dbQueries(db)

const chooseOption = {
  type: 'list',
  message: "what would you like to do?",
  choices: [
    "View all departments",
    "View all employees",
    "View all roles",
    "View employees by department",
    "View employee by manager",
    "View total utilized budget of a department",
    "Add department",
    "Add Employee",
    "Add Role",
    "Update employee role",
    "Update employee manager",
    "Delete employee",
    "Delete role",
    "Delete department",
    "Quit"
  ],
  name: 'options',
}

// switch statement to select choice to be executed
function init() {
  inquirer.prompt(chooseOption)
    .then(async response => {
      switch (response.options) {
        case "View all departments":
          queries.viewDepartments(db);
          break;
        case "View all employees":
          queries.viewEmployees(db);
          break;
        case "View all roles":
          queries.viewRoles(db);
          break;
        default:
          db.end();
      }
    });
}

init()