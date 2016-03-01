app.controller('myprofileCtrl', function ($scope, $state, $http, $rootScope) {

    $http.get("./services/getCustomer1.php",
                {params: {"username": localStorage.getItem("email")}
            }).success(function (response) {
        if (response) {
            $scope.custid = response.custid;
            $scope.signup_email = response.email;
            $scope.signup_mobile = response.contact;
            $scope.signup_password = response.cpassword;
            $scope.firstname = response.firstname;
            $scope.lastname = response.lastname;
            $scope.address = response.address;
            $scope.address1 = response.address;
            $scope.gender = response.gender;
            $scope.message = "Edit your profile";
        } else {
            alert("Invalid Session!");
        }

    });          

    $scope.updateProfile = function () {

        if ($scope.signup_email === undefined || $scope.signup_mobile === undefined) {
            alert("Invalid data..");
        } else {
            var request = $http({
                method: "post",
                url: "./services/updateMyprofile.php",
                data: {
                    custid: $scope.custid,
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
                $scope.message = "Your profile has been modified successfully, Your mobile number is" + data;
            });
        }
    };
});
