# js-or-not-js
A micro framework to make JS realy non obstrusive

# I - recreateElement.js

This is the core of this micro framework. This provide a simple method to reproduce an HTML Element with another tag name.

    <script src="recreateElement.js"></script>

**recreateElement( *HTMLElement* Element, *string* AsTagName, *boolean* attach, *boolean* remove )**

 - Element : The element to be reproduced. (ex : *document.getElementById('myElement')*)
 - AsTagName : The tag name of the new element. (ex : 'span')
 - attach : If true, the new element will be inserted before the targeted element
 - remove : The targeted element will be removed after new element is created.
 
 Return : the newly created element.

# II - nojs.js

This tool is made to neutralize all future Javascript declarations.
There are 2 ways to use it.

## 1 - The irreversible mode.

    <script src="recreateElement.js"></script>
    <script src="nojs.js"></script>

Then, later in your code :

    noJS.stop(true); 

Or immediately :

    <script src="recreateElement.js"></script>
    <script src="nojs.js?stop=irreversible"></script>

  
## 2 - The reversible mode.

    <script src="recreateElement.js"></script>
    <script src="nojs.js"></script>

Then, later in your code :

    noJS.stop(); 

Or immediately :

    <script src="recreateElement.js"></script>
    <script src="nojs.js?stop=now"></script>

If you want to allow Javascript declarations again :

    noJS.continue();
   
 If you want to allow Javascript declarations again, and resume all previously avoided declarations :

    noJS.resume();

To make the reversibility possible, `<script>` elements are tranformed to `<avoided-script>` elements, and `onevent` attributes to `data-avoided-onevent` attributes.

## Some conventions

By default :
When Javascript declarations are neutralized, the "nojs" class will be added to the HTML root element.
When Javascript declarations are allowed, the "js" class will be added to the HTML root element.

You can modify default class names :

    <script src="nojs.js?class_js=my_class_for_js&class_nojs=my_class_for_nojs"></script>

When Javascript declarations are neutralized the `<noscript>` elements are transformed to visibles `<no-script>` elements. You can use it on the head document part to perform some CSS or meta conditionnal declarations.

## Possible use cases

 1. You can use it in a trusted browser Web Extension to perform some
    javascript page preparation, then prevent the page to declare
    Javascript. (for example : a noscript switcher)
 2. You can use it to debug your Javascript code by isolating some
    Javascript declarations.
 3. You can use it to simulate disabling Javascript.

Example :

    <html class="nojs">
    <head>
    	<script src="recreateElement.js"></script>
    	<script src="nojs.js"></script>
    	<script>
    		urlParams = new URL(window.location.toLocaleString()).searchParams;
    		if(urlParams.get('nojs'))
    			noJS.stop(true);
    	</script>
    </head>
    <body>
    	<script>alert('you will not see me if you type "?nojs=1" at the end of the page URL');</script>
    </body>
    </html>

# III - customElementsDispatcher.js

todo

# IV - reDesigner.js

todo

# Explainations

todo
