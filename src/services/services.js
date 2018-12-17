angular.module('postgreDbApp.service', [])
.factory("getAllChickens", function($http, $q) {
    var getAllChickens = function() {
        var defer =  $q.defer();
        $http.get('/api/chickens/')
        .then(function(data) {
        	defer.resolve(data);
        })
        .catch(function(reason) {
        	defer.reject(reason);
        });
            return defer.promise
        }

    var deleteChicken = function(id) {
        var defer = $q.defer();
        $http.delete('/api/chickens/' + id)
        .then(function(data) {
            defer.resolve(data);
        })
        .catch(function(err){
            defer.reject(err);
        })
        return defer.promise;
    }

    var updateChicken = function(id, dataUpdate) {
        var defer = $q.defer();
        $http.put("/api/chickens/" + id, dataUpdate)
        .then(function(data) {
            defer.resolve(data);
        })
        .catch(function(err) {
            defer.reject(err);
        })
        return defer.promise;
    }

    var createChicken = function(data) {
        var defer = $q.defer();
        $http.post("/api/chickens", data)
        .then(function(data) {
            defer.resolve(data);
        })
        .catch(function(err) {
            defer.reject(err);
        })
        return defer.promise;
    }

    var getSingleChicken = function(id) {
        var defer = $q.defer();
        $http.get("/api/chickens/" + id)
        .then(function(data) {
            defer.resolve(data);
        })
        .catch(function(err) {
            defer.reject(err);
        })
        return defer.promise;
    }
    
        return {
            getAllChickens: getAllChickens,
            deleteChicken:deleteChicken,
            updateChicken: updateChicken,
            createChicken:createChicken,
            getSingleChicken:getSingleChicken
        };
})