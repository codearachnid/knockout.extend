/**
 * force observable to nullify an empty "" string
 */
ko.bindingHandlers.stringEmptyNull = {
	init: function (element, valueAccessor, allBindingsAccessor) {
		var underlyingObservable = valueAccessor();
		var interceptor = ko.dependentObservable({
			read: underlyingObservable,
			write: function (value) {
				if (value != null && value.trim() == '')
					underlyingObservable(null);
				else
					underlyingObservable(value);
			}
		});
		ko.bindingHandlers.value.init(element, function () { return interceptor }, allBindingsAccessor);
	},
	update: ko.bindingHandlers.value.update
};
