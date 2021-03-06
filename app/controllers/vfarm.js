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

function sessionIn(id, name, email, adminlogin){
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("customerid", id);
        localStorage.setItem("customername", name);
        localStorage.setItem("email", email);
        localStorage.setItem("admin", adminlogin);
    } else {
        alert("Sorry, your browser does not support Web Storage...");
    }
}

//auth controllers
app.controller('signinCtrl', function ($scope, $state, $http, $rootScope) {
    $scope.username = "";
    $scope.password = "";
    
    if (localStorage.length > 0 && (localStorage.getItem("customerid") !== "" || localStorage.getItem("admin") === "true")) {
        $state.go('products');
    } else {
        $state.go('login');
    }
    
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
                    sessionIn(response.custid, response.firstname, response.email, "false");
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
                    sessionIn("", "", "", "true");
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
    $scope.firstname = "";
    $scope.lastname = "";
    $scope.address = "";
    $scope.address1 = "";
    $scope.gender = "M";
    $scope.message = "All fields are required.";
    
    $scope.checkAuth = function () {

        if ($scope.signup_email === undefined || $scope.signup_mobile === undefined 
                || $scope.signup_password === undefined) {
            alert("Invalid data..");
        } else {
            var request = $http({
                method: "post",
                url: "./services/signup.php",
                data: {
                    email: $scope.signup_email,
                    mobile: $scope.signup_mobile,
                    pass: $scope.signup_password,
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    address: $scope.address +", "+$scope.address1,
                    gender: $scope.gender
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });

            /* Check whether the HTTP Request is successful or not. */
            request.success(function (data) {
                if(data === "0"){
                    $scope.message = "Email or Mobile number already registered with us.";
                }else{
                    $rootScope.login = true;
                    $scope.message = "Welcome to VishwasFarms... \n\
                        Your login has been created successfully with mobile number " + data;
                    setTimeout(function () {
                        //$state.go('login');
                        location.reload();
                    }, 2000);
                }
            });
        }
    };
});


