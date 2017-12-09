var express = require ('express');
var concerts = require ('../models/concerts');

var app = express();
var router = express.Router();
var orm = require ("../config/orm.js");
// Open App
router.get("/", function(req, res) {
  concerts.all(function (result){
    var data = result;
    res.render("index", { concerts: data });
  });
});


// Add a new concert/artist
router.post("/concerts", function(req, res) {
  concerts.create(req.body.artist, function(result){
    var data = result;
    res.json({ id: data.id });
    console.log({ id: data.id });
  });

});


// Retrieve all concerts for API data
router.get("/concerts", function(req, res) {
  concerts.all(function (result){
    var data = result;
    res.json(data);
  });
});

// Update Concerts Seen
router.put("/concerts/:id", function(req, res) {
  var id = req.params.id;
  var boo = req.body.rockout;
  console.log(boo);
  concerts.update(boo, id, function(result){
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/concerts/:id", function (req,res){
  var id = req.params.id;
  console.log (id);
  concerts.delete(id, function(result){

      res.status(200).end();
    }
  );
});

module.exports = router;
