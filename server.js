const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
require('dotenv').config();

const dbQueries = require("./db/queries");
// const req = require("express/lib/request");

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

  async function viewDepartmentBudget() {
    const departmentChoice = await queries.departmentChoice();
    inquirer
    .prompt([
      {
        type: "list",
        message: "what department would you like to view the total utilised budget for?",
        choices: departmentChoice,
        name: "department",
      },
    ])
      .then ((response) => {
        queries.viewBudget(
          response.department,
          init()
        )  
      })
      
  }
//----------------------------------------------------------- ADD --------------------------------------------------------------------------------//

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

    inquirer
    .prompt([
    {
      type: 'input',
      message: "What is the new employee's first name?",
      name: 'firstName',
    },
    {
      type: 'input',
      message: "What is the new employee's last name?",
      name: 'lastName',
    },
    {
      type: 'list',
      message: "What is the new employee's role?",
      choices: roles,
      name: 'employeeRoleId',
    },
    {
      type: 'list',
      message: "What is the new employee's manager?",
      choices: managers,
      name:  'employeeManagerId',
    }
  ])
    .then((response) => queries.newEmployee(response.firstName, response.lastName, response.employeeRoleId, response.employeeManagerId, init())
    )};


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


//------------------------------------------------------------ UPDATE ----------------------------------------------------------------------------//


async function updateEmployeeRole() {
  const roleChoices = await queries.rolesChoice();
  const employeeChoices = await queries.employeesChoice();
  inquirer
    .prompt([
    {
      type: 'list',
      message: "Which employee would you like to update the role of?",
      choices: employeeChoices,
      name: 'employee',
    },
    {
      type: 'list',
      message: "What would you like the employee's new role to be?",
      choices: roleChoices,
      name: 'role',
    },
  ])
    .then((response) => {
      queries.updateEmployeeRole(
        response.employee, 
        response.role, 
        init()
        );
  });
}

async function updateEmployeeManager() {
  const employeeChoices = await queries.employeesChoice();
  inquirer
    .prompt([
    {
      type: 'list',
      message: "Which employee would you like to update the manager of?",
      choices: employeeChoices,
      name: 'employee',
    },
    {
      type: 'list',
      message: "Who would you like the employee's new manager to be?",
      choices: employeeChoices,
      name: 'manager',
    },
  ])
    .then((response) => {
      queries.updateEmployeeManager(
        response.employee, 
        response.manager, 
        init()
        );
  });
}  

// ------------------------------------------------------------ DELETE --------------------------------------------------------------------------- //

async function deleteRole() {
  const roleChoices = await queries.rolesChoice();
  inquirer
    .prompt([
    {
      type: 'list',
      message: "Which role would you like to delete?",
      choices: roleChoices,
      name: 'role',
    },
  ])
    .then((response) => {
      queries.deleteRole(
        response.role, 
        init()
      );
  });
}

async function deleteEmployee() {
  const employeeChoices = await queries.employeesChoice();
  inquirer
    .prompt([
    {
      type: 'list',
      message: "Which employee would you like to delete?",
      choices: employeeChoices,
      name: 'employee',
    },
  ])
    .then((response) => {
      queries.deleteEmployee(
        response.employee, 
        init()
      );
  });
}

async function deleteDepartment() {
  const departmentChoices = await queries.departmentChoice();
  inquirer
    .prompt([
    {
      type: 'list',
      message: "Which department would you like to delete?",
      choices: departmentChoices,
      name: 'department',
    },
  ])
    .then((response) => {
      queries.deleteDepartment(
        response.department, 
        init()
      );
  });
}

// init()