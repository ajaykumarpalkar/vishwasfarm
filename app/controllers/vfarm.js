/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//run controllers
app.run(function($rootScope) {
    $rootScope.login = false;
    $rootScope.customername = "abc";
    $rootScope.customerid = 0;
});

//app.factory('Data', function () {
//    return {
//    data: {
//      thecartOrders: [],
//      lengthcartOrders: 0
//    },
//    update: function(temp, len) {
//      // Improve this method as needed
//      this.data.thecartOrders = temp;
//      this.data.lengthcartOrders = len;
//    }
//  };
//});

function sessionIn(id, name, adminlogin){
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("customerid", id);
        localStorage.setItem("customername", name);
        localStorage.setItem("admin", adminlogin);
    } else {
        alert("Sorry, your browser does not support Web Storage...");
    }
}

//auth controllers
app.controller('signinCtrl', function ($scope, $state, $http, $rootScope) {
    $scope.username = "";
    $scope.password = "";
    $scope.checkAuth = function () {
        if ($scope.username === undefined || $scope.password === undefined 
              || $scope.username === "" || $scope.password === "") {
            alert("Please insert valid credentials..");
        } else
        {
            $http.get("./services/getCustomer.php",
                    {params: {"username": $scope.username,
                            "pass": $scope.password}
                    }).success(function (response) {
                if (response) {
                    $scope.customers = response;
                    $rootScope.customername = response.firstname;
                    $rootScope.customerid = response.custid;
                    $rootScope.login = true;
                    sessionIn(response.custid, response.firstname, "false");
                    $state.go('products');
                } else {
                    alert("Wrong Username or password!");
                }

            });
        }
    };
});

app.controller('adminloginCtrl', function ($scope, $state, $http, $rootScope) {
    $scope.username = "";
    $scope.password = "";
    $scope.checkAuth = function () {
        if ($scope.username === undefined || $scope.password === undefined
                || $scope.username === "" || $scope.password === "") {
            alert("Please insert valid credentials..");
        } else
        {
            $http.get("./services/getUser.php",
                    {params: {"username": $scope.username,
                            "pass": $scope.password}
                    }).success(function (response) {
                if (response) {
                    $scope.customers = response;
                    $rootScope.login = true;
                    sessionIn("", "", "true");
                    $state.go('adminpanel');
                } else {
                    alert("Wrong Username or password!");
                }

            });
        }
    };
});

app.controller('signupCtrl', function ($scope, $state, $http, $rootScope) {
    $scope.signup_email = "";
    $scope.signup_mobile = "";
    $scope.signup_password = "";
    $scope.message = "All fields are required.";
    $scope.signupsuccess = true;
    
    $scope.checkAuth = function () {

        if ($scope.signup_email === undefined || $scope.signup_mobile === undefined || $scope.signup_password === undefined) {
            alert("Invalid data..");
        } else {
            var request = $http({
                method: "post",
                url: "./services/signup.php",
                data: {
                    email: $scope.signup_email,
                    mobile: $scope.signup_mobile,
                    pass: $scope.signup_password
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });

            /* Check whether the HTTP Request is successful or not. */
            request.success(function (data) {
                $rootScope.login = true;
                $scope.signupsuccess = false;
                $scope.message = "Welcome to VishwasFarms... Your login has been created successfully with mobile number " + data;
                setTimeout(function() {
                    $state.go('/login');
                }, 200);
                
            });
        }
    };
});


