const express = require("express");
const iq = require("inquirer");
const sql = require("mysql2");
const tb = require("console.table");
const log = require("log-beautify");

const PORT = process.env.PORT || 3221;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "9162",
  database: "company_db",
});

const company = async () => {
  const comp = await // Homepage
  iq.prompt([
    {
      type: "list",
      name: "home",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
      ],
      message: "What would you like to do?",
    },
  ]);

  // Show all from the table drpatment
  if (comp.home === "View All Departments") {
    db.query("SELECT * FROM department", function (err, result) {
      console.table(result);
      company();
    });
  }

  //Show all from the table roles
  if (comp.home === "View All Roles") {
    db.query(
      "SELECT roles.id, title, department.name AS department, salary FROM roles JOIN department ON roles.department_id = department.id",
      function (err, result) {
        console.error(err);
        console.table(result);
        company();
      }
    );
  }
  if (comp.home === "View All Employees") {
    db.query(
      "SELECT employee.id, employee.first_name, employee.last_name, roles.title AS title, department.name AS department, roles.salary AS salary, CONCAT(m.first_name,',', m.last_name ) AS manager FROM employee LEFT JOIN employee m ON m.id = employee.manager_id JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id",
      function (err, result) {
        // db.query("SELECT employee.id, first_name, last_name, roles.title AS title, department.name AS department, roles.salary AS salary FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id", function(err, result) {
        console.error(err);
        console.table(result);
        company();
      }
    );
  }

  if (comp.home === "Add Department") {
    const newDept = await iq.prompt([
      {
        type: "input",
        name: "adddept",
        message:
          "What is the name of the departmnt that you would like to add?",
      },
    ]);
    db.query(`INSERT INTO department (name) VALUES ("${newDept.adddept}");`);
    console.log(
      `${newDept.adddept} has been added to the department table as a new department`
    );
    company();
  }

  if (comp.home === "Add Role") {
    db.query("SELECT * FROM department", function (err, res) {
      const options = res.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      iq.prompt([
        {
          type: "input",
          name: "roleName",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "dept",
          choices: options,
          message: "Which department does the role belong to?",
        },
      ]).then(function (answers) {
        console.log(answers);
        db.query(
          `INSERT INTO roles (title, department_id, salary) VALUES (${answers.roleName}, ${answers.dept}, ${answers.salary});`,function(err, res){
            if(err){
                throw new err;
            }
            console.log(`New role has been added`)
          }
        );
        company();
      });
    });
  }
};

app.listen(PORT, () => {});

company();
