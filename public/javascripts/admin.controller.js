angular.module('mainApp', ['ngMaterial', 'ngMessages'])
    .controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $mdToast, $mdDialog, $window) {

    $scope.imagePath = 'images/washedout.png';

    $scope.currentNavItem = 'page2';

    $scope.goto = function(page) {};

    $scope.buy = function(course) {
        console.log(course);
        $window.location.href = '/' + course + '/payment';
    };

    $scope.like = function(course) {
        $mdToast.show(
            $mdToast.simple()
            .textContent('You have liked ' + course)
            .position('right')
            .hideDelay(3000)
        );
    };

    $scope.share = function(course) {
        $mdToast.show(
            $mdToast.simple()
            .textContent('You have shared ' + course)
            .position('right')
            .hideDelay(3000)
        );
    };
}