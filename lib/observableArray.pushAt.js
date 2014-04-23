/**
 * set an item to a specific index on an observable array
 * appropriate use in place of .splice
 */
ko.observableArray.fn.pushAt = function(index, value) {
    this.valueWillMutate();
    this()[index] = value;
    this.valueHasMutated();
}
