//var db = require("../models");

var db = require("../config/orm");

module.exports = function(app) {
  // Get all examples
  app.post("/desk/requests", function(req, res) {
    var newRequestId = 0;
    if(req.body.challenge !== undefined){
      console.log(req.body);
      res.send(req.body.challenge);
      return ("challenge");
    }
    console.log(req.body);
    console.log("\n");
    console.log(req.body.event_time);
    console.log("\n");
    let newReq = {
      slackID: req.body.event.client_msg_id,
      requester: req.body.event.user,
      initialDescription: req.body.event.text,
      time: req.body.event_time
    };
    db.createRequest(newReq)
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
  app.get("/",function(req, res) {
    res.send("access achieved");
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
