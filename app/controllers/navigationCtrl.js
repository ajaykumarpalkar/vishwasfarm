app.controller('navigationCtrl', function ($scope, $state, $http, $rootScope) {
    $scope.username = "";
    $scope.userid = "";
    $scope.validlogin = false;
    if (localStorage.getItem("customerid") !== "" || localStorage.getItem("admin") === "true") {
        $scope.username = localStorage.getItem("customername");
        $scope.userid = localStorage.getItem("customerid");
        $scope.validlogin = true;
    } else {
        $state.go('login');
    }


    $scope.wallet = function () {
        $state.go('wallet');
    };
    
    $scope.goproducts = function () {
        $state.go('products');
    };

    $scope.logout = function () {
        // Check browser support
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("customerid", "");
            localStorage.setItem("customername", "");
            localStorage.setItem("admin", "false");
        }
        $state.go('login');
    };

});