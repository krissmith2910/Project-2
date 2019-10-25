const slactions = require("../routes/slackActions");

module.exports = function(slackEvents) {
  slackEvents.on("message", function(obj) {
    console.log("slackEvtRoute");
    console.log(obj);
    slactions
      .newRequest(obj)
      .then(function(resp) {
        console.log(`New Request Created: ${resp}`);
      })
      .catch(function(err) {
        console.log(`New Request Error \n ${err}`);
      });
  });
  slackEvents.on("error", error => {
    console.log(`Slack Event Error: ${error.name}`); // TypeError
  });
};
