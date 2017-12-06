var connection = require ('./connection');

var orm = {

  select:  selectAll(),
  insert: insertOne(),
  update: updateOne()
};

module.exports(orm);
