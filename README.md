# CRUD-Node-Postgresql-Angularjs

## Guideline create a RESTful web service with backend [Node, Express, pg-promise], database [Postgres], fontend [Angularjs]

*Our app will include the following endpoints:*

| URL                  | HTTP Verb | Action                 |
|----------------------|-----------|------------------------|
| /api/chickens        | GET       | Return ALL chicken     |
| /api/chickens/:id    | GET 	   | Return a SINGLE chicken|
| /api/chickens        | POST      | Add a chicken          |
| /api/chickens/:id    | PUT       | Update a chicken       |
| /api/chickens/:id    | DELETE    | Delete a chicken       |

## Contents

* Project setup

* Postgres setup

* Routes

* Queries

## Project setup
Make sure your have installed nodejs and npm
`ref to https://nodejs.org/en/`

mkdir myapp

cd myapp

npm init

npm install express --save

npm install pg-promise

npm install bluebird

Bluebird is a Promise/A+ compliant lib.
Speed processing: very high