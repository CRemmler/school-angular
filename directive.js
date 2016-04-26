var mainApp2 = angular.module("myApp", []);

mainApp2.directive("formDirective", function() {
  return {
    restrict: "E",
    templateUrl: "form.html",
    controller: function () {
       $scope.alert() = function(){
          alert("new");
       };
    },
    controllerAs: "newCtrl"
  };
});

mainApp2.directive("futureDirective", function() {
  return {
    restrict: "E",
    templateUrl: "futureWork.html"
  };
});

var mainApt = angular.module('myCoolApp',[]);
mainApt.directive('helloWorld', function() {
  return {
    restrict: "AE",
    template: "HELLO"
  };

});
