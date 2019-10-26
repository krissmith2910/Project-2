const db = require("../config/orm");
const slackAuthToken = process.env.SLACK_OAUTH_TOKEN; //Security for Slack Web API
const { WebClient } = require("@slack/web-api"); //Slack Web API For communication back to Slack
const web = new WebClient(slackAuthToken); //new app from Slack Web API constructor

//const slweb = require("./routes/slackWebRoute");
//slweb(slackWeb);

const SlackActions = function() {
  this.db = db;
  this.web = web;
};

SlackActions.prototype.newRequest = async obj => {
  let newReq = {
    initialDescription: obj.text,
    requester: obj.user,
    slackID: `${obj.channel}::${obj.ts}`,
    time: Math.floor(obj.ts),
    archive: 0
  };
  const createdReq = await db.createRequest(newReq);
  const dataset = await db.getSingleRecord(createdReq);
  let diaryEntry = {
    requestid: dataset[0].id,
    entryType: "New Request",
    diaryText: dataset[0].initialDescription,
    time: dataset[0].time
  };
  return await db.createDiary(diaryEntry);
};

SlackActions.prototype.CreateDiary = async (diaryEntry) => {
  return await db.createDiary(diaryEntry);
};

SlackActions.prototype.postMessage = async (msg) => {
  try {
    const resp = await web.chat.postMessage(msg);
    //console.log({ resp, line: 55, file: "slackActions" });
    return resp;
  } catch (err) {
    console.log("web post message error");
    console.trace(err);
  }
};

slackActions = new SlackActions();
module.exports = slackActions;
