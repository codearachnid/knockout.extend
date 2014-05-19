/**
 * add items to a select2 enabled dropdown
 *
 * @link https://github.com/ivaynberg/select2/wiki/Knockout.js-Integration
 */
ko.bindingHandlers.select2 = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var obj = valueAccessor();

        $(element).select2(obj);
        $(element).change(function () {
            var select2Data = $(element).select2('data');
            if (select2Data != null) {
                var v = allBindingsAccessor.get("value");
                v(select2Data.id);
            }
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).select2('destroy');
        });
    },
    update: function (element) {
        $(element).trigger('change');
    }
};

var update = function (element) {
    var el = $(element);
    if (el.data('select2')) {
        el.trigger('change');
    }
};

var updateOptions = ko.bindingHandlers['options']['update'];
ko.bindingHandlers['options']['update'] = function (element) {
    var r = updateOptions.apply(null, arguments);
    update(element);
    return r;
};

var updateSelectedOptions = ko.bindingHandlers['selectedOptions']['update'];
ko.bindingHandlers['selectedOptions']['update'] = function (element) {
    var r = updateSelectedOptions.apply(null, arguments);
    update(element);
    return r;
};

var updateValue = ko.bindingHandlers['value']['update'];
ko.bindingHandlers['value']['update'] = function (element) {
    var r = updateValue.apply(null, arguments);
    update(element);
    return r;
};
