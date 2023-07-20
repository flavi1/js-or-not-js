function recreateElement(el, as, attach, remove) {
	if(typeof attach == 'undefined')
		attach = true;
	if(typeof remove == 'undefined')
		remove = true;
	const newEl = document.createElement(as);
	for (var i = 0; i < el.attributes.length; i++) {
		var attr = el.attributes[i];
		newEl.setAttribute(attr.name, attr.value)
	}

	newEl.innerHTML = el.innerHTML;
	
	if(typeof el.value != 'undefined')
		newEl.value = el.value;
	
	const event = new CustomEvent('ElementRecreated', {detail: {newElement: newEl}});
	
	el.dispatchEvent(event);
	
	if(attach)
		el.parentNode.insertBefore(newEl, el)
	
	if(remove)
		el.remove();
	return newEl;
}
