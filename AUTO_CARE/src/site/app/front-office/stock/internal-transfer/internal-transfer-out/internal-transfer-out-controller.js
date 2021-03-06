(function () {
    angular.module("stockTransferInternalOutModule", ['ui.bootstrap']);
    angular.module("stockTransferInternalOutModule")
            .controller("stockTransferInternalOutController", function ($scope, $filter, stockTransferInternalOutModel, $timeout, Notification, ConfirmPane) {
                $scope.model = new stockTransferInternalOutModel();
                $scope.ui = {};

                $scope.ui.new = function () {
                    $scope.ui.mode = 'NEW';
                    $scope.model.data.outDate = $filter('date')(new Date(), 'yyyy-MM-dd');
                    $scope.ui.focus('#date');
                };

                $scope.ui.edit = function (indexNo) {
                    $scope.model.edit(indexNo);
                     $scope.ui.focus('#barcode');
                };

                $scope.ui.delete = function (indexNo) {
                    $scope.model.delete(indexNo);
                     $scope.ui.focus('#barcode');
                };
//
                $scope.ui.save = function () {
                    ConfirmPane.primaryConfirm("Save Internal Transfer Out !")
                            .confirm(function () {
                                $scope.model.saveInternalTransferOut();
//                                        .then(function () {
                                            $scope.ui.mode = "IDEAL";
//                                        });
                            })
                            .discard(function () {
                                Notification.error("External Transfer Save Fail !");
                                console.log('fail');
                            });
                };
//
                $scope.ui.addData = function () {
                    $scope.model.addData();
                    $scope.ui.focus('#barcode');
                };
//                $scope.ui.removeTempData = function () {
//                    $scope.model.removeTempData();
//                };
                $scope.ui.setItemDetail = function (indexNo) {
                    $scope.model.setItemDetail(indexNo);
                      $scope.ui.focus('#qty');
                };
                $scope.ui.focus = function (textId) {
                    $timeout(function () {
                        angular.element(document.querySelectorAll(textId))[0].focus();
                    }, 10);
                };
                $scope.ui.validateBarcode = function (event) {
                    var key = event ? event.keyCode || event.which : 13;
                    if (key === 13) {
                        if ($scope.model.data.fromBranch) {
                            if ($scope.model.data.fromStore) {
                            if ($scope.model.data.toStore) {

                                $scope.model.validateBarcode($scope.model.tempData.barcode);
                                if ($scope.model.tempData.item) {
                                    $scope.ui.focus('#qty');
                                } else {
                                    Notification.error("Item not found!");
                                    $scope.ui.focus('#barcode');
                                }
                            } else {
                                Notification.error("Select ToStock for add Item");
                            }
                            } else {
                                Notification.error("Select FromStock for add Item");
                            }
                        } else {
                            Notification.error("Select Current Branch for add Item");
                        }
                    }
                };
                $scope.ui.focusAddData = function (event) {
                     var key = event ? event.keyCode || event.which : 13;
                    if (key === 13) {
                        $scope.ui.addData();
                    }
                };

                $scope.init = function () {
                    $scope.ui.mode = 'IDEAL';
                };

                $scope.init();
            });
}());

