corpApp.controller('homeController', ["$scope", "$http", "$cookies", "$location", function($scope, $http, $cookies, $location) {
    if(!$cookies.authToken){
        $location.path('/login');
    }else{

    }
}]);

corpApp.controller('loginController', function($scope, $rootScope) {
    $rootScope.bodyClass = 'pinboard-background';
});