var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "bootcampdb.cnt2iobbptak.us-east-2.rds.amazonaws.com",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "admin",

  // Your password
  password: "AwV52riYYI7OGl9kJsAE",
  database: "desk"
});

connection.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log("connected as id " + connection.threadId + "\n");
});

function createDiary(diaryDetail) {
  //console.log("Inserting a new product...\n");
  connection.query("INSERT INTO diary SET ?", diaryDetail, function(err, res) {
    if (err) {
      throw err;
    }
    console.log(res.affectedRows + " Diary entry inserted!\n");
    connection.query("SELECT * FROM diary WHERE id = ?", res.insertId, function(
      err,
      dataset
    ) {
      if (err) {
        throw err;
      }
      console.log(dataset);
      return dataset;
    });
    //createRequest();
    // connection.end();
  });
}

function createRequest(requestDetail) {
  //console.log("Inserting a new product...\n");
  connection.query("INSERT INTO requests SET ?", requestDetail, function(
    err,
    res
  ) {
    if (err) {
      throw err;
    }
    console.log(
      res.affectedRows + "request created with id" + res.insertId + ". \n"
    );
    connection.query(
      "SELECT * FROM requests WHERE id = ?",
      res.insertId,
      function(err, dataset) {
        if (err) {
          throw err;
        }
        diaryEntry = {
          requestid: dataset[0].id,
          entryType: "New Request",
          diaryText: dataset[0].initialDescription,
          time: dataset[0].time
        };
        createDiary(diaryEntry);
        return dataset;
      }
    );
    // connection.end();
  });
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
module.exports.createRequest = createRequest;
module.exports.creatDiary = createDiary;
module.exports.createUser = createUser;
