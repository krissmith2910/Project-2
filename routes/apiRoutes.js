//var db = require("../models");
const moment = require("moment");
db = require("../config/orm");

module.exports = function(app) {
  app.post("/desk/requests", function(req, res) {
    //var newRequestId = 0;
    console.log(req.body);
    console.log("end of body \n");
    console.log(res);
    return true;
  });

  app.get("/desk/requests", function(req, res) {
    //console.log(req);
    let archiveBool = { archive: 0 };
    db.getRequests(archiveBool)
      .then(function(dataset) {
        console.log(dataset);
        strDataset = JSON.stringify(dataset);
        parsedDataset = JSON.parse(strDataset);
        for (let i = 0; i < parsedDataset; i++) {
          let newTime = moment(parsedDataset[i].time * 1000).format("llll");
          parsedDataset[i].time = newTime;
        }
        res.render("index", { requests: parsedDataset });
        //res.send(parsedDataset);
        //res.render("index", { requests: parsedDataset });
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.get("/desk/reqDetail", function(req, res) {
    db.getRequests(req.body).then(function(dataset) {
      res.render(redDetail,{request:dataset});
    });
  });

  app.get("/", function(req, res) {
    res.redirect("/desk/requests");
  });
};

//res.send(db.createRequest(req.body));
//  {
//   function(res){console.log(res)}; //res.json(dbExamples);
// });

// Create a new example
// app.post("/slkdsk", function(req, res) {
//   db.Example.create(req.body).then(function(dbExample) {
//     res.json(dbExample);
//   });
// });

// Delete an example by id
// app.delete("/api/examples/:id", function(req, res) {
//   db.Example.destroy({ where: { id: req.params.id } }).then(function(
//     dbExample
//   ) {
//     res.json(dbExample);
//   });
// });
