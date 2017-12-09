var orm = require ('../config/orm');


  var concerts ={
    all: function (cb){
      orm.select("concerts", function (res){
        cb(res);
      });
    },

    create: function (artistval, cb){
      orm.insertOne("concerts", 'artist', artistval, function (res){
        cb(res);
      });
    },

    update: function (boo, id, cb){
      orm.updateOneWhere('concerts', 'rockout', boo, 'id', id, function (res){
        cb(res);
      });
    },

    delete: function (id, cb){
      orm.delete('concerts', id, function(res){
        cb(res);
      });
    }
  };

  module.exports = concerts;
