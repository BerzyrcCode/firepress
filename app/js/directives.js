'use strict';

/* Directives */


angular.module('myApp.directives', [
    'LocalStorageModule', 'firebase'
]).
directive('appVersion', ['version',
    function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }
]).
directive('firepressLogin', ['$firebase',
    function($firebase) {
        return {
            restrict: 'E',
            link: function(scope, iElement, iAttrs) {

            },
            template: '',
            controller: function($firebase)
        };
    }
]);