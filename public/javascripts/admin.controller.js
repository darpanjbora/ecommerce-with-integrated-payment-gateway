angular.module('mainApp', ['ngMaterial', 'ngMessages'])
    .controller('AppCtrl', AppCtrl)
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
        $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
        $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    });

function AppCtrl($scope, $mdToast, $mdDialog, $window, $http) {

    $scope.user = {
        name: '',
        email: '',
        phone: '',
        address: ''
    };

    $scope.imagePath = 'images/washedout.png';

    $scope.currentNavItem = 'page2';

    $scope.goto = function(page) {};

    $scope.sendMail = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('Get Receipt')
            .textContent('Enter your email address here')
            .placeholder('Email ID')
            .ariaLabel('Email ID')
            .targetEvent(ev)
            .required(true)
            .ok('Send')
            .cancel("I don't need the receipt");

        $mdDialog.show(confirm).then(function(result) {
            // $http({
            //     method: "POST",
            //     url: "/sendmail",
            //     data: result
            // }).then(function(response) {
            //     console.log(response.data);
            // }, function(response) {
            //     console.log(response);
            // });
            $window.location.href = '/sendmail?email=' + result;
        }, function() {
            console.log(result);
        });
    };


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