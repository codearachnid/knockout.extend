/**
 * fade in the text when performing an update
 * @link http://www.knockmeout.net/2011/03/reacting-to-changes-in-knockoutjs.html
 */
ko.bindingHandlers.fadeInText = {
	'update': function(element, valueAccessor) {
		if( $(element).is(":visible") ){
			$(element).fadOut('fast');
		} else {
			$(element).hide();
		}
		ko.bindingHandlers.text.update(element, valueAccessor);
		$(element).fadeIn('slow');
	}
};
