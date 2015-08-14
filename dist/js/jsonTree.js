function jsonTree(jsonURL, selector) {

	var element = document.querySelector(selector);
	if(!element) {
		console.log('jsonTree element not found!');
	}

	element.classList.add('jsonTree');
	var request = new XMLHttpRequest();
	request.open("GET", jsonURL, true);
	request.send();
	request.addEventListener('load', function() {
		var parsed = JSON.parse(request.responseText);
		element.innerHTML = json2html(parsed);
		top = document.querySelectorAll('#top');
		top.addEventListener('click', function(e) {
			e.preventDefault();
			if(e.target && e.target.nodeName == "LI") {
				if(toArray(e.target.childNodes).length > 1) {
					toggleClass(e.target, 'selected');
				}
			}
		});
		applyParent(selector, 'li', 'ul');
		applyParent(selector, 'ul', 'li');
	});
}

function applyParent(selector, parent, child) {
	var parents = toArray(document.querySelectorAll(selector + ' ' + parent));
	parents.forEach(function(ele, i, a){
		var filter = toArray(ele.children).filter(function(el) { return el.tagName.toLowerCase() == child; });
			if(filter.length > 0) { //its a parent!
				if (ele.classList) {
					ele.classList.add('parent');
				}
				else {
					ele.className += ' ' + 'parent';
				}
				if(ele.classList.contains('parent')) {
					ele.style.cursor = 'pointer';
				}
			} else {
				ele.style.cursor = 'auto';
			}
		});
}

function toArray(o) {
	return Array.prototype.slice.call(o);
}

function json2html(json) {
	var i, html = "";
	html += "<ul id='top'>";
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

function toggleClass(el, className) {
	if(el) {
		el.classList.toggle(className);
	}
};