//var db = require("../models");
const moment = require("moment");
db = require("../config/orm");
const slactions = require("../routes/slackActions");

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
        //console.log(dataset);
        let strDataset = JSON.stringify(dataset);
        let parsedDataset = JSON.parse(strDataset);
        let finalDataset = [];
        //console.log(parsedDataset);
        for (i = 0; i < parsedDataset.length; i++) {
          var finalObj = {
            id: parsedDataset[i].id,
            initialDescription: parsedDataset[i].initialDescription,
            requester: parsedDataset[i].requester,
            requestClass: parsedDataset[i].requestClass,
            operator: parsedDataset[i].operator,
            time: moment(parsedDataset[i].time * 1000).format("L LT")
          };
          //console.log(finalObj);
          finalDataset.push(finalObj);
        }
        //console.log(finalDataset);
        res.render("index", { requests: finalDataset });
        //res.send(parsedDataset);
        //res.render("index", { requests: parsedDataset });
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.get("/desk/reqDetail", async function(req, res) {
    //console.log(parseInt(req.query.id));
    let whereValue = { id: req.query.id };
    let dataset = await db.getRequests(whereValue);
    //.then(function(dataset) {
    //console.log(dataset);
    res.render("reqDetail", dataset[0]);
  });

  app.post("/desk/diary", async function(req, res) {
    //console.log(req.body);
    diaryEntryValues = {
      requestId: req.body.requestId,
      diaryText: `${req.body.diaryText}`,
      entryType: "Web API Update",
      time: Math.floor(Date.now() / 1000)
    };
    console.log(diaryEntryValues);
    await db.newDiaryEntry(diaryEntryValues);
    let dataset = await db.getSingleRecord(parseInt(req.body.requestId));
    console.log(dataset);
    messageId = dataset[0].slackID.split("::");
    let updateMessage = {
      text: req.body.diaryText,
      channel: messageId[0],
      //eslint-disable-next-line camelcase
      thread_ts: messageId[1]
    };
    console.log(updateMessage);
    slactions.postMessage(updateMessage);
    res.send("Update Successful");
  });

  app.get("/desk/diary", function(req, res) {
    let whereValue = { requestID: parseInt(req.query.id) };
    db.getDiary(whereValue)
      .then(function(dataset) {
        //console.log(dataset);
        //strDataset = JSON.stringify(dataset);
        //parsedDataset = JSON.parse(strDataset);
        for (let i = 0; i < dataset.length; i++) {
          let newTime = moment(dataset[i].time * 1000).format("L LT");
          dataset[i].time = newTime;
        }
        console.log(dataset);
        res.send(dataset);
        //res.send(parsedDataset);
        //res.render("index", { diary: parsedDataset });
      })
      .catch(function(err) {
        console.log(err);
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
