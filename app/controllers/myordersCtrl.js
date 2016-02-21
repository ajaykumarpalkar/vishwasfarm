app.controller('myordersCtrl',
function ($scope, $compile, $timeout, $log, $state, $http) {
    $scope.totalBalance;
    var userkey = "-1";
    if (localStorage.getItem("customerid") !== "" || localStorage.getItem("admin") === "true") {
        userkey = localStorage.getItem("customerid");
    } else {
        $state.go('login');
    }
    $http.get("./services/getOrdersAll.php",
        {params: {"custid": userkey}})
        .success(function (response) {
            //console.log(response);
            $scope.allorders = response;
            $scope.allordersbackup = response;
            //getTotal();
        });
    
    $scope.getTotal = function (filtered) {
        $scope.totalquantity = 0;
        $scope.totalunit = 0;
        $scope.totalprice = 0;
        for (var i = 0; i < filtered.length; i++) {
            var product = filtered[i];
            $scope.totalprice += (product.unitprice * product.quantity);
            $scope.totalquantity += parseInt(product.quantity);
            $scope.totalunit += parseInt((product.unit).replace(/[^0-9.]/g, ""));
        }
        return $scope.totalprice;
    };
    
    $scope.getBalance = function (filtered) {
        $scope.totalBalance = 0;
        for (var i = 0; i < filtered.length; i++) {
            var payment = filtered[i];
            $scope.totalBalance += parseInt(payment.amount);
        }
        return $scope.totalBalance;
    };
    
    $scope.ordersbymonth = function () {
        var filtered = [];
        angular.forEach($scope.allorders, function (order) {
            var boo1 = moment($scope.fromdt).isBefore(moment(order.orderday));
            var boo2 = moment($scope.todt).isAfter(moment(order.orderday));
            if (boo1 && boo2) {
                filtered.push(order);
            }
        });
        $scope.allorders = filtered;
    };
    
    $scope.reset = function () {
        $scope.allorders = $scope.allordersbackup;
    };
    
    $scope.cancelorder = function (oid) {
        var order = {
            "oid": oid
        };

        $http({
            url: "./services/updateOrder.php",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
                updateorder: order
            })
        }).success(function (response) {
            //console.log(response);
            var index = _.findIndex($scope.allorders, function (o) {
                return o.orderid === oid;
            });
            $scope.allorders.splice(index, 1);
        });
    };
    
    $scope.changestate = function (oid, states) {

        var order = {
            "oid": oid,
            "states": states
        };

        $http({
            url: "./services/updateOrder.php",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
                updateorder: order
            })
        }).success(function (response) {
            //console.log(response);
            var index = _.findIndex($scope.allorders, function (o) {
                return o.orderid === oid;
            });
            $scope.allorders[index].deliveryStatus = states;
        });
    };

});
