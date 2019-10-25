const { createServer } = require("http"); //newlyAddedForSlackNeeds
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
//const db = require("./config/orm");
const { createEventAdapter } = require("@slack/events-api"); //Slack Event Listener for event triggered messages from Slack
//const {WebClient} = require("@slack/web-api"); //Slack Web API For communication back to Slack
var slackSigningSecret = process.env.SLACK_SIGNING_SECRET; //Security for Slack Event Listener
console.log(slackSigningSecret);
//var slackAuthToken = process.env.SLACK_OAUTH_TOKEN; //Security for Slack Web API

const port = process.env.PORT || 3000;

//const web = new WebClient(slackAuthToken); //new app from Slack Web API constructor
const slackEvents = createEventAdapter(slackSigningSecret); //Slack event listener adapter
const app = express();

// Middleware
app.use("/slack/events", slackEvents.requestListener()); //middleware for Slack Event Listener. This must go before express body parsers.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); 

slackEvents.on("message", function(event) {
  console.log(event);
}); //slack events behavior for message events

slackEvents.on("error", (error) => {
  console.log(error.name); // TypeError
});

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
routes = require("./routes/apiRoutes");
routes(app);
//const slackActions = require("./routes/slackActions");
//slackActions(app);

const server = createServer(app);
server.listen(port, function() {
  console.log("This app is listening on PORT: " + port);
});

module.exports = app;


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
