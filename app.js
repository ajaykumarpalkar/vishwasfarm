var app = angular.module('appVfarm', ['ui.router', 'ui.bootstrap', 'ui.select2', 'angularUtils.directives.dirPagination','ui.calendar']);
app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');
    $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home.html'
            })
            .state('login', {
                url: '/login',
                views: {
                    content: {
                        templateUrl: 'app/views/log_in.html',
                        controller: 'signinCtrl'
                    },
                    footer: {
                        templateUrl: 'app/views/footer.html'
                    }
                }
            })
            .state('products', {
                url: '/products',
                views: {
                    nav: {
                        templateUrl: 'app/views/navigation.html',
                        controller: 'navigationCtrl'
                    },
                    content: {
                        templateUrl: 'app/views/products.html',
                        controller: 'productsCtrl'
                    },
                    footer: {
                        templateUrl: 'app/views/footer.html'
                    }
                }
            })
            
            .state('adminpanel', {
                url: '/adminpanel',
                views: {
                    content: {
                        templateUrl: 'app/views/adminpanel.html',
                        controller: 'adminpanel'
                    },
                    footer: {
                        templateUrl: 'app/views/footer.html'
                    }
                }
            })
            
            .state('wallet', {
                url: '/wallet',
                views: {
                    nav: {
                        templateUrl: 'app/views/navigation.html',
                        controller: 'navigationCtrl'
                    },
                    content: {
                        templateUrl: 'app/views/wallet.html',
                        controller: 'walletCtrl'
                    },
                    footer: {
                        templateUrl: 'app/views/footer.html'
                    }
                }
            })

//            // nested list with custom controller
//            .state('home.list', {
//                url: '/list',
//                templateUrl: 'partial-home-list.html',
//                controller: function ($scope) {
//                    $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
//                }
//            })
//
//            // nested list with just some random string data
//            .state('home.paragraph', {
//                url: '/paragraph',
//                template: 'I could sure use a drink right now.'
//            })

            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('about', {
                // we'll get to this in a bit       
            });
//    }).run(function ($state) {
//        $state.go('signin'); //make a transition to signin state when app starts
});

