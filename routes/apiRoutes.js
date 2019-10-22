//var db = require("../models");

var db = require("../config/orm");

module.exports = function(app) {
  // Get all examples
  app.post("/slkdsk", function(req, res) {
    res.send(db.createRequest(req.body));
    //  {
    //   function(res){console.log(res)}; //res.json(dbExamples);
    // });
  });

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
};
