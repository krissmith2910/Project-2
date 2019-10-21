const { createServer } = require("http"); //newlyAddedForSlackNeeds
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
const { createEventAdapter } = require("@slack/events-api"); //Slack Event Listener for event triggered messages from Slack
//const {WebClient} = require("@slack/web-api"); //Slack Web API For communication back to Slack
var slackSigningSecret = ""; //Security for Slack Event Listener
//var slackToken = ""; //Security for Slack Web API
//const web = new WebClient(slackToken); //new app from Slack Web API constructor
const slackEvents = createEventAdapter(slackSigningSecret); //Slack event listener adapter
const port = process.env.PORT || 3000;
//var db = require("./models");
const app = express();


// Middleware
app.use("/desk/requests", slackEvents.expressMiddleware()); //middleware for Slack Event Listener. This must go before express body parsers.
app.use(express.urlencoded({ extended: false }));
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

// Routes
require("./routes/apiRoutes")(app);

const server = createServer(app);
server.listen(port, function() {
  console.log("This app is listening on PORT: " + port + ".");
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