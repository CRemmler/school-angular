var mainApp = angular.module("mainApp", []);
         
mainApp.controller('DataController', function($scope, $http) {
  $http.get('content.json')
  .then(function(response) {
    $scope.entries = response.data;
  });
});

mainApp.controller('EditController', function($scope) {

  $scope.alert = function() {
    alert("edit");
  };

});

