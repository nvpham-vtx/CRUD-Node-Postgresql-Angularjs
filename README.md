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

`Why use [bluebird](https://github.com/petkaantonov/bluebird) ?`

`Bluebird is a Promise/A+ compliant lib.`

`Speed processing: very high`





