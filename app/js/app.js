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
        $stateProvider.state('main', {
            url: '/',
            templateUrl: 'pages/index.html'
        })
        $stateProvider.state('admin',{
            url:"/admin",
            templateUrl: 'firepress/admin.html'
        })
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
        
        $urlRouterProvider.otherwise(
            '/'
        );


    }
]);