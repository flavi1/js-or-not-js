const noJS = (function() {
    // the private section of the module
    
    const scriptUrlParams = new URL(document.currentScript.src).searchParams,
			opt = {
				stop : (scriptUrlParams.get('stop')) ? scriptUrlParams.get('stop') : null,
				class_js : (scriptUrlParams.get('class_js')) ? scriptUrlParams.get('class_js') : 'js',
				class_nojs : (scriptUrlParams.get('class_nojs')) ? scriptUrlParams.get('class_nojs') : 'nojs',
			};
    
	class AvoidedScript extends HTMLElement {
	  constructor() {
		// Always call super first in constructor
		super();
		this.attachShadow({ mode: "closed" });	// just to hide content without having to use style.
		// write element functionality in here
	  }
	}
	customElements.define("avoided-script", AvoidedScript);
    
    var irreversible = false;
    
	const observer = new MutationObserver((mutationsList, observer) => {
		for(let mutation of mutationsList) {
			const addedNodes = Array.from(mutation.addedNodes);
			if(addedNodes)
			for(n of addedNodes){
				if(n.nodeName == 'SCRIPT') {
					if(irreversible)
						n.parentNode.removeChild(n);
					else
						recreateElement(n, 'avoided-script')
				}
				if(n.nodeName == 'NOSCRIPT') {
					recreateElement(n, 'no-script')
				}
				if(n.attributes)
					for(var i = 0; i < n.attributes.length; i++) {
						var a = n.attributes[i];
						if(a.name.toLowerCase().startsWith('on')) {
							if(!irreversible)
								n.setAttribute('data-avoided-'+a.name.toLowerCase(), a.value)
							n.removeAttribute(a.name)
						}
					}
			}
			
		}
	});
	
	const htmlEl = document.documentElement;
	
    const publicMethods = {
        stop: function(is_irreversible) {
			if(is_irreversible) {
				irreversible = true;
				console.log('DESTROY JS DECLARATIONS')
			}
			else
				console.log('HALT JS DECLARATIONS')
            observer.observe(document, { childList: true, subtree: true});
            htmlEl.classList.remove(opt.class_js)
            htmlEl.classList.add(opt.class_nojs)
        },
        continue: function() {
			if(irreversible)
				return console.error('JS DECLARATIONS ARE LOST BECAUSE OF irreversible STOP PARAMETER')
			console.log('CONTINUE JS DECLARATIONS')
            observer.disconnect();
            htmlEl.classList.remove(opt.class_nojs)
            htmlEl.classList.add(opt.class_js)
        },
        resume: function() {
			if(irreversible)
				return console.error('JS DECLARATIONS ARE LOST BECAUSE OF irreversible STOP PARAMETER')
            publicMethods.continue();
            console.log('AND RESUME JS DECLARATIONS')
            
            var _all = document.getElementsByTagName('*'), all = [];
            for (var i=0; i < _all.length; i++)
				all.push(_all[i]);	// to prevent infinite loop with element recreate.
			 for(n of all) {
				if(n.nodeName == 'AVOIDED-SCRIPT') {
					//n.parentNode.removeChild(n);
					recreateElement(n, 'script');
					continue;
				}
				if(n.nodeName == 'NO-SCRIPT') {
					//n.parentNode.removeChild(n);
					recreateElement(n, 'noscript');
					continue;
				}
				if(n.attributes)
					for(var i = 0; i < n.attributes.length; i++) {
						var a = n.attributes[i];
						if(a.name.startsWith('data-avoided-on')) {
							var tn = a.name.substring(13);
							n.setAttribute(tn, a.value)
							n.removeAttribute(a.name)
							if(tn == 'onload')
								n.onload = function(){return eval(a.value);}
						}
					}
			}
			for(n of all)
				n.dispatchEvent(new Event('load'));
			
			// resume JS event
			var event = new Event('resumeJavascript');
			dispatchEvent(event);
        }
    }
    
	if(opt.stop == 'now')
		publicMethods.stop();
	if(opt.stop == 'irreversible')
		publicMethods.stop(true);
    
	return publicMethods;
    
})();
