const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
require('dotenv').config();

const dbQueries = require("./db/queries");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
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
          init();
          break;
        case "View all employees":
          queries.viewEmployees(db);
          init();
          break;
        case "View all roles":
          queries.viewRoles(db);
          init();
          break;
        case "View employees by department":
          queries.viewEmployeesByDepartment(db, 2);
          init();
          break;
        default:
          db.end();
      }
    });
}

init();