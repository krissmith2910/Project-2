var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "desk"
});

connection.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log("connected as id " + connection.threadId + "\n");
  createDiary();
});

function createDiary() {
  //console.log("Inserting a new product...\n");
  connection.query(
    "INSERT INTO diary SET ?",
    {
      requestID: 1,
      entryType: "entryType",
      diaryText: "diaryText",
      priority: "priority",
      time: 2
    },
    function(err, res) {
      if (err) {
        throw err;
      }
      console.log(res.affectedRows + " product inserted!\n");
      connection.query(
        "SELECT * FROM diary WHERE id = ?",
        res.insertId,
        function(_err, dataset) {
          return dataset;
        }
      );
      createRequest();
      // connection.end();
    }
  );
}

function createRequest() {
  //console.log("Inserting a new product...\n");
  connection.query(
    "INSERT INTO requests SET ?",
    {
      slackID: "sd",
      requester: "diaryText",
      initialDescription: "priority",
      requestClass: 2,
      reqDate: 1,
      owner: "a",
      procStatus: "a",
      procID: 2,
      archive: true,
      time: 2
    },
    function(err, res) {
      if (err) {
        throw err;
      }
      console.log(res.affectedRows + " product inserted!\n");
      connection.query(
        "SELECT * FROM requests WHERE id = ?",
        res.insertId,
        function(_err, dataset) {
          return dataset;
        }
      );
      createUser();
      // connection.end();
    }
  );
}

function createUser() {
  //console.log("Inserting a new product...\n");
  connection.query(
    "INSERT INTO user SET ?",
    {
      slackID: "a",
      name: "a",
      phone: 3,
      email: "asd",
      customer: true,
      operator: true,
      other: 1,
      time: 1
    },
    function(err, res) {
      if (err) {
        throw err;
      }
      console.log(res.affectedRows + " product inserted!\n");

      connection.end();
    }
  );
}
