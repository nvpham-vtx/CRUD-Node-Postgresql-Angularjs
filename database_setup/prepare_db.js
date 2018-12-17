var promise = require('bluebird');
var options = {
    promiseLib: promise
  };

var pgp = require('pg-promise')(options);
var database = require("../servers/database");
var db = pgp(database.connectDatabase);

function getAllChickens(req, res, next) {
    db.any("select * from chicks").then(function(data) {
      res.status(200).json({
        status:"success",
        data: data,
        messesge: "Recived all chickens"
      })
    }).catch(function(err) {
        return next(err);
    })
}

function getSingleChicken(req, res, next) {
    var id = parseInt(req.params.id);
    db.one("select * from chicks where id = $1", id)
    .then(function(data) {
      res.status(200).json({
        status:"success",
        data:data,
        messesge: "Recived one chicken"
      })
    }).catch(function(err){
      return next(err);
    })
}

function createChicken(req, res, next) {
  req.body.age = parseInt(req.body.age)
  db.none("insert into chicks(name, age, sex, breed)" + "values(${name}, ${age}, ${sex}, ${breed})", req.body)
  .then(function() {
    res.status(200).json({
      status:"success",
      messesge: "Created one chicken"
    })
  }).catch(function(err) {
    return next(err);
  })
}

function updateChicken(req, res, next) {
  id= parseInt(req.params.id);
  db.none("update chicks set name =$1, age =$2, sex =$3, breed =$4 where id = $5" , [req.body.name, parseInt(req.body.age), req.body.sex, req.body.breed,  id])
  .then(function(data) {
    res.status(200).json({
      status:"success",
      data: data,
      messesge: "Updated chicken"
    })
  }).catch(function(err) {
    return next(err)
  })
}

function deleteChiken(req, res, next) {
   id= parseInt(req.params.id);
   db.result("delete from chicks where id = $1", id)
   .then(function(data) {
      res.status(200).json({
        status: "success", 
        data:data,
        messesge: `Removed ${data.rowCount} chicken`
      })
   }).catch(function(err) {
     return next(err);
   })
}

module.exports = {
    getAllChickens: getAllChickens, 
    getSingleChicken: getSingleChicken,
    createChicken: createChicken,
    updateChicken: updateChicken,
    deleteChiken: deleteChiken, 
}
