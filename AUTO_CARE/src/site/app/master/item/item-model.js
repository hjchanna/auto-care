(function () {
    var factory = function (itemFactory, itemService, $q, $filter) {
        function itemModel() {
            this.constructor();
        }

        //prototype functions
        itemModel.prototype = {
            //data model
            itemData: {},
            itemUnitData: {},
            //uib-typeahead
            items: [],
            itemunits: [],
            itemDepartments: [],
            categorys: [],
            subCategorys: [],
            brands: [],
            //view table lists
            itemViewList: [],
            itemunitsViewList: [],
            //constructor
            constructor: function () {
                var that = this;

                that.itemData = itemFactory.newItemData();
                that.itemUnitData = itemFactory.newItemUnitData();

                itemService.loadItem()
                        .success(function (data) {
                            that.items = data;
                            that.itemViewList = data;
                        });

                itemService.loadItemUnit()
                        .success(function (data) {
                            that.itemunitsViewList = data;
                        });

                itemService.loadCategory()
                        .success(function (data) {
                            that.categorys = data;
                        });

                itemService.loadSubCategory()
                        .success(function (data) {
                            that.subCategorys = data;
                        });

                itemService.loadBrand()
                        .success(function (data) {
                            that.brands = data;
                        });

                itemService.loadItemDepartment()
                        .success(function (data) {
                            that.itemDepartments = data;
                        });
            },
            clear: function () {

            },
            saveItem: function () {
                var defer = $q.defer();
                var that = this;
                itemService.saveItem(JSON.stringify(this.itemData))
                        .success(function (data) {
                            that.itemViewList.unshift(data);
                            that.itemData = {};
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },
            saveItemUnit: function () {
                var defer = $q.defer();
                var that = this;
                itemService.saveItemUnit(JSON.stringify(this.itemUnitData))
                        .success(function (data) {
                            that.itemunitsViewList.unshift(data);
                            that.itemUnitData = {};
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },
            editeItem: function (items, $index) {
                this.itemData = items;
                this.itemViewList.splice($index, 1);
            },
            editeItemUnits: function (itemsUnits, $index) {
                this.itemUnitData = itemsUnits;
                this.itemunitsViewList.splice($index, 1);
            },
            deleteItem: function (items, $index) {
                var defer = $q.defer();
                var that = this;
                itemService.deleteItem(items.indexNo)
                        .success(function (data) {
                            that.itemViewList.splice($index, 1);
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },
            deleteItemUnits: function (itemsUnits, $index) {
                var defer = $q.defer();
                var that = this;
                itemService.deleteItemUnit(itemsUnits.indexNo)
                        .success(function (data) {
                            that.itemunitsViewList.splice($index, 1);
                            defer.resolve();
                        })
                        .error(function (data) {
                            defer.reject();
                        });
                return defer.promise;
            },
            brandLable: function (indexNo) {
                var item;
                angular.forEach(this.brands, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value.indexNo + "-" + value.name;
                        ;
                        return;
                    }
                });
                return item;
            },
            itemLable: function (indexNo) {
                var item;
                angular.forEach(this.items, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value.indexNo + "-" + value.name;
                        ;
                        return;
                    }
                });
                return item;
            },
            categoryLable: function (indexNo) {
                var item;
                angular.forEach(this.categorys, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value.indexNo + "-" + value.name;
                        ;
                        return;
                    }
                });
                return item;
            },
            subCategoryLable: function (indexNo) {
                var item;
                angular.forEach(this.subCategorys, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value.indexNo + "-" + value.name;
                        ;
                        return;
                    }
                });
                return item;
            },
            itemDepartmentLable: function (indexNo) {
                var item;
                angular.forEach(this.itemDepartments, function (value) {
                    if (value.indexNo === parseInt(indexNo)) {
                        item = value.indexNo + "-" + value.name;
                        ;
                        return;
                    }
                });
                return item;
            }
        };
        return itemModel;
    };
    angular.module("appModule")
            .factory("itemModel", factory);
}());

