var connection = require ('./connection');

var orm = {

  select: function(tableInput, cb) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [tableInput], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  insertOne: function (tableInput, param, value, cb){
    var queryString = "INSERT INTO ?? (??) VALUES (?)"; connection.query(queryString, [tableInput, param,value], function(err, result){
      if (err){
        throw err;
      }
      cb(result);
    });
  },

  updateOneWhere: function (tableInput, col1toUpdate, value1, col2toUpdate, value2, cb){
    var queryString = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    connection.query(queryString, [tableInput, col1toUpdate, value1, col2toUpdate, value2], function(err, result){
      if (err){
        throw err;
      }
      cb(result);
    });
  },

  delete: function (table, id, cb){
    var queryString = "DELETE FROM ?? WHERE id = ?";
    connection.query (queryString, [table, id], function (err, result){
      if (err){
        throw err;
      }
      cb (result);
    });
  }
};

module.exports = orm;
