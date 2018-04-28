angular.module('mainApp', ['ngMaterial', 'ngMessages'])
    .controller('AppCtrl', AppCtrl)
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
        $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
        $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    });

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
            url: 'https://course-store.herokuapp.com/',
            method: 'POST',
            data: userDetails,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
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