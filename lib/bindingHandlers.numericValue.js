/**
 * create a binding handler to properly handle numeric values in observables
 * @link http://stackoverflow.com/a/7396039/1542064
 */
ko.bindingHandlers.numericValue = {
    init : function(element, valueAccessor, allBindingsAccessor) {
        var underlyingObservable = valueAccessor();
        var interceptor = ko.dependentObservable({
            read: underlyingObservable,
            write: function(value) {
                if (!isNaN(value)) {
                    underlyingObservable(parseFloat(value));
                }                
            } 
        });
        ko.bindingHandlers.value.init(element, function() { return interceptor }, allBindingsAccessor);
    },  
    update : ko.bindingHandlers.value.update
};
