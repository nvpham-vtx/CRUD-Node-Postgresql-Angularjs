angular.module('postgreDbApp.ModalController', [])
.controller("ModalController",["$scope", "getAllChickens", "$uibModalInstance", "$chicken", function($scope, $getAllChickens, 
    $uibModalInstance, $chicken) {

    $scope.vm = {};
    $scope.vm.modal = {};
    
    if($chicken) {
        $getAllChickens.getSingleChicken($chicken)
        .then(function(data) {
            $scope.vm.modal = data.data.data;
        })
    }

    $scope.vm.ok = function(data) {
        $getAllChickens.createChicken(data)
        .then(function(data) {
            $uibModalInstance.close(data);
        })
    }

    $scope.vm.cancel = function() {
        $uibModalInstance.close();
    }
}])