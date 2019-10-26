const { createServer } = require("http"); //newlyAddedForSlackNeeds
require("dotenv").config();

const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET; //Security for Slack Event Listener
const { createEventAdapter } = require("@slack/events-api"); //Slack Event Listener for event triggered messages from Slack
const slackEvents = createEventAdapter(slackSigningSecret); //Slack event listener adapter


// Middleware
app.use("/slack/events", slackEvents.requestListener()); //middleware for Slack Event Listener. This must go before express body parsers.
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

// Express Routes
routes = require("./routes/apiRoutes");
routes(app);

//Slack Event Routes
const slapp = require("./routes/slackEvtRoute");
slapp(slackEvents);


//start the server
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
