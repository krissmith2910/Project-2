const { createServer } = require("http"); //newlyAddedForSlackNeeds
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
//const db = require("./config/orm");
//const { createEventAdapter } = require("@slack/events-api"); //Slack Event Listener for event triggered messages from Slack
//const {WebClient} = require("@slack/web-api"); //Slack Web API For communication back to Slack
//var slackSigningSecret = process.env.SLACK_SIGNING_SECRET; //Security for Slack Event Listener
//console.log(slackSigningSecret);
//var slackAuthToken = process.env.SLACK_OAUTH_TOKEN; //Security for Slack Web API
//const web = new WebClient(slackAuthToken); //new app from Slack Web API constructor
//const slackEvents = createEventAdapter(slackSigningSecret); //Slack event listener adapter
//const port = process.env.PORT || 3000;
const app = express();
const { App } = require("@slack/bolt");

// Middleware
//app.use("/desk/requests", slackEvents.expressMiddleware()); //middleware for Slack Event Listener. This must go before express body parsers.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

const bolt = new App({
  token: process.env.SLACK_OAUTHBOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Routes
routes = require("./routes/apiRoutes");
routes(app);
const slackActions = require("./routes/slackActions");
slackActions(bolt);

// bolt.event("message", ({ event, context }) => {
//   // say() sends a message to the channel where the event was triggered
//   console.log(event, +"\n");
//   console.log(context.updateConverstation + "\n");
//   slackActions.newRequest(event);

// });

// bolt
//   .start(process.env.PORT || 3000)
//   .then(console.log("⚡️ Bolt app is running!"))
//   .catch(function(err){console.log(err);});

const server = createServer(app);
server.listen(process.env.PORT || 3000, function() {
  console.log("This app is listening on PORT:");
});

module.exports = app;
module.exports = bolt;


//require("./routes/htmlRoutes")(app);

//var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function() {
//   app.listen(PORT, function() {
//     console.log(
//       "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//       PORT,
//       PORT
//     );
//   });
// });
