const table = require ("console.table")

 export function viewDepartments () {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
    });
 }
