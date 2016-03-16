app.controller('paymentModelCtrl',
    function ($scope, $modalInstance, $http) {
        //console.log("The key is " + key);
        $scope.customer;
        $scope.amount;

        $http.get("./services/getAllCustomer.php",
                {params: {"custid": 1}})
                .success(function (response) {
                    $scope.allCustomer = response;
                });

        $scope.paynow = function () {
            $scope.dataloading = true;
            $scope.status = "loading...";
            var date = new Date();
            $http({
                url: "./services/setPayment.php",
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param({
                    paymentdate: date+"",
                    customerid: $scope.customer,
                    amount: $scope.amount
                })
            }).success(function (data, status, headers, config) {
                $scope.dataloading = false;
                $modalInstance.close();
            }).error(function (data, status, headers, config) {
                $scope.status = status;
            });
        };


        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });




