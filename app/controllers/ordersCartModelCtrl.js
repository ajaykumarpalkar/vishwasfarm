app.controller('ordersCartModelCtrl',
function ($scope, $modalInstance, cartOrders, userkey, $http) {
    console.log("The key is " + userkey);
    $scope.ordersTitle = "Order Book";
    $scope.cartOrders = cartOrders;
    $scope.addOrders = ['12456'];
    $scope.cancelOrders = ['12456'];
    //$scope.myOrderBook = orderbook;
    $scope.userkey = userkey;

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    $http.get("./services/getCustOrders.php",
        {params: {"custid": 1}})
        .success(function (response) {
            //console.log(response);
            dataFiller(response);
    });


    function dataFiller(response) {
        var orderbook = [];
        for (var i = 0; i < response.length; i++) {
            if(moment(response[i].orderday).isAfter(moment())){
                var formattedDay = moment(response[i].orderday).date();
                var check = _.findIndex(orderbook, function(o) { return o.dayGroup === formattedDay; });

                if (check >= 0){
                    if (response[i].ordergroup === 'Morning') {
                        orderbook[check].morningOrders.push(response[i]);
                    } else {
                        orderbook[check].eveningOrders.push(response[i]);
                    }
                } else{
                    var tempobject = {
                        day: moment(response[i].orderday),
                        dayGroup: formattedDay,
                        morningOrders: [],
                        eveningOrders: []
                    };
                    if (response[i].ordergroup === 'Morning') {
                        tempobject.morningOrders.push(response[i]);
                    } else {
                        tempobject.eveningOrders.push(response[i]);
                    }
                    orderbook.push(tempobject);
                }
            }
        }
        
        $scope.myOrderBook = orderbook;
        
        for (var i = 1; i < 7; i++) {
            var newdate = new Date(y, m, d + i);
            
            var check = _.findIndex(orderbook, function(o) { return o.dayGroup === newdate.getDate(); });
            
            if (check>=0) {
                $scope.myOrderBook[check].day = newdate;
            } else {
                var tempobject = {
                    day: newdate,
                    dayGroup: newdate.getDate(),
                    morningOrders: [],
                    eveningOrders: []
                };
                $scope.myOrderBook.push(tempobject);
            }
        }
    }
    //date.toString('ddd, MMM d, yyyy');

    $scope.removecart = function (index) {
       $scope.cartOrders.splice(index,1);
    };
    
    $scope.removeMOrder = function (morder,day) {
        var editindex = _.findIndex($scope.myOrderBook, function (o) {
            return o.day === day;
        });
        _.pull( $scope.addOrders, morder);
        _.pull($scope.myOrderBook[editindex].morningOrders, morder);
        $scope.cancelOrders.push($scope.myOrderBook[editindex].morningOrders.orderid);
    };
    
        
    $scope.removeEOrder = function (eorder,day) {
        var editindex = _.findIndex($scope.myOrderBook, function (o) {
            return o.day === day;
        });
        _.pull( $scope.addOrders, eorder);
        _.pull($scope.myOrderBook[editindex].eveningOrders, eorder);
        $scope.cancelOrders.push($scope.myOrderBook[editindex].eveningOrders.orderid);
    };

    $scope.morning = function (day) {
        var editindex = _.findIndex($scope.myOrderBook, function (o) {
            return o.day === day;
        });

        for (var i = 0; i < $scope.cartOrders.length; i++) {
            $scope.cartOrders[i].day = day;
            $scope.cartOrders[i].ordergroup = 'Morning';
            $scope.addOrders.push($scope.cartOrders[i]);
            $scope.myOrderBook[editindex].morningOrders.push($scope.cartOrders[i]);
        }
        
        $("#"+editindex).addClass("in");
        
    };
    
    $scope.evening = function (day) {
        var editindex = _.findIndex($scope.myOrderBook, function (o) {
            return o.day === day;
        });
        for (var i = 0; i < $scope.cartOrders.length; i++) {
            $scope.cartOrders[i].day = day;
            $scope.cartOrders[i].ordergroup = 'Evening';
            $scope.addOrders.push($scope.cartOrders[i]);
            $scope.myOrderBook[editindex].eveningOrders.push($scope.cartOrders[i]);
        }
        
        $("#"+editindex).addClass("in");
    };
        
    $scope.ok = function () {
        $scope.dataloading = true;
        
        $http({
            url: "./services/setOrders.php",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
            cancelorders: $scope.cancelOrders,
            neworders: $scope.addOrders
        })
        }).success(function (data, status, headers, config) {
            $scope.dataloading = false;
            $modalInstance.close($scope.title);
        }).error(function (data, status, headers, config) {
            $scope.status = status;
        });

//        $modalInstance.close($scope.title);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    

    $scope.getOrders = function (customerid) {


    };

});




