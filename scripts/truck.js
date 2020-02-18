(function(window) {
    'use strict';
    var App = window.App || {};
    function Truck(truckID, db) {
        this.truckID = truckID;
        this.db = db;
    }

    Truck.prototype.createOrder = function(order) {
        console.log('creating order for', order.emailAddress);
        this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function(customerId) {
        console.log('Delivering order for', customerId);
        this.db.remove(customerId);
    };

    Truck.prototype.printOrders = function() {
        var customerIdArray = Object.keys(this.db.getAll());

        console.log('Truck No.', this.truckID, 'has the pending orders:');
        customerIdArray.forEach(function(customerId) {
            console.log(this.db.get(customerId));
        }.bind(this)); // .bind(owner) where `owner` is `this`
    };

    App.Truck = Truck;
    window.App = App;

})(window)