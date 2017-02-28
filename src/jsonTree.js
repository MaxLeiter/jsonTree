/**
* By Max Leiter
* jsonTree: A dependency-free lightweight vanilla Javascript library to display JSON in an HTML unordered list.
**/

var jsonTree = (function() {
	/**
	* json: URL for json file or a JSON object
	* selector: the elements selector to apply the tree to
	* depth: bool to add a 'depth-#' class, can increase loading times
	**/
	return { 
			init: function(json, selector, depth) {
			//It's not a URL, so let's skip the XMLHttpRequest
			if(typeof json === "object") {
				generateTree(selector, json);
			} else {
				var request = new XMLHttpRequest();
				request.open("GET", json, true);
				request.send();
				request.addEventListener('load', function() {
					generateTree(selector, JSON.parse(request.responseText));
				});
			}
			applyClasses(selector, 'li', 'ul', depth);
			applyClasses(selector, 'ul', 'li', depth);
		}
	}

	/** Generate the DOM elements for the tree**/
	function generateTree(selector, json) {
		var element = document.querySelector(selector);
		element.classList.add('jsonTree');
		element.innerHTML = json2html(json);
		top = document.querySelectorAll('#top');
		top.addEventListener('click', function(e) {
			e.preventDefault();
			if(e.target && e.target.nodeName.toUpperCase() === "LI") {
				if(toArray(e.target.childNodes).length > 1) {
					toggleClass(e.target, 'selected');
				}
			}
		});
	} 

	/** Applies classes to the element, including 'parent' and 'depth-#' **/
	function applyClasses(selector, parent, child, depth) {
		//Parent class
		var parents = toArray(document.querySelectorAll(selector + ' ' + parent));
		parents.forEach(function(ele, i, a){
			var filter = toArray(ele.children).filter(function(el) { return el.tagName.toLowerCase() === child.toLowerCase().toString(); });
				if(filter.length > 0) { // its a parent!
					ele.classList.add('parent');
					ele.style.cursor = 'pointer';
				} else {
					ele.style.cursor = 'auto';
				}
			//The amount of parents, '#top' is assigned by json2html 
			if(depth) {
				var count = depth(ele);
				ele.classList.add('depth-' + count);
			}
		});
	}

	/** Returns the amount of parents of an element **/
	function depth(ele) {
		if(ele.parentNode && ele.parentNode.getAttribute("data-id") === "top") {
			return ele == null ? 0 : 1 + depth(ele.parentNode);
		} else {
			return 0;
		}
	}

	/** Converts HTMLCollection to array (for ease of use with functions like forEach) **/
	function toArray(o) {
		return Array.prototype.slice.call(o);
	}

	/** Returns a JSON file in HTML 'syntax' **/
	function json2html(json) {
		var i, html = "";
		json = htmlEscape(JSON.stringify(json));
		json = JSON.parse(json);
		html += "<ul data-id='top'>";
		for (i in json) {
			html += "<li>"+i+": ";
			if(typeof json[i] === "object") {
				html += json2html(json[i]);
			}
			else html += json[i];
			html += "</li>";
		}
		html += "</ul>";
		return html;
	}

	/** To stop XSS attacks by using JSON with HTML nodes **/
	function htmlEscape(str) {
		var tagsToReplace = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;'
		};
		return str.replace(/[&<>]/g, function(tag) {
			return tagsToReplace[tag] || tag;
		});
	}

	/** Toggles an elements class **/
	function toggleClass(el, className) {
		if(el) {
			el.classList.toggle(className);
		}
	}
	/* classList.js for old browsers */
	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
	if("document" in self){if(!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false,q;do{r=t[s]+"";q=g(this,r);while(q!==-1){this.splice(q,1);o=true;q=g(this,r)}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}if(q===true||q===false){return q}else{return !o}};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))}else{(function(){var b=document.createElement("_");b.classList.add("c1","c2");if(!b.classList.contains("c2")){var c=function(e){var d=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(h){var g,f=arguments.length;for(g=0;g<f;g++){h=arguments[g];d.call(this,h)}}};c("add");c("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var a=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(d,e){if(1 in arguments&&!this.contains(d)===!e){return e}else{return a.call(this,d)}}}b=null}())}};
})();