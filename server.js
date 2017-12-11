var express = require("express");
var bodyParser = require("body-parser");
var orm = require ("./config/orm.js");
var app = express();
var port = process.env.port || 3000;

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = require("./config/connection");

var routes = require("./controllers/concertscontroller.js");



app.use("/", routes);


app.listen(port, function() {
  console.log("listening on port", port);
});
