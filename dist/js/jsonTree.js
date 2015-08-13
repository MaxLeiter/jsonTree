function jsonTree(jsonURL, selector) {

	var element = document.querySelector(selector);
	if(!element)
		console.log('jsonTree element not found!');

	element.classList.add('jsonTree');
	var request = new XMLHttpRequest();
	request.open("GET", jsonURL, true);
	request.send();
	request.addEventListener('load', function() {
		var parsed = JSON.parse(request.responseText);
		element.innerHTML = json2html(parsed);

		top = document.getElementById('top');
		top.addEventListener('click', function(e) {
			e.preventDefault();
			if(e.target && e.target.nodeName == "LI") {
				toggleClass(e.target, 'selected');
			}

		});
		var parents = toArray(document.querySelectorAll(selector + ' li'));
		parents.forEach(function(ele, i, a){
			    var filter = toArray(ele.children).filter(function(el) { return el.tagName.toLowerCase() == 'ul'; });
				if(filter.length > 0) {
					if (ele.classList)
						ele.classList.add('parent');
					else
						ele.className += ' ' + 'parent';
				}
		});

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
        if(typeof json[i] === "object") html += json2html(json[i]);
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

function toArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
}