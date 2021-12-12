const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const util = require('util');
require('dotenv').config();

const dbQueries = require("./db/queries");
const req = require("express/lib/request");

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

// db.query = util.promisify(db.query);

// Begin the application after establishing the connection.
db.connect(function (err) {
    if (err) throw err;
    afterConnection();
})

afterConnection = () =>  {
  console.log("***********************************")
  console.log("*                                 *")
  console.log("*        EMPLOYEE MANAGER         *")
  console.log("*                                 *")
  console.log("***********************************")
  init();
};

let queries = new dbQueries(db)

const init = async() => {
  try {
let answer = await inquirer.prompt({
  name: 'options',
  type: 'list',
  message: "what would you like to do?",
  choices: [
    "View all departments",
    "View all employees",
    "View all roles",
    "View employees by department",
    "View total utilized budget of a department",
    "Add Department",
    "Add Role",
    "Add Employee",
    "Update employee role",
    "Update employee manager",
    "Delete employee",
    "Delete role",
    "Delete department",
    "Quit"
  ],
 
})

// switch statement to select choice to be executed
    switch(answer.options){
        case "View all departments":
          queries.viewDepartments();
          init()
          break;
        case "View all employees":
          queries.viewEmployees();
          init()
          break;
        case "View all roles":
          queries.viewRoles();
          init()
          break;
        case "View employees by department":
          viewEmployeesByDepartment();
          break;
        case "View total utilized budget of a department":
          viewDepartmentBudget()
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update employee role":
          updateEmployeeRole()
          break;
        case "Update employee manager":
        updateEmployeeManager()
        break;
        case "Delete employee":
          deleteEmployee()
        break;
        case "Delete role":
          deleteRole()
        break;
        case "Delete department":
          deleteDepartment()
        break;
        default:
          db.end();
      }
    } catch (err) {
      console.log(err);
      init();
  };
}




// ------------------------------------------------------------ VIEW --------------------------------------------------------------------------- //

async function viewEmployeesByDepartment() {
  const departmentChoice = await queries.departmentChoice()
  inquirer
   .prompt([
    {
      type: "list",
      message: "which department would you like to view your employee in?",
      choices: departmentChoice,
      name: "department"
    },
  ])
  .then((response)=> {
    queries.viewEmployeesByDepartment(
      response.department,
      init()
    )
    
  })
}


async function viewEmployeeByManager() {
const employeeChoice = await queries.employeesChoice()
inquirer
 .prompt([
   {
     type: "list",
     message: "which manager would you like to view the employee of?",
     choices: employeeChoice,
     name: "manager",
   },
  ])
   .then ((response) => {
     queries.viewByManager(
       response.manager,
       init()
     )
   })
  }
//----------------------------------------------------- ADD---------------------------------------------//

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the name of the new department",
        name: "newDep"
      },
    ]).then((response) => {
      console.log(response.newDep)
      queries.addDepartment(response.newDep, init());

    })

}

async function addEmployee() {

  let roles = await queries.rolesChoice();

  let managers = await queries.employeesChoice();

  let response = await inquirer.prompt([
    {

      name: 'firstName',
      type: 'input',
      message: 'What is the first name of this Employee?',
      validate: addFirst => {
        if (addFirst) {
          return true;
        } else {
          console.log('Please enter a first name');
          return false;
        }
      }
    },
    {
      name: 'lastName',
      type: 'input',
      message: 'What is the last name of this Employee?',
      validate: addLast => {
        if (addLast) {
          return true;
        } else {
          console.log('Please enter a last name');
          return false;
        }
      }
    },
    {
      name: 'employeeRoleId',
      type: 'list',
      choices: roles,
      message: "What is this Employee's role id?",
    },
    {
      name: 'employeeManagerId',
      type: 'list',
      choices: managers,
      message: "What is this Employee's Manager's Id?"
    }
  ])
   
    .then((response) => queries.newEmployee(response.firstName, response.lastName, response.employeeRoleId, response.employeeManagerId))
  {
    init()
  }

};



async function addRole() {
  let department = await queries.departmentChoice();
  inquirer 
  .prompt([
      {
          name: 'newRole',
          type: 'input', 
          message: "What new role would you like to add?"
      },
      {
          name: 'salary',
          type: 'input',
          message: 'What is the salary of this role?',
          validate: addSalary => {
            let parsed = parseInt(addSalary)
            if (isNaN(parsed)) {
              console.log('Please enter a number');
              return false ;
            } else {
              return true;
            }
          }
      },
      {
          name: 'department',
          type: 'list',
          choices: department,
          message: 'what department does this role belong to?'
  }

])

.then((response) => queries.newRole(response.newRole, response.salary, response.department, init())

)};


//---------------------------------------------- UPDATE-----------------------------------------------------------//


async function updateEmployee(){
  
}


init();
