app.controller('adminpanel',
function ($scope, $compile, $timeout, uiCalendarConfig, $modal, $log, $state, $http) {
        $scope.totalquantity = 0;
        $scope.totalunit = 0;
        $scope.totalprice = 0;
        $scope.allorders=[];
        $scope.allordersbackup=[];
        $scope.allProducts=[];
        
        $scope.allPayments=[];
        
            $scope.paymentslist = function () {
        $scope.showproductslist = false;
        $scope.showorders = false;
        $scope.showpaymentlist = true;
        
        $scope.showproductsclass = '';
        $scope.showordersclass = '';
        $scope.showpaymentsclass = 'li-active';
        $http.get("./services/getPayments.php",
                {params: {"custid": '0'}})
                .success(function (response) {
                    //console.log(response);
                    $scope.allPayments = response;
                });
    };
    
    $scope.productslist = function () {
        $scope.showproductslist = true;
        $scope.showorders = false;
        $scope.showpaymentlist = false;
        $scope.showproductsclass = 'li-active';
        $scope.showordersclass = '';
        $scope.showpaymentsclass = '';
        $http.get("./services/getProducts.php",
                {params: {"custid": 1}})
                .success(function (response) {
                    //console.log(response);
                    $scope.allProducts = response;
                });
    };
    
    $scope.newproduct_name = "";
    $scope.newproduct_category = "";
    $scope.newproduct_imgurl = "";
    $scope.newproduct_status = 0;
    $scope.newproduct_unit = 0;
    $scope.newproduct_price = 0;
    
    $scope.isadd = false;
    if($scope.newproduct_name!=="" && $scope.newproduct_category !=="" 
            && $scope.newproduct_status > 0 && $scope.newproduct_price > 0){
        $scope.isadd = true;
    }
    
    $scope.addproduct = function () {
        $scope.dataloading = true;
        var product = {
            productid: '1New',
            productname: $scope.newproduct_name,
            category: $scope.newproduct_category,
            statusa: $scope.newproduct_status,
            img: $scope.newproduct_imgurl,
            unit: $scope.newproduct_unit,
            unitprice: $scope.newproduct_price
        };

        $http({
            url: "./services/setProducts.php",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
                newproduct: product
            })
        }).success(function (data, status, headers, config) {

            $scope.allProducts.push(product);
            $scope.dataloading = false;
            $scope.alertmsg = "New Product has been added at bottom of list.";
        }).error(function (data, status, headers, config) {
            $scope.status = status;
        });
    };

    $scope.changestate = function (oid, states) {
        var index = _.findIndex($scope.allorders, function (o) {
            return o.orderid === oid;
        });
        $scope.allorders[index].deliveryStatus = states;
    };
    
    $scope.cancelorder = function (oid) {
        var index = _.findIndex($scope.allorders, function (o) {
            return o.orderid === oid;
        });
        $scope.allorders.splice(index, 1);
    };
    
    $scope.deleteproduct = function (productid) {
        $http.get("./services/deleteProduct.php",
            {params: {"productid": productid}})
            .success(function (response) {
                //console.log(response);
                var index = _.findIndex($scope.allProducts, function (o) {
                    return o.productid === productid;
                });
                $scope.allProducts.splice(index, 1);
            });
    };
    
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
    
    $scope.generatebill = function () {
        alert("Relax, Email and Notification has been sent!");
    };
    
    $scope.orderslist = function () {
        $scope.showproductslist = false;
        $scope.showorders = true;
        $scope.showpaymentlist = false;
        $scope.showproductsclass = '';
        $scope.showordersclass = 'li-active';
        $scope.showpaymentsclass = '';
        $http.get("./services/getOrdersAll.php",
                {params: {"custid": 1}})
                .success(function (response) {
                    //console.log(response);
                    $scope.allorders = response;
                    $scope.allordersbackup = response;
                    //getTotal();
                });
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
         
    $scope.logout = function () {
        // Check browser support
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("customerid", "");
            localStorage.setItem("customername", "");
            localStorage.setItem("admin", "false");
        }
        $state.go('login');
    };
    
    //datepicker
    $scope.today = function () {
        $scope.fromdt = new Date();
        $scope.todt = new Date();
    };

    $scope.setDate = function (year, month, day) {
        $scope.fromdt = new Date(year, month, day);
        $scope.todt = new Date(year, month, day);
    };

    $scope.clear = function () {
//        $scope.fromdt = null;
//        $scope.todt = null;
        $scope.today();
    };

    var tomorrow15 = new Date();
    tomorrow15.setDate(tomorrow15.getDate() + 15);
    var afterTomorrow30 = new Date();
    afterTomorrow30.setDate(afterTomorrow30.getDate() + 30);
    
    $scope.today();
    $scope.todt = tomorrow15;

  // Disable weekend selection
//  $scope.disabled = function(date, mode) {
//    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
//  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

  //$scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

    
});


//app.filter('filterCustomers', function () {
//     return function (items, letter) {
//         var filtered = [];
//
//         if (letter === undefined || letter === '') {
//             return items;
//         }
//
//         angular.forEach(items, function(item) {
//             if ( letter === item.ordergroup || letter === undefined || letter === "") {
//                 filtered.push(item);
//             }
//         });
//         return filtered;
//     };
// });








