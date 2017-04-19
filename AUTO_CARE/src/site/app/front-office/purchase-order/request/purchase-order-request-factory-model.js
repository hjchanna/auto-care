(function () {
    angular.module("appModule")
            .factory("PurchaseOrderRequestModelFactory", function () {
                var factory = {};

                factory.newData = function () {
                    var data = {
                        "indexNo": null,
                        "packageItem": null,
                        "itemUnit": null,
                        "quantity": null,
                        "price": null,
                        "value": null,
                        "orderStatus": "PENDING",
                        "jobStatus": "PENDING",
                        "formCustomer": true,
                        "jobCard": null,
                        "item": null
                    };
                    return data;
                };
                factory.tempData = function () {
                    var tempData = {
                        "indexNo": null,
                        "packageItem": null,
                        "itemUnit": null,
                        "quantity": null
                    };
                    return tempData;
                };

                return factory;
            });
}());