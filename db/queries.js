const consoleTable = require("console.table");

class Queries {
    constructor(db) {
        this.db = db;
    }

    viewDepartments(db) {
        db.query('SELECT * FROM departments', function (err, results) {
            console.log(`\n`);
            console.table(results);
        });
    }

    viewEmployees(db) {
        db.query('SELECT * FROM employees', function (err, results) {
            console.table(results);
        });
    }

    viewRoles(db) {
        db.query('SELECT * FROM roles', function (err, results) {
            console.table(results);
        });
    }

    // deleteDepartment(db) {
    //     db.query(`DELETE FROM departments WHERE id = ${department}`, function (err, result) {
    //         if (err) {
    //             console.log(err)
    //         }
    //         else if (result) {
    //             console.log("department deleted")
    //         }
    //     });
    // }
}

module.exports = Queries;