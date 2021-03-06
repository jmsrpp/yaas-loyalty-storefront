﻿/**
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2015 hybris AG
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of hybris
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with hybris.
 */

(function () {
    'use strict';

    angular.module('ds.account')
        .controller('EditUserNameDialogCtrl', ['$scope', 'account', 'AccountSvc', 'GlobalData', '$modalInstance','$injector','$rootScope',
            function ($scope, account, AccountSvc, GlobalData, $modalInstance, $injector, $rootScope) {

                var LoyaltySvc = $injector.get('LoyaltySvc');
                $scope.account = angular.copy(account);
      
                $scope.titles = GlobalData.getUserTitles();

                $scope.closeEditUserDialog = function () {
                    $modalInstance.dismiss('cancel');
                };

                $scope.updateUserInfo = function () {
                    var account = angular.copy($scope.account);

                    AccountSvc.updateAccount(account).then(function () {
                        //loyalty call
                        LoyaltySvc.getUser().then(function(user){
                           $rootScope.$broadcast('loyaltyInformation:updated', user);
                           
                               LoyaltySvc.updateAccountDetails(account);

                        });
                        $modalInstance.close(account);
                    });
                };

            }]);
})();