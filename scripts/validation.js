(function(window) {
    var App = window.App || {};

    var Validation = {
        isCompanyEmail: function(email) {
            return /.+@shuheng\.com$/.test(email);  // forward slashes denote regex literal
        }
    };
    App.Validation = Validation;
    window.App = App;
})(window);