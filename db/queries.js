const consoleTable = require("console.table");

class Queries {
    constructor(db) {
        this.db = db;
    }

    // ----------------------------------------------- VIEW -----------------------------------------------------------------//

    viewDepartments() {
        this.db.query('SELECT * FROM departments', function (err, results) {
            console.log(`\n`);
            console.table(results);
        });
    }

    viewEmployees() {
        this.db.query('SELECT * FROM employees', function (err, results) {
            console.log(`\n`);
            console.table(results);
        });
    }

    viewRoles() {
        this.db.query('SELECT * FROM roles', function (err, results) {
            console.log(`\n`);
            console.table(results);
        });
    }

    viewEmployeesByDepartment(departmentId) {
        this.db.query(`SELECT * FROM employees JOIN roles ON employees.role_id = roles.id WHERE roles.department_id = ${departmentId}`, function (err, results) {
            console.log(`\n`);
            console.table(results);
            console.log(`\n`);
            console.log(`\n`);
            console.log(`\n`);
            console.log(`\n`);
        })
    }

    viewBudget(department){
        this.db.query(`SELECT SUM(roles.salary) AS "Total Utilised Budget" FROM employees JOIN roles ON employees.roles_id = roles.id WHERE roles.departments_id = ${department};`, function (err, result) {
            console.log(`\n`);
            console.table(result);
            console.log(`\n`);
            console.log(`\n`);
            console.log(`\n`);
            console.log(`\n`);
            
        }); 
    }

    // -------------------------------------------------------- ADD ----------------------------------------------------------------------------- //

    addDepartment(name) {
        this.db.query(`INSERT INTO departments(name) VALUES ("${name}")`, function (err, results) {
            if (err) {
                throw err;
            } else {
                console.log("department added into the database")
            }
        }
        )
    }

    newEmployee(firstName, lastName, employeeRoleId, employeeManagerId) {
        this.db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employeeRoleId}", "${employeeManagerId}");`, function (err, result) {
            if (err) {
                console.error(err)
            } else {
                console.log(`Database updated with new employee.`)
                console.log(`"${firstName}", "${lastName}" added successfully.\n`)
                console.log(`\n`);
            };
        });
    }

    newRole(title, salary, department){
        this.db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${title}", ${salary}, ${department});`, function (err, result) {
            if (err) {
                console.error(err)
            } else {
                console.log(`Database updated with new role.`)
                console.log(`"${title}" added successfully.\n`)
                console.log(`\n`);
            };
        });

    }
    

    // ------------------------------------------------------- UPDATE ---------------------------------------------------------------//


    updateEmployeeRole(id, role){
        this.db.query(`UPDATE employees SET role_id = ${role} WHERE id = ${id};`, function (err, result) {
            if (err) {
                console.error(err)
            } else {
                console.log(`\n`);
                console.log(`Employee records updated.`)
                console.log(`\n`);
                console.log(`\n`);
                console.log(`\n`);
                console.log(`\n`);
            }
        
        }); 
    }

    updateEmployeeManager(id, manager){
        this.db.query(`UPDATE employees SET manager_id = ${manager} WHERE id = ${id};`, function (err, result) {
            if (err) {
                console.error(err)
            } else {
                console.log(`\n`);
                console.log(`Employee records updated.`)
                console.log(`\n`);
                console.log(`\n`);
                console.log(`\n`);
                console.log(`\n`);
            }
        }); 
      
    }

    // --------------------------------------------------------------  DELETE --------------------------------------------------------------------//

    deleteDepartment(department) {
        this.db.query(`DELETE FROM departments WHERE id = ${department}`, function (err, result) {
            if (err) {
                console.error(err)
            } else {
                console.log(`\n`);
                console.log("department deleted from the database.")
                console.log(`\n`);
                console.log(`\n`);
                console.log(`\n`);
                console.log(`\n`);
            }
        }); 
    }
      
     
    deleteRole(role) {
        this.db.query(`DELETE FROM roles WHERE id = ${role}`, function (err, result) {
            if (err) {
                console.error(err)
            } else {
                console.log(`\n`);
                console.log("role deleted from the database.")
                console.log(`\n`);
                console.log(`\n`);
                console.log(`\n`);
                console.log(`\n`);
            }
        
        }); 
    }

    deleteEmployee(employee) {
        this.db.query(`DELETE FROM employees WHERE id = ${employee}`, function (err, result) {
            if (err) {
                console.error(err)
            } else {
                console.log(`\n`);
                console.log("employee deleted from the database.")
                console.log(`\n`);
                console.log(`\n`);
                console.log(`\n`);
                console.log(`\n`);
            }
        }); 
    }

 
    // ------------------------------------------------------ MAPPING TABLES--------------------------------------------------------//

    async rolesChoice() {
        const [data] = await this.db.promise()
        .query('SELECT id, title FROM roles;');
        
    const roles = data.map(result => { return {name: result.title, value: result.id} })
    return roles;
    
}

    async employeesChoice() {
        const [data] = await this.db.promise()
        .query('SELECT id, first_name, last_name FROM employees;');
        
    const managers = data.map(result => { return {name: `${result.first_name} ${result.last_name}`, value: result.id} })
    return managers;
    
}

    async departmentChoice() {
       const [data] = await this.db.promise()
       .query('SELECT * FROM departments;');
    
    const department = data.map(result => { return {name: result.name, value: result.id} })
    return department;

}

}
 

module.exports = Queries;