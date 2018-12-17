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