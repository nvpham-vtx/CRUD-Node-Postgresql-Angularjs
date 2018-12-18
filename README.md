# CRUD-Node-Postgresql-Angularjs

## Guideline create a RESTful web service with backend [Node, Express, pg-promise], database [Postgres], fontend [Angularjs]

*Our app will include the following endpoints:*

| URL                  | HTTP Verb | Action                 |
|----------------------|-----------|------------------------|
| /api/chickens        | GET       | Return all chickens    |
| /api/chickens/:id    | GET 	   | Return a single chicken|
| /api/chickens        | POST      | Add a chicken          |
| /api/chickens/:id    | PUT       | Update a chicken       |
| /api/chickens/:id    | DELETE    | Delete a chicken       |

## Contents

* Project setup
* Create Server
* Postgres setup
* Queries
* Routes

## Project setup
Make sure your have installed nodejs and npm
`ref to https://nodejs.org/en/`

1. mkdir myapp
2. cd myapp
3. npm init
4. npm install express --save
5. npm install pg-promise
6. npm install bluebird

`Why use` [bluebird](https://github.com/petkaantonov/bluebird) `?`

- `Bluebird is a Promise/A+ compliant lib.`

- `Speed processing: very high`

`Why use` [pg-promise](https://www.npmjs.com/package/pg-promise#queries-and-parameters) `instead of pg?`

## Create Server
- Create file app.js in root.

```
var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
var routes = require("./router/router");

var app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + "/src"));
app.use(bodyParser.urlencoded({extended: true,}));
app.use(bodyParser.json());

// var db = require("./database_setup/prepare_db");
// app.get("/api/chickens/:id", db.deleteChiken);
app.use("/", routes);
var server = http.createServer(app);

server.listen(app.get("port"), () =>{
    console.log("Listen port " + app.get("port"));
})
```

## Postgres setup

- Create file database.js in folder server (./server)

``` 
exports.connectDatabase = "postgres://user:password@localhost:port/database_name"
user: postgres (default)
password: create when setup Postgresql
```

- Create table chickens.
Create file chicken.sql:

```
DROP DATABASE IF EXISTS chickens;
CREATE DATABASE chickens TEMPLATE template1;

\c chickens;

CREATE TABLE chicks (
    ID SERIAL PRIMARY KEY,
    name VARCHAR,
    age INTEGER,
    sex VARCHAR,
    breed VARCHAR
);

INSERT INTO chicks (name, age, sex, breed)
VALUES ('Tyler',3,'M','Retrieved');
```

## Queries

Create file prepare_db.js in folder database_setup (./database_setup)
```
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
```

## Routes

Create file router.js in folder router (./router)
```
var express = require("express");
var router = express.Router();
var db = require("../database_setup/prepare_db");

router.get("/api/chickens", db.getAllChickens);
router.get("/api/chickens/:id", db.getSingleChicken);
router.post("/api/chickens", db.createChicken);
router.put("/api/chickens/:id", db.updateChicken);
router.delete("/api/chickens/:id", db.deleteChiken);

module.exports = router;
```

