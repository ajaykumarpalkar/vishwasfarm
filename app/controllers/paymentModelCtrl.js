app.controller('paymentModelCtrl',
function ($scope, $modalInstance, $http) {
//    console.log("The key is " + key);
    $scope.customer;
    $scope.amount;

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    $http.get("./services/getAllCustomer.php",
        {params: {"custid": 1}})
        .success(function (response) {
            console.log(response);
//            dataFiller(response);
    });
    
    $scope.paynow = function () {
        $scope.dataloading = true;
        $http({
            url: "./services/setPayment.php",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
            paymentdate: new Date(),
            customerid: $scope.customer,
            amount: $scope.amount
        })
        }).success(function (data, status, headers, config) {
            $scope.dataloading = false;
            $modalInstance.close($scope.title);
        }).error(function (data, status, headers, config) {
            $scope.status = status;
        });
    };


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    

});




