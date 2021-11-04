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
}

module.exports = Queries;