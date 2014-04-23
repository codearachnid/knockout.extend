/*!
 * knockout.extend.js v0.0.1
 * http://codearachnid.github.com/knockout.extend/
 *
 * Copyright 2014, Timothy Wood @codearachnid
 * Released under the GPLv3 License.
 */

/**
 * check the value of a specific observable boolean before add or not the attributes
 *
 */
ko.bindingHandlers.attrIf = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        var h = ko.utils.unwrapObservable(valueAccessor());
        var ifShow = ko.utils.unwrapObservable(h._if);
        if (ifShow) {
            ko.bindingHandlers.attr.update(element, valueAccessor, allBindingsAccessor);
        } else {
            for (var k in h) {
                if (h.hasOwnProperty(k) && k.indexOf("_") !== 0) {
                    $(element).removeAttr(k);
                }
            }
        }
    }
};

/**
 * Check for distinct value (object) in observable arrays
 *
 * @author RP Niemeyer <http://stackoverflow.com/users/594420/rp-niemeyer>
 * @link http://stackoverflow.com/a/9877882/1542064
 */
ko.observableArray.fn.distinct = function(prop) {
    var target = this;
    target.index = {};
    target.index[prop] = ko.observable({});    

    ko.computed(function() {
        //rebuild index
        var propIndex = {};

        ko.utils.arrayForEach(target(), function(item) {
            var key = ko.utils.unwrapObservable(item[prop]);
            if (key) {
                propIndex[key] = propIndex[key] || [];
                propIndex[key].push(item);            
            }
        });   

        target.index[prop](propIndex);
    });

    return target;
}; 

/**
 * bulk shove items into an observableArray
 */
ko.observableArray.fn.pushAll = function (valuesToPush) {
    var underlyingArray = this();
    this.valueWillMutate();
    ko.utils.arrayPushAll(underlyingArray, valuesToPush);
    this.valueHasMutated();
    return this;
};

/**
 * set an item to a specific index on an observable array
 * appropriate use in place of .splice
 */
ko.observableArray.fn.pushAt = function(index, value) {
    this.valueWillMutate();
    this()[index] = value;
    this.valueHasMutated();
}

/**
 * Get the length of an observableArray without the _destroyed items
 * 
 * @link http://stackoverflow.com/a/18743827/1542064
 */
ko.observableArray.fn.totalVisible = function() {
    var items = this(), count = 0;

    if (typeof items === "undefined" || items === null || typeof items.length === "undefined") return 0;

    for (var i = 0, len = items.length; i < len; i++) {
        if (items[i]._destroy !== true) count++;
    }

    return count;
};

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
