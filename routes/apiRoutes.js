//var db = require("../models");

var db = require("../config/orm");

module.exports = function(app) {
  // Get all examples
  app.post("/slkdsk", function(req, res) {
    var newRequestId = 0;
    db.createRequest(req.body)
      .then(function(createReqResp) {
        newRequestId = createReqResp;
        db.getSingleRecord(createReqResp)
          .then(function(dataset) {
            diaryEntry = {
              requestid: dataset[0].id,
              entryType: "New Request",
              diaryText: dataset[0].initialDescription,
              time: dataset[0].time
            };
            console.log(diaryEntry);
            db.createDiary(diaryEntry)
              .then(function() {
                //console.log(createDiaryResp);
                res.send("Request created with id# " + newRequestId);
              })
              .catch(function(err) {
                console.log("Create New Diary Error");
                console.log(err);
                res.send("Create Request Error at Diary");
              });
          })
          .catch(function(err) {
            console.log("Diary Prep Error");
            console.log(err);
            res.send("Create Request Error at Diary Prep");
          });
      })
      .catch(function(err) {
        console.log(err);
        res.send("Create Request Error at Requests");
      });
  });

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
};
