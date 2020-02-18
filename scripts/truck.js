(function(window) {
    'use strict';
    var App = window.App || {};
    function Truck(truckID, db) {
        this.truckID = truckID;
        this.db = db;
    }

    Truck.prototype.createOrder = function(order) {
        console.log('creating order for', order.emailAddress);
        return this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function(customerId) {
        console.log('Delivering order for', customerId);
        return this.db.remove(customerId);
    };

    Truck.prototype.printOrders = function(printFn) {
        this.db.getAll()
        .then(function (orders) {
            var customerIdArray = Object.keys(orders);
            console.log('Truck No.', this.truckID, 'has the pending orders:');
            customerIdArray.forEach(function(id) {
                console.log(orders[id]);
                if (printFn) {
                    printFn(orders[id]);
                }
            }.bind(this));
        }.bind(this)); 
    };

    App.Truck = Truck;
    window.App = App;

})(window)