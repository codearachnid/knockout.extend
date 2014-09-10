ko.isBindingsApplied = function( elementOrID ){
  element = typeof elementOrID == 'object' ? elementOrID : document.getElementById(elementOrID);
  return !!ko.dataFor( element );
}
