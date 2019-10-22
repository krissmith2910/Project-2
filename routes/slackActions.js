const db = require("../config/orm");

// const SlackActions = function() {
//   this.db = db;
// };

module.exports = bolt => {
  bolt.event("message", ({event, context}) => {
    ack();
    //var newRequestId = 0;
    console.log(event);
    console.log("\n");
    console.log("\n");
    let newReq = {
      //slackID: event.client_msg_id,
      requester: event.user_id,
      initialDescription: event.text,
      time: Math.floor(event.ts)
    };
    console.log(newReq);
    db.createRequest(newReq)
      .then(createReqResp => {
        newRequestId = createReqResp;
        db.getSingleRecord(createReqResp)
          .then(dataset => {
            diaryEntry = {
              requestid: dataset[0].id,
              entryType: "New Request",
              diaryText: dataset[0].initialDescription,
              time: dataset[0].time
            };
            console.log(diaryEntry);
            db.createDiary(diaryEntry)
              .then(() => {
                //console.log(createDiaryResp);
                bolt.client.chat.postMessage({
                  token: context.botToken,
                  channel: command.channel,
                  text: `A request ticket has been created with id# ${newRequestId}`
                });
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
  });
  bolt.command("/newticket", async ({command,ack,respond}) => {
    ack();
    respond({"reponse_type":"in_channel","text":"we are getting your request"});
    console.log("received of new ticket listener with the following: \n");
    console.log(command);
    var newRequestId = 0;
    console.log("\n");
    console.log("\n");
    let newReq = {
      slackID: command.response_url,
      requester: command.user_id,
      initialDescription: command.text,
      time: Math.floor(Date.now()/1000)
    };
    console.log(newReq);
    newRequestId = await db.createRequest(newReq);
    const dataset = await db.getSingleRecord(newRequestId);
    diaryEntry = {
      requestid: dataset[0].id,
      entryType: "New Request",
      diaryText: dataset[0].initialDescription,
      time: dataset[0].time
    };
    console.log(diaryEntry);
    await db.createDiary(diaryEntry);
    respond({"response_type":"in_channel", "text":`IT Services Ticket ID# ${newRequestId} created in response to your request.`});
  });
};
// slackActions = new SlackActions();
// module.exports = slackActions;
