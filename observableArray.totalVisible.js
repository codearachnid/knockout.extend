ko.observableArray.fn.totalVisible = function() {
    var items = this(), count = 0;

    if (typeof items === "undefined" || items === null || typeof items.length === "undefined") return 0;

    for (var i = 0, len = items.length; i < len; i++) {
        if (items[i]._destroy !== true) count++;
    }

    return count;
};
