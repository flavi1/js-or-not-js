const customElementDispatcher = (function() {
    // the private section of the module
    
    var elementsToRecreateByNewTN = {}
    
	window.addEventListener("DOMContentLoaded", (event) => {

		const initEv = new Event("DOMContentInitialized", {
			bubbles: false,
			cancelable: true,
		});
		
		const cancelled = !window.dispatchEvent(initEv);
		
		if (cancelled) {
			// A handler called preventDefault.
			console.log("cancelled");
		} else {
			// None of the handlers called preventDefault.
			
			for(let newTN in elementsToRecreateByNewTN)
				for(const selector of elementsToRecreateByNewTN[newTN])
					document.querySelectorAll(selector).forEach((el) => {
						recreateElement(el, newTN);
					})
			
		}
		
	},true);
	
	const publicMethods = {
		register: function(selector, newTN, classDef, opt) {
			if(typeof classDef != 'undefined') {
				if(typeof opt == 'undefined')
					opt = {mode: 'open'}
				customElements.define(classDef, opt);
			}
			if(typeof elementsToRecreateByNewTN[newTN] == 'undefined')
				elementsToRecreateByNewTN[newTN] = [];
			elementsToRecreateByNewTN[newTN].push(selector)
		},
		list: function() {
			return elementsToRecreateByNewTN;
		}
	}
	
	return publicMethods;
    
})();
