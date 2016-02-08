app.controller('walletCtrl',
function ($scope, $compile, $timeout, uiCalendarConfig, $modal, $log, $state, $http) {
    $scope.allPayments = [];
    $scope.userid = '1';
    $scope.totalBalance;
    if (localStorage.getItem("customerid") !== "" || localStorage.getItem("admin") === "true") {
        $scope.userid = localStorage.getItem("customerid");
        console.log($scope.userid );
    }

    
    $scope.paymentslist = function () {
        $http.get("./services/getPayments.php",
                {params: {"custid": $scope.userid}})
                .success(function (response) {
                    console.log(response);
                    $scope.allPayments = response;
                });
    };

    $scope.paymentslist();
    $scope.getBalance = function (filtered) {
        $scope.totalBalance = 0;
        for (var i = 0; i < filtered.length; i++) {
            var payment = filtered[i];
            $scope.totalBalance += parseInt(payment.amount);
        }
        return $scope.totalBalance;
    };

    $scope.generatebill = function () {
        alert("Thanks!");
    };

});
