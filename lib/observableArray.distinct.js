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
