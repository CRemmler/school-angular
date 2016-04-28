var myApp = angular.module('mainApp', []);

//////////////
// Controller
/////////////

myApp.controller('dataController', function($scope, $http) {

  // set default values
  
  $scope.order = "lastName";
  $scope.student = [];
  $scope.selection = "0-8";
  $scope.entries = [];
  $scope.mode = "create"; // or edit

  // service
  
  $http.get('content.json')
   .then(function(response) {
    $scope.entries = response.data;
    for (i=0; i<$scope.entries.length; i++) {
      $scope.entries[i].uniqueId = i;
    }
    $scope.maxId = $scope.entries.length;
  });

  //functions 
  
  $scope.changeOrder = function(newOrder) {
    order = "-" + newOrder;
  };
  
  $scope.submit = function() {
    this.student.uniqueId = $scope.maxId;
    $scope.maxId++;
    $scope.entries.push(this.student);
    changeToEdit(false);
  };
  
  $scope.delete = function(deleteId) {
    if (window.confirm('Are you sure you want to delete this?')) {
      editIndex = findIndex(deleteId);
      if ($scope.entries[editIndex].uniqueId == $scope.student.uniqueId) {
        $scope.students = [];
	changeToEdit(false);
      }
      $scope.entries.splice(editIndex,1);
    }
  };
  
  $scope.edit = function(editId) {
    editIndex = findIndex(editId);
    $scope.student.lastName = $scope.entries[editIndex].lastName; 
    $scope.student.firstName = $scope.entries[editIndex].firstName;
    $scope.student.gradeLevel = $scope.entries[editIndex].gradeLevel;
    $scope.student.email = $scope.entries[editIndex].email;
    $scope.student.uniqueId = $scope.entries[editIndex].uniqueId;
    changeToEdit(true);
  };
  
  $scope.update = function() {
    editIndex = findIndex($scope.student.uniqueId);
    $scope.entries[editIndex].lastName = $scope.student.lastName;
    $scope.entries[editIndex].firstName = $scope.student.firstName;
    $scope.entries[editIndex].gradeLevel = $scope.student.gradeLevel;
    $scope.entries[editIndex].email = $scope.student.email;
    changeToEdit(false);
  };
  
  $scope.cancel = function() {
    changeToEdit(false);
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

  function changeToEdit(newEditState) {
     $scope.editState = newEditState;
     if ($scope.editState == false) {
       $scope.student = [];
     }
  }

});

//////////////
// Directives
//////////////

myApp.directive('selectDirective', function() {
  return {
    restrict: "E",
    templateUrl: "select.html"
  }
});

myApp.directive('manageDirective', function() {
  return {
    restrict: "E",
    templateUrl: "manage.html"
  };
});

myApp.directive('viewDirective', function() {
  return {
    restrict: "E",
    templateUrl: "view.html"
  };
});

myApp.directive('futureDirective', function() {
  return {
    restrict: "E",
    templateUrl: "future.html"
  };
});

/////////////////
// Filter
////////////////

myApp.filter('gradeLevels', function() {
  return function(items, selection) {
    //alert("selection " + selection + " number of items " + items.length);
    var filtered = [];
    var min = parseInt(selection.split("-")[0]);
    var max = parseInt(selection.split("-")[1]);
    var item = null;
    for (i=0; i<items.length; i++) {
      item = items[i];
      grade = item.gradeLevel;
      if ((grade >= min) && (grade <= max)) {
        filtered.push(item);
      }
    }
    return filtered;
  };
});

