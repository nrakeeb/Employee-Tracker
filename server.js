const express = require('express');
const mysql = require('mysql2');

import {viewDepartments} from './queries';


const PORT = process.env.PORT || 3001;
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

function getDepartments() {
  let result= viewDepartments()
  console.log(result)
}

// db.query('SELECT * FROM employees', function (err, results) {
//   console.log(results);
// });


// // delete department
// db.query(`DELETE FROM departments WHERE id = ${department}`, function (err, result) {
//  if (err) {
//    console.log(err)
//  }
//   else if(result) {
//   console.log("department deleted")
//  }
 
// });

// // delete roles 
// db.query(`DELETE FROM roles WHERE id = ${role}`, function (err, result) {
//   if (err) {
//     console.log(error)
//   }
//    else if (result) {
//    console.log("role deleted")
//   }
  
//  });

//  // delete employee 
// db.query(`DELETE FROM employees WHERE id = ${employee}`, function (err, result) {
//   if (err) {
//     console.log(error)
//   }
//    else if (result) {
//    console.log("employee deleted")
//   }
  
//  });

 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });