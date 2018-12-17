angular.module('postgreDbApp.controller', ['ui.bootstrap'])
.controller("MainCtrl",["$scope", "$q", "$uibModal", "getAllChickens" , function($scope, $q, $uibModal,
    $getAllChickens) {

    $scope.vm = {};
    $scope.todos={};
    $scope.todos.title= "Create Read Update Delete";
    $scope.load = function() {
        $getAllChickens.getAllChickens().then(function(data) {
            $scope.todos = data.data.data;
        })
    }

    $scope.deleteTodo = function(id) {
        $getAllChickens.deleteChicken(id)
        .then(function(data) {
            $scope.load();
        })
    }

    $scope.editTodo = function(id, name, age, sex, breed) {
        $getAllChickens.updateChicken(id, {name, age, sex, breed})
        .then(function(data){
            $scope.todos = data.data.data;
        })
    }

    $scope.createTodo = function() {
        var modalInstance = $uibModal.open({
            templateUrl: "modals/modal.html",
            controller: "ModalController",
            resolve: {
                $chicken: function() {
                    return;
                }
            }
        });

        modalInstance.result.then(function(data) {
            $scope.load();
        })
    }

    $scope.showModal = function(id) {
        $uibModal.open({
            templateUrl: "modals/modal.html",
            controller: "ModalController",
            resolve: {
                $chicken: function() {
                    return id;
                }
            }
        });
    }
    $scope.load();
}])