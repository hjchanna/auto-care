(function () {
    angular.module("appModule")
            .factory("invoiceModel", function (invoiceService, invoiceFactory, $filter, $q, Notification) {
                function invoiceModel() {
                    this.constructor();
                }
                invoiceModel.prototype = {
                    //master list
                    vehicleList: [],
                    employeeList: [],
                    clientList: [],
                    priceCategoryList: [],
                    pendingJobCards: [],
                    bankList: [],
                    branchList: [],
                    cardTypeList: [],
                    branchSearchList: [],
                    //trasactons list
                    invoiceData: {},
                    employeeData: {},
                    paymentData: {},
                    paymentInfomationData: {},
                    paymentInformationList: [],
                    invoicePaymentData: {},

                    vehicleIsNew: false,
                    clientIsNew: false,
                    //master data lists

                    constructor: function () {
                        var that = this;
                        this.employeeData = invoiceFactory.newEmployeeData();
                        this.invoiceData = invoiceFactory.newInvoiceData();
                        this.paymentData = invoiceFactory.newPaymentData();
                        this.paymentInfomationData = invoiceFactory.newPaymentInformation();
                        //payment invoice model (mix model)
                        this.invoicePaymentData = invoiceFactory.newInvoicePayment();
                        this.relordPendingJobCard();

                        invoiceService.loadVehicle()
                                .success(function (data) {
                                    that.vehicleList = data;
                                });

                        invoiceService.loadEmployee()
                                .success(function (data) {
                                    that.employeeList = data;
                                });

                        invoiceService.loadClient()
                                .success(function (data) {
                                    that.clientList = data;
                                });

                        invoiceService.loadBank()
                                .success(function (data) {
                                    that.bankList = data;
                                });

                        invoiceService.loadBranch()
                                .success(function (data) {
                                    that.branchList = data;
                                });

                        invoiceService.loadCardType()
                                .success(function (data) {
                                    that.cardTypeList = data;
                                });

                        invoiceService.loadPriceCategory()
                                .success(function (data) {
                                    that.priceCategoryList = data;
                                });
                    },
                    clear: function () {
                        this.employeeData = invoiceFactory.newEmployeeData();
                        this.invoiceData = invoiceFactory.newInvoiceData();
                        this.paymentData = invoiceFactory.newPaymentData();
                        this.paymentInfomationData = invoiceFactory.newPaymentInformation();
                        //payment invoice model (mix model)
                        this.invoicePaymentData = invoiceFactory.newInvoicePayment();
                        this.paymentInformationList = [];
                    },
                    vehicle: function (indexNo) {
                        var data = "";
                        angular.forEach(this.vehicleList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    client: function (indexNo) {
                        var data = "";
                        angular.forEach(this.clientList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    getClientIsNew: function (indexNo) {
                        var that = this;
                        that.clientIsNew = false;
                        angular.forEach(this.clientList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                if (values.isNew) {
                                    console.log(indexNo);
                                    that.clientIsNew = true;
                                    return;

                                }
                            }
                        });
                    },
                    getVehicleIsNew: function (indexNo) {
                        var that = this;
                        that.vehicleIsNew = false;
                        angular.forEach(this.vehicleList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                if (values.isNew) {
                                    console.log(indexNo);
                                    that.vehicleIsNew = true;
                                    return;

                                }
                            }
                        });
                    },
                    bankLable: function (indexNo) {
                        var data = "";
                        angular.forEach(this.bankList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values.name;
                                return;
                            }
                        });
                        return data;
                    },
                    employeeLable: function (indexNo) {
                        var data = "";
                        angular.forEach(this.employeeList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values.indexNo + " - " + values.name;
                                return;
                            }
                        });
                        return data;
                    },
                    employee: function (indexNo) {
                        var data = "";
                        angular.forEach(this.employeeList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    },
                    branchkLable: function (indexNo) {
                        var data = "";
                        angular.forEach(this.branchList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values.name;
                                return;
                            }
                        });
                        return data;
                    },
                    cardTypeLable: function (indexNo) {
                        var data = "";
                        angular.forEach(this.cardTypeList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values.name;
                                return;
                            }
                        });
                        return data;
                    },
                    findByBranchList: function (bank) {
                        var that = this;
                        var defer = $q;
                        invoiceService.loadBranchByBank(bank)
                                .success(function (data) {
                                    that.branchSearchList = data;
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        defer.promise;
                    },
                    getJobItemHistory: function (jobCard) {
                        var defer = $q.defer();
                        var that = this;
                        this.invoiceData.amount = 0.0;
                        invoiceService.getJobItemHistory(jobCard)
                                .success(function (data) {
                                    angular.forEach(data, function (values) {
                                        that.invoiceData.amount += values.value;
                                        that.getPaymentDetails();
                                        return;
                                    });
                                    defer.resolve();
                                })
                                .error(function () {
                                    that.invoiceData.amount = 0.0;
                                    defer.reject();
                                });
                        return  defer.promise;
                    },
                    getClientOverPayment: function (client) {
                        var defer = $q.defer();
                        var that = this;
                        invoiceService.getClientOverPayment(client)
                                .success(function (data) {
                                    console.log(data);
                                    if (data > 0) {
                                        that.paymentData.overAmount = parseFloat(data);
                                    } else {
//                                        that.paymentData.creditAmount = parseFloat(data * -1);
                                    }
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    getClientBalance: function (client) {
                        var defer = $q.defer();
                        var that = this;
                        invoiceService.getClientBalance(client)
                                .success(function (data) {
                                    console.log(data);
                                    if (data > 0) {
                                        that.paymentData.creditAmount = parseFloat(data);
                                    }
                                    defer.resolve();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    loadInvoiceData: function () {
                        var defer = $q.defer();
                        var that = this;
                        invoiceService.loadInvoiceData(this.invoicePaymentData.invoiceData.number)
                                .success(function (data) {
                                    that.clear();
                                    that.invoicePaymentData = data;
                                    that.invoiceData = that.invoicePaymentData.invoice;
                                    that.paymentData = that.invoicePaymentData.payment;
                                    that.paymentInformationList = that.invoicePaymentData.paymentInformationsList;

                                    that.cashPayment = parseFloat(that.getTotalPaymentTypeWise('CASH'));
                                    that.paymentData.overSettlementAmount = parseFloat(that.getTotalPaymentTypeWise('OVER_PAYMENT_SETTLEMENT'));
                                    that.getPaymentDetails();
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    relordPendingJobCard: function () {
                        var that = this;
                        invoiceService.pendingJobCards()
                                .success(function (data) {
                                    that.pendingJobCards = [];
                                    angular.forEach(data, function (job) {
                                        job.vehicleNo = that.vehicle(job.vehicle).vehicleNo;
                                        that.pendingJobCards.push(job);
                                    });
                                });
                    },
                    saveInvoice: function () {
                        var that = this;
                        var defer = $q.defer();
                        this.invoiceData.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                        this.invoicePaymentData.invoice = this.invoiceData;
                        this.paymentData.overPaymentAmount = this.paymentData.overSettlementAmount;
                        this.invoicePaymentData.payment = this.paymentData;
                        this.invoicePaymentData.paymentInformationsList = this.paymentInformationList;

                        invoiceService.saveInvoice(JSON.stringify(this.invoicePaymentData))
                                .success(function (data) {
                                    that.relordPendingJobCard();
                                    that.invoicePaymentData.invoice.jobCard;
                                    defer.resolve(data);
                                })
                                .error(function () {
                                    defer.reject();
                                });
                        return defer.promise;
                    },
                    //total payment CASH,CHEQUE,CARD
                    getTotalPaymentTypeWise: function (type) {
                        var total = 0.0;
                        angular.forEach(this.paymentInformationList, function (values) {
                            if (values.type === type) {
                                total += values.amount;
                                return;
                            }
                        });
                        return total;
                    },
                    getPaymentDetails: function () {
                        this.invoiceData.netAmount = parseFloat(this.invoiceData.amount - this.invoiceData.discountAmount);

                        this.paymentData.cashAmount = parseFloat(this.getTotalPaymentTypeWise('CASH'));
                        this.paymentData.chequeAmount = parseFloat(this.getTotalPaymentTypeWise('CHEQUE'));
                        this.paymentData.cardAmount = parseFloat(this.getTotalPaymentTypeWise('CARD'));
                        this.paymentData.overSettlementAmount = parseFloat(this.getTotalPaymentTypeWise('OVER_PAYMENT_SETTLEMENT'));

                        this.paymentData.totalAmount =
                                parseFloat(this.paymentData.cashAmount)
                                + parseFloat(this.paymentData.cardAmount)
                                + parseFloat(this.paymentData.chequeAmount)
                                + parseFloat(this.paymentData.overSettlementAmount);

                        this.paymentData.balance = parseFloat(this.invoiceData.netAmount - this.paymentData.totalAmount);

                        if (parseFloat(this.paymentData.balance) < 0) {

                            this.paymentData.overPayment = parseFloat(-1 * this.paymentData.balance);

                            this.paymentData.balance = 0.0;
                        } else {
                            this.paymentData.overPayment = 0.0;
                        }
                    },
                    //insert cash payment
                    getInsertCashPayment: function (amount, type) {
                        this.paymentInfomationData.amount = parseFloat(amount);
                        this.paymentInfomationData.type = type;
                        this.paymentInformationList.push(this.paymentInfomationData);
                        this.paymentInfomationData = {};
                    },
                    //insert card or cheque payment
                    getInsertCardAndChequePayment: function (paymentInfomationData, type) {
                        paymentInfomationData.type = type;
                        this.paymentInformationList.push(paymentInfomationData);
                        this.paymentInfomationData = {};
                    },
                    //insert client over payment settle
                    insertClientOverPaymentSettlment: function (amount, type) {
                        this.paymentInfomationData = invoiceFactory.newPaymentInformation();
                        this.paymentInfomationData.type = type;
                        this.paymentInfomationData.amount = amount;
                        this.paymentInformationList.push(this.paymentInfomationData);
                        this.paymentInfomationData = {};
                    },
                    deleteOverPayment: function () {
                        var that = this;
                        angular.forEach(this.paymentInformationList, function (values) {
                            if (values.type === "OVER_PAYMENT_SETTLEMENT") {
                                that.paymentInformationList.splice(that.paymentInformationList.indexOf(values), 1);
                                that.getPaymentDetails();
                                ;
                            }
                        });
                    },
                    //delete card payment and cheque payment
                    getCardAndChequePaymentDelete: function (number) {
                        var that = this;
                        var id = -1;
                        for (var i = 0; i < that.paymentInformationList.length; i++) {
                            if (that.paymentInformationList[i].number === number) {
                                id = i;
                            }
                        }
                        this.paymentInformationList.splice(id, 1);
                        this.getPaymentDetails();
                    },
                    //cash payment delete
                    getCashPaymentDelete: function () {
                        var that = this;
                        angular.forEach(this.paymentInformationList, function (values) {
                            if (values.type === 'CASH') {
                                that.paymentInformationList.splice(that.paymentInformationList.indexOf(values), 1);
                                that.getPaymentDetails();
                            }
                        });
                    }, priceCategoryData: function (indexNo) {
                        var data = "";
                        angular.forEach(this.priceCategoryList, function (values) {
                            if (values.indexNo === parseInt(indexNo)) {
                                data = values;
                                return;
                            }
                        });
                        return data;
                    }

                };
                return invoiceModel;
            });
}());