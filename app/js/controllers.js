'use strict';

/* Controllers */

angular.module('myApp.controllers', ['LocalStorageModule', 'firebase', 'ngCkeditor'])
    .controller('pageCtrl', ['$scope', '$firebase', 'firebase_root', '$stateParams',
        function($scope, $firebase, firebase_root, $stateParams) {
            var ref = new Firebase(firebase_root + '/pages/' + $stateParams.page);
            var promise = $firebase(ref);
            promise.$on("loaded", function() {
                $scope.pages = promise;
                angular.element('#content').html($scope.pages.content);
            })
        }
    ])
    .controller('editCtrl', ['$scope', '$firebase', 'firebase_root', '$stateParams', '$sce',
        function($scope, $firebase, firebase_root, $stateParams, $sce) {
            var ref = new Firebase(firebase_root + '/pages/' + $stateParams.page);
            var promise = $firebase(ref);
            promise.$on("loaded", function() {
                $scope.pages = promise;
                angular.element('#content').html($scope.pages.content);
                $scope.deliberatelyTrustDangerousSnippet = function() {
                    return $sce.trustAsHtml($scope.pages.content);
                };
                $scope.save = function() {
                    $scope.pages.$save('content');

                }
            })


            $scope.editorOptions = {
                toolbar_full: [{
                        name: 'basicstyles',
                        items: ['Bold', 'Italic', 'Strike', 'Underline']
                    }, {
                        name: 'paragraph',
                        items: ['BulletedList', 'NumberedList', 'Blockquote']
                    }, {
                        name: 'editing',
                        items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
                    }, {
                        name: 'links',
                        items: ['Link', 'Unlink', 'Anchor']
                    }, {
                        name: 'tools',
                        items: ['SpellChecker', 'Maximize']
                    },
                    '/', {
                        name: 'styles',
                        items: ['Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat']
                    }, {
                        name: 'insert',
                        items: ['Image', 'Table', 'SpecialChar']
                    }, {
                        name: 'forms',
                        items: ['Outdent', 'Indent']
                    }, {
                        name: 'clipboard',
                        items: ['Undo', 'Redo']
                    }, {
                        name: 'document',
                        items: ['PageBreak', 'Source']
                    }
                ],
                language: 'en',
                uiColor: '#000000'
            };

        }
    ])
    .controller('IndexCtrl', ['$scope', 'localStorageService', 'firebase_root', '$firebase',
        function($scope, localStorageService, firebase_root, $firebase) {
            var ref = new Firebase(firebase_root + '/pages');
            var promise = $firebase(ref);
            promise.$on("loaded", function() {
                $scope.pages = promise
                $scope.links = [];
                angular.forEach($scope.pages, function(key, value) {
                    if (typeof(key) === 'object') {
                        $scope.links.push(key);
                        console.log(key);
                        console.log(value);
                    }


                })
                $scope.order = "order";
            })

        }
    ]);