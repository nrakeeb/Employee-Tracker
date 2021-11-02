const inquirer = require('inquirer');
const db= require ('./server')


const chooseOption = {
    type: 'list',
    message: "what would you like to do?",
    choices: [
        "View all departments",
        "View all employees",
        "View all roles",
        "View employees By department ",
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

// switch statements to select one of choices to be executed
function init() {
    inquirer.prompt (chooseOption)
    .then(response => {
        switch (response.options) {
            case "View all departments":
                console.log("hello")
                db
                break;
            case "View all employees":
                console.log("test")
                break;
        }
    });
}

init()



