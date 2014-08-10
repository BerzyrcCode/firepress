'use strict';

/* Controllers */

angular.module('myApp.controllers', ['LocalStorageModule', 'firebase', 'ngCkeditor'])
    .controller('pageCtrl', ['$scope', '$firebase', 'firebase_root', '$stateParams',
        function($scope, $firebase, firebase_root, $stateParams) {
            var ref = new Firebase(firebase_root + '/pages/' + $stateParams.page);
            var promise = $firebase(ref).$asObject();
            promise.$loaded(function() {
                $scope.pages = promise;
                angular.element('#content').html($scope.pages.content);
            })
        }
    ])
    .controller('editCtrl', ['$scope', '$firebase', 'firebase_root', '$stateParams', '$sce',
        function($scope, $firebase, firebase_root, $stateParams, $sce) {
            var ref = new Firebase(firebase_root + '/pages/' + $stateParams.page);
            var promise = $firebase(ref).$asObject();
            promise.$loaded(function() {
                $scope.pages = promise;
                //angular.element('#content').html($scope.pages.content);
                $scope.deliberatelyTrustDangerousSnippet = function() {
                    return $sce.trustAsHtml($scope.pages.content);
                };
                $scope.save = function() {
                    $scope.pages.$save();

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
                language: 'en'
            };

        }
    ])
    .controller('IndexCtrl', ['$scope', 'localStorageService', 'firebase_root', '$firebase',
        function($scope, localStorageService, firebase_root, $firebase) {
            var ref = new Firebase(firebase_root + '/pages');
            var promise = $firebase(ref).$asArray();
            promise.$loaded(function() {

                $scope.links = promise;

                $scope.order = "order";
            })

        }
    ]);