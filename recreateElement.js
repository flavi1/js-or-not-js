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

	if(attach)
		el.parentNode.insertBefore(newEl, el)
	
	newEl.innerHTML = el.innerHTML;
	
	if(remove)
		el.remove();
	return newEl;
}
