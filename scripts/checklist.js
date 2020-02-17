(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    
    function Checklist(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('No match for selector: ' + selector);
        }
    };

    function Row(coffeeOrder) {
        var $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        });
        var $label = $('<label></label>');
        var $checkbox = $('<input></input>', {
            'type': 'checkbox',
            'value': coffeeOrder.emailAddress
        });
        var $description = coffeeOrder.size + ', ';
        if (coffeeOrder.flavor) {
            $description += coffeeOrder.flavor + ', ';
        }
        $description += coffeeOrder.coffee + ', ';
        $description += ' (' + coffeeOrder.emailAddress + ')';
        $description += ' [' + coffeeOrder.strength + 'x]';

        $label.append($checkbox);
        $label.append($description);
        $div.append($label);

        this.$element = $div;
    }

    Checklist.prototype.addRow = function(coffeeOrder) {
        this.removeRow(coffeeOrder.emailAddress);
        var rowElement = new Row(coffeeOrder);
        this.$element.append(rowElement.$element);
    };

    Checklist.prototype.removeRow = function(email) {
        this.$element
            .find('[value="' + email + '"]')
            .closest('[data-coffee-order="checkbox"]')
            .remove();
    };

    Checklist.prototype.addClickListener = function(fn) {
        // event delegation: only triggers if `click` on `<input>` element
        this.$element.on('click', 'input', function(event) {  
            var email = event.target.value;
            this.removeRow(email);
            fn(email);
        }.bind(this));
    };

    App.Checklist = Checklist;
    window.App = App;
})(window)