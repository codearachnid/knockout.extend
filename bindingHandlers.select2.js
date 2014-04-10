/**
 * add items to a select2 enabled dropdown
 *
 * @link https://github.com/ivaynberg/select2/wiki/Knockout.js-Integration
 */

ko.bindingHandlers.select2 = {
    init: function(element, valueAccessor) {
        $(element).select2(valueAccessor());

        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $(element).select2('destroy');
        });
    },
    update: function(element) {
        $(element).trigger('change');
    }
};
