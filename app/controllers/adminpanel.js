app.controller('adminpanel',
function ($scope, $compile, $timeout, uiCalendarConfig, $modal, $log, $state, $http) {
    $scope.totalquantity = 0;
    $scope.totalunit = 0;
    $scope.totalprice = 0;
    $scope.allorders=[];
    $scope.allordersbackup=[];
    $scope.allProducts=[];
    $scope.allPayments=[];

    /* event payment model */
    $scope.openPayment = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/views/paymentModel.html',
            controller: 'paymentModelCtrl'
        });

        modalInstance.result.then(function () {
            console.log("payment done.");
        }, function () {
            $log.info('Payment Modal dismissed at: ' + new Date());
        });
    };
    
    /*Payments and Orders*/
    $scope.transactions = function () {
        $scope.showproductslist = false;
        $scope.showorders = false;
        $scope.showpaymentlist = true;

        $scope.showproductsclass = '';
        $scope.showordersclass = '';
        $scope.showpaymentsclass = 'li-active';
        $http.get("./services/getTransactions.php",
                {params: {"custid": '0'}})
                .success(function (response) {
                    //console.log(response);
                    $scope.allPayments = response;
                });
    };
    
    /*Products*/
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
    
    var nimages = "noimage.png";
    $scope.newproduct_name = "";
    $scope.newproduct_category = "";
    //$scope.newproduct_imgurl = nimages;
    $scope.newproduct_status = "1";
    $scope.newproduct_unit = 0;
    $scope.newproduct_price;
    
    $scope.addproduct = function () {
        $scope.dataloading = true;
        $scope.newproduct_imgurl = nimages;
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
    
    $("#uploadimage").on('submit', (function (e) {
        e.preventDefault();
        $("#message").empty();
        $("#message").html("Upload product image loading...");
        $.ajax({
            url: "./services/upload.php", // Url to which the request is send
            type: "POST", // Type of request to be send, called as method
            data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false, // The content type used when sending data to the server.
            cache: false, // To unable request pages to be cached
            processData: false, // To send DOMDocument or non processed data file it is set to false
            success: function (data)   // A function to be called if request succeeds
            {
                if (data.includes("<h5>")) {
                    nimages = "images/" + data.substring(data.indexOf("<h5>") + 4, data.indexOf("</h5>"));
                    $("#previewimg").attr("src", nimages);
                }
                $("#message").html(data);
            }
        });
    }));

    $scope.deleteproduct = function (productid) {
        if (confirm("Are you sure?")) {
            $http.get("./services/deleteProduct.php",
                    {params: {"productid": productid}})
                    .success(function (response) {
                        //console.log(response);
                        var index = _.findIndex($scope.allProducts, function (o) {
                            return o.productid === productid;
                        });
                        $scope.allProducts.splice(index, 1);
                    });
        }
    };
    
    /*Orders*/
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
    
    $scope.exportTransactions = function () {
        alasql('SELECT * INTO XLSX("Transactions.xlsx",{headers:true}) FROM ?', [$scope.allPayments]);
    };

    $scope.orderslist = function () {
        $scope.showproductslist = false;
        $scope.showorders = true;
        $scope.showpaymentlist = false;
        $scope.showproductsclass = '';
        $scope.showordersclass = 'li-active';
        $scope.showpaymentsclass = '';
        $http.get("./services/getOrdersAll.php",
                {params: {"custid": 0}})
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
    
    
    $scope.exportOrders = function () {
        alasql('SELECT * INTO XLSX("Orders.xlsx",{headers:true}) FROM ?', [$scope.allorders]);
    };

    /*Credentials*/   
    $scope.logout = function () {
        // Check browser support
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("customerid", "");
            localStorage.setItem("customername", "");
            localStorage.setItem("admin", "false");
        }
        //$state.go('login');
        window.location.assign("../home.html");
    };
    
    /*Datepicker*/
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

  //default page loading
  $scope.orderslist();
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








