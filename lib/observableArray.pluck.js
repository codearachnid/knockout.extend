/**
 * gingerly pick a property out of your observableArray of all items
 * liberally based off wp_list_pluck
 * @link http://codex.wordpress.org/Function_Reference/wp_list_pluck
 */
ko.observableArray.fn.pluck = function(prop) {
    var target = this;
    var plucked = ko.observableArray();
    ko.utils.arrayForEach(target(), function(item) {
        var pluck = ko.utils.unwrapObservable(item[prop]);
        if (pluck)
            plucked.push( pluck );
    });  
    return plucked;
}
