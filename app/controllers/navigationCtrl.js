app.controller('navigationCtrl', function ($scope, $state, $http, $modal, $rootScope) {
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


    /* event payment model */
    $scope.openCustPayment = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/views/paymentModel.html',
            controller: 'paymentModelCtrl'
        });

        modalInstance.result.then(function () {
            console.log("Customer payment done.");
        }, function () {
            $log.info('Payment Modal dismissed at: ' + new Date());
        });
    };

    $scope.wallet = function () {
        $state.go('wallet');
    };
    
    $scope.orderhistory = function () {
        $state.go('myorders');
    };

    $scope.myprofile = function () {
        $state.go('myprofile');
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
//        $state.go('login');
        window.location.assign("../home.html");
    };

});