var app = angular.module("homeChef", []);

app.controller("formController", function($scope){
    $scope.collection = [];
    $scope.addEntry = function(){
        $scope.collection.push($scope.newData);
        $scope.newData = '';
    };
});

