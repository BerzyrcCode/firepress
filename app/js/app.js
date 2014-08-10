'use strict';
// Replace the <textarea id="editor1"> with a CKEditor
// instance, using default configuration.


// Declare app level module which depends on filters, and services
angular.module('firepress', [
    'ui.router',
    'myApp.filters',
    'myApp.services',
    'firepress.directives',
    'myApp.controllers'
]).
config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('page', {
            url: '/:page',
            templateUrl: 'pages/mainTemplate.html',
            controller: 'pageCtrl'
        });
        $stateProvider.state('edit', {
            url: '/:page/edit',
            templateUrl: 'pages/mainTemplateEdit.html',
            controller: 'editCtrl'
        })
        $stateProvider.state('main', {
            url: '/',
            controller: function($scope, $location) {
                $location.path('/Home').replace();
            }
        })
        $stateProvider.state('404', {
            url: '/404',
            templateUrl: 'pages/mainTemplate.Html',
            controller: function($scope) {

            }
        })
        $urlRouterProvider.otherwise(
            '/'
        );


    }
]);