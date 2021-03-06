(function () {
    'use strict';

    angular
        .module('users')
        .controller('PasswordController', PasswordController);

    PasswordController.$inject = ['$scope', '$stateParams', '$http', '$location', 'Authentication', 'PasswordValidator'];

    function PasswordController($scope, $stateParams, $http, $location, Authentication, PasswordValidator) {
        var vm = this;

        vm.resetPassword = resetPassword;
        vm.forgotPassword = forgotPassword;
        vm.authentication = Authentication;
        vm.getPopoverMsg = PasswordValidator.getPopoverMsg;

        // If user is signed in then redirect back home
        if (vm.authentication.getUser()) {
            $location.path('/');
        }

        // Submit forgotten password account id
        function forgotPassword(isValid) {
            vm.success = vm.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.forgotPasswordForm');

                return false;
            }

            $http.post('/api/auth/forgot', vm.credentials).success(function (response) {
                // Show user success message and clear form
                vm.credentials = null;
                vm.success = response.message;

            }).error(function (response) {
                // Show user error message and clear form
                vm.credentials = null;
                vm.error = response.message;
            });
        }

        // Change user password
        function resetPassword(isValid) {
            vm.success = vm.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.resetPasswordForm');

                return false;
            }

            $http.post('/api/auth/reset/' + $stateParams.token, vm.credentials).success(function (response) {
                // If successful show success message and clear form
                vm.passwordDetails = null;

                // Attach user profile
                Authentication.setUser(response);

                // And redirect to the index page
                $location.path('/password/reset/success');
            }).error(function (response) {
                vm.error = response.message;
            });
        }
    }
}());
