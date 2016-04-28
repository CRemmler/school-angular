var myApp = angular.module('mainApp', []);

myApp.controller('dataController', function($scope, $http) {
  $scope.order = "lastName";
  $scope.student = [];
  $http.get('content.json')
   .then(function(response) {
    $scope.entries = response.data;
    for (i=0; i<$scope.entries.length; i++) {
      $scope.entries[i].uniqueId = i;
    }
    $scope.maxId = $scope.entries.length;
  });
  $scope.changeOrder = function(newOrder) {
    order = "-" + newOrder;
  };
  $scope.submit = function() {
    this.student.uniqueId = $scope.maxId;
    $scope.maxId++;
    $scope.entries.push(this.student);
    this.student = [];
  };
  $scope.delete = function(deleteId) {
    for (i=0; i<$scope.entries.length; i++) {
      if ($scope.entries[i].uniqueId == deleteId) {
        $scope.entries.splice(i, 1);
      }
    }
  };
  $scope.edit = function(editId) {
    editIndex = findIndex(editId);
    $scope.student.lastName = $scope.entries[editIndex].lastName; 
    $scope.student.firstName = $scope.entries[editIndex].firstName;
    $scope.student.gradeLevel = $scope.entries[editIndex].gradeLevel;
    $scope.student.email = $scope.entries[editIndex].email;
    $scope.student.uniqueId = $scope.entries[editIndex].uniqueId;
  };
  $scope.update = function() {
    editIndex = findIndex($scope.student.uniqueId);
    $scope.entries[editIndex].lastName = $scope.student.lastName;
    $scope.entries[editIndex].firstName = $scope.student.firstName;
    $scope.entries[editIndex].gradeLevel = $scope.student.gradeLevel;
    $scope.entries[editIndex].email = $scope.student.email;
    $scope.student = [];
  };
  $scope.cancel = function() {
    $scope.student = [];
  };

  function findIndex(uid) {
    result = null;
    for (i=0; i<$scope.entries.length; i++) {
      if ($scope.entries[i].uniqueId == uid) {
        result = i;
      }
    }
    return result;
  }

});

myApp.directive('alterDirective', function() {
  return {
    restrict: "E",
    templateUrl: "alter.html"
  };
});

myApp.directive('displayDirective', function() {
  return {
    restrict: "E",
    templateUrl: "display.html"
  };
});

myApp.directive('futureDirective', function() {
  return {
    restrict: "E",
    templateUrl: "future.html"
  };
});

myApp.controller('EditController', function($scope) {
  $scope.alert = function() {
    alert("edit");
  };
});

