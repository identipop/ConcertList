var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = 3000;

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = require("./config/connection");


connection.connect(function(err) {
 if (err) {
   console.error("error connecting: " + err.stack);
   return;
 }
   console.log("connected as id " + connection.threadId);

 });

// Open App
app.get("/", function(req, res) {
  connection.query("SELECT * FROM concerts;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { concerts: data });
  });
});


// Add a new concert/artist
app.post("/concerts", function(req, res) {
  connection.query("INSERT INTO concerts (artist) VALUES (?)", [req.body.artist], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new concert listing
    res.json({ id: res.id });
    console.log({ id: res.id });
  });
});


// Retrieve all concerts
app.get("/concerts", function(req, res) {
  connection.query("SELECT * FROM concerts;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.json(data);
  });
});

// Update Concerts Seen
app.put("/concerts/:id", function(req, res) {
  connection.query("UPDATE concerts SET rockout = 1 WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server faliure
      return res.status(500).end();
    } else if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});





app.listen(port, function() {
  console.log("listening on port", port);
});
