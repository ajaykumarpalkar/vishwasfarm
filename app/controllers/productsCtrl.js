app.controller('productsCtrl',
   function($scope, $compile, $timeout, $modal, $log, $http, $stateParams) {
      console.log("Params............."+$stateParams.obj);
      $scope.cartOrders = [];
      $scope.products = products;
      var qty = 1;
//    $scope.products1 = products.slice(0, 4);
//    $scope.products2 = products.slice(5, 6);

//    $('#milkproducts').on('click', '.productunit', function () {
//        if (Data.data.lengthcartOrders >= 2) {
//            alertselectedTitle("Maximum 2 orders allowed at a time.");
//        } else {
//            $("[name='optradio']").removeClass("btn-success");
//            $(".panel-footer").removeClass("panelfooterlight");
//            var product_unit_price = "";
//            product_unit_price = $(this).val();
//            var res = product_unit_price.split("X");
//
//            funTempOrder(res[0], res[1], $("#loginid").val());
//            $(this).toggleClass("btn-success");
//            $(this).closest(".panel").find(".panel-footer").toggleClass("panelfooterlight");
//        }
//    });
$scope.dataloading = true;
    $http.get("./services/getProducts.php",
        {params: {"custid": $stateParams.obj}})
        .success(function (response) {
            //console.log(response);
            dataFiller(response);
            $scope.dataloading = false;
    });
    
      
    function dataFiller(response) {
        var products = [];
        for (var i = 0; i < response.length; i++) {
            var productname = response[i].productname;
            var status = "In Stock";
            if (parseInt(response[i].statusa) === 0) {
                status = "Out of stock";
            }
            var check = _.findIndex(products, function(o) { return o.productname === productname; });
            if (check >= 0){
                var sub = {
                    unitdisplay: response[i].unitdisplay,
                    unit: response[i].unit,
                    price: response[i].unitprice,
                    status: status
                };
                products[check].subproducts.push(sub);
            } else{
                var tempobject = {
                    productid: 'd' + i,
                    productname: productname,
                    category: response[i].category,
                    img: response[i].img,
                    subproducts: [
                        {
                            unitdisplay: response[i].unitdisplay,
                            unit: response[i].unit,
                            price: response[i].unitprice,
                            status: status
                        }
                    ]
                };
                products.push(tempobject);
            }
        }
        $scope.products = products;
    }
    
    $('#milkproducts').on('click', '.decrease', function () {
        qty = parseInt($(this).closest('.panel-footer').find('.badge').text());
        if (qty <= 1) {
            alert("Zero quantity not allowed");
        } else {
            $(this).closest('.panel-footer').find('.badge').text(qty - 1);
        }

    });

    $('#milkproducts').on('click', '.increase', function () {
        qty = parseInt($(this).closest('.panel-footer').find('.badge').text());
        if (qty >= 4) {
            alert("Quantity should be less than 4");
        } else {
            $(this).closest('.panel-footer').find('.badge').text(qty + 1);
        }
    });

    function funTempOrder(pid, subpid, loginid) {
 	//var pid = parseInt(pid.replace("d", ""))+1;
        var subpid = parseInt(subpid);
        //alert(pid + " " + subpid);
        var opro = $($scope.products).filter(function(i,p){return p.productid===pid;})[0];//[pid - 1];
        var osubpro = opro.subproducts[subpid];
        if(osubpro.status === 'In Stock'){
            var d = new Date();
            var orderid = d.getTime() + "" + loginid;
            var tempOrder = {
                day: new Date(),
                userid: $("#loginid").val(),
                orderid: orderid,
                product_name: opro.productname,
                unitdisplay: osubpro.unitdisplay,
                unit: osubpro.unit,
                quantity: qty,
                unitprice: osubpro.price,
                ordergroup: 'Morning',
                deliveryStatus: 'N'
            };
            $scope.cartOrders.push(tempOrder);
        }else{
            alert("Out of stock");
        }
    }
    
    $scope.cart = function (id, index) {

        if ($scope.cartOrders.length >= 4) {
            alert("Maximum 4 orders allowed at a time.");
        } else {
            $scope.activeProduct = id;
            $scope.activeUnit = index;
            funTempOrder(id, index, "c1");
        }
    };
    
    $scope.removecart = function (index) {
       $scope.cartOrders.splice(index,1);
    };

    /* event model */
    $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/views/ordersCart.html',
            controller: 'ordersCartModelCtrl',
            resolve: {
                cartOrders: function () {
                    return $scope.cartOrders;
                },
                userkey: function () {
                    return $("#loginid").val();
                }
            }
        });

        modalInstance.result.then(function (selectedTitle) {
            console.log("value get..." + selectedTitle);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
   
});



