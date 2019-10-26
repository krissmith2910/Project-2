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

function MySql() {
  this.connection = connection;
}

MySql.prototype.createDiary = function(diaryDetail) {
  //console.log("Inserting a new product...\n");
  return new Promise(function(resolve, reject) {
    connection.query("INSERT INTO diary SET ?", diaryDetail, function(err) {
      if (err) {
        reject(err);
      } else {
        //console.log(resp);
        resolve(diaryDetail);
      }
    });
  });
};

MySql.prototype.createRequest = function(requestDetail) {
  return new Promise(function(resolve, reject) {
    connection.query("INSERT INTO requests SET ?", requestDetail, function(
      err,
      resp
    ) {
      if (err) {
        reject(err);
      } else {
        //We will get the newly inserted record from the requests table. We run the query to ensure the record did, in fact insert.
        //console.log("Request created with id " + resp.insertId + ". \n");
        resolve(resp.insertId);
      }
    });
  });
};

MySql.prototype.newDiaryEntry = function(det) {
  return new Promise(function(resolve, reject) {
    connection.query("INSERT INTO diary SET ?", det, function(err, resp) {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};

MySql.prototype.createUser = function(userDetail) {
  return new Promise(function(resolve, reject) {
    connection.query("INSERT INTO user SET ?", userDetail, function(err, resp) {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};

MySql.prototype.getSingleRecord = function(requestId) {
  return new Promise(function(resolve, reject) {
    connection.query("SELECT * FROM requests WHERE id = ?", requestId, function(
      err,
      dataset
    ) {
      if (err) {
        reject(err);
      } else {
        resolve(dataset);
      }
    });
  });
};

MySql.prototype.getRequests = function(whereClause) {
  return new Promise(function(resolve, reject) {
    connection.query("SELECT * FROM requests WHERE ?", whereClause, function(
      err,
      dataset
    ) {
      if (err) {
        reject(err);
      } else {
        resolve(dataset);
      }
    });
  });
};

MySql.prototype.getDiary = function(reqId) {
  return new Promise(function(resolve, reject) {
    connection.query("SELECT * FROM diary where ?",reqId,function(err, dataset) {
      if (err) {
        reject(err);
      } else {
        resolve(dataset);
      }
    });
  });
};

mysql = new MySql();
module.exports = mysql;
