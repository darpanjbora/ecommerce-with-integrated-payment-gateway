angular.module('mainApp', ['ngMaterial', 'ngMessages'])
    .controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $mdToast, $mdDialog, $window, $http) {

    $scope.imagePath = 'images/washedout.png';

    $scope.currentNavItem = 'page2';

    $scope.goto = function(page) {};

    $scope.user = {
        name: '',
        email: '',
        phone: '',
        address: ''
    };

    $scope.pay = function(course) {

        var userDetails = {
            name: $scope.user.name,
            email: $scope.user.email,
            phone: $scope.user.phone,
            address: $scope.user.address
        }

        $http({
            url: 'https://course-store.herokuapp.com/pay',
            method: 'POST',
            data: userDetails
        }).then(function(httpResponse) {
            console.log('response:', httpResponse);
        })

    }

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