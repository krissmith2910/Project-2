/* eslint-disable camelcase */
const slactions = require("../routes/slackActions");

module.exports = function(slackEvents) {
  slackEvents.on("message", async function(obj) {
    if(obj.subtype === "bot_message"){
      return ("No bot responses");
    }
    if(obj.thread_ts){
      return slactions.newDiary(diaryDetail);
    }
    //console.log("slackEvtRoute");
    //console.log(obj);
    const newReqCreated = await slactions.newRequest(obj);
    console.log("New Request Created: ");
    console.log(newReqCreated);
    let returnMsg = {
      channel: obj.channel,
      thread_ts: obj.event_ts,
      text: `A request ticket (ID# ${newReqCreated.requestid}) has been created with for you the the following descripton:\n ${obj.text}`,
    };

    slactions.postMessage(returnMsg).catch(err => console.trace(err));
  });

  slackEvents.on("error", error => {
    console.log(`Slack Event Error: ${error.stack}`); // TypeError
  });
};
