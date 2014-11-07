// app.js
var corpApp = angular.module('corpApp', ['ui.router', 'ngCookies']);

corpApp.run(function ($rootScope) {
    $rootScope.companyName = "Intelliswift";
});

corpApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    
    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'assets/views/_home.html',
            controller: 'homeController'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'assets/views/_login.html',
            controller: 'loginController'
        });

        // // nested list with custom controller
        // .state('home.list', {
        //     url: '/list',
        //     templateUrl: 'views/partial-home-list.html',
        //     controller: function($scope) {
        //         $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        //     }
        // })

        // // nested list with just some random string data
        // .state('home.paragraph', {
        //     url: '/paragraph',
        //     template: 'I could sure use a drink right now.'
        // })

        // // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        // .state('about', {
        //     url: '/about',
        //     views: {

        //         // the main template will be placed here (relatively named)
        //         '': { templateUrl: 'views/partial-about.html' },

        //         // the child views will be defined here (absolutely named)
        //         'columnOne@about': { template: 'Look I am a column!' },

        //         // for column two, we'll define a separate controller 
        //         'columnTwo@about': { 
        //             templateUrl: 'views/table-data.html',
        //             controller: 'scotchController'
        //         }
        //     }
            
        // });
        
    });