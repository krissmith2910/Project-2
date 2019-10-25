const db = require("../config/orm");

const SlackActions = function() {
  this.db = db;
};

SlackActions.prototype.newRequest = obj => {
  let newReq = {
    initialDescription: obj.text,
    requester: obj.user,
    slackID: `${obj.channel}::${obj.ts}`,
    time: Math.floor(obj.ts)
  };
  db.createRequest(newReq)
    .then(createReqResp => {
      db.getSingleRecord(createReqResp)
        .then(dataset => {
          let diaryEntry = {
            requestid: dataset[0].id,
            entryType: "New Request",
            diaryText: dataset[0].initialDescription,
            time: dataset[0].time
          };
          console.log(diaryEntry);
          db.createDiary(diaryEntry)
            .then((createDiaryResp) => {
              console.log(createDiaryResp);
              console.log("TODO setup chat to request via WEB API");
              //TODO setup chat to request via WEB API
            })
            .catch(function(err) {
              console.log("Create New Diary Error");
              console.log(err);
              console.log("Create Request Error at Diary");
            });
        })
        .catch(function(err) {
          console.log("Diary Prep Error");
          console.log(err);
          console.log("Create Request Error at Diary Prep");
        });
    })
    .catch(function(err) {
      console.log(err);
      console.log("Create Request Error at Requests");
    });
};

slackActions = new SlackActions();
module.exports = slackActions;
