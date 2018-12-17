var app = angular.module("postgreDbApp", ["ngRoute", "ui.bootstrap", "postgreDbApp.controller", "postgreDbApp.service", "postgreDbApp.ModalController"]);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when ("/", {
        templateUrl: "views/view.tpl.html",
        controller: "MainCtrl", 
        reloadOnSearch:false
    })
    .otherwise({
        redirectTo: '/'
    }) 

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
})