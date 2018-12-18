# CRUD-Node-Postgresql-Angularjs

## Guideline create a RESTful web service with backend [Node, Express, pg-promise], database [Postgres], fontend [Angularjs]

*Our app will include the following endpoints:*

| URL                  | HTTP Verb | Action                 |
|----------------------|-----------|------------------------|
| /api/chickens        | GET       | Return all chicken     |
| /api/chickens/:id    | GET 	   | Return a single chicken|
| /api/chickens        | POST      | Add a chicken          |
| /api/chickens/:id    | PUT       | Update a chicken       |
| /api/chickens/:id    | DELETE    | Delete a chicken       |

## Contents

* Project setup
* Create Server
* Postgres setup
* Routes
* Queries

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
user: postgres
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






