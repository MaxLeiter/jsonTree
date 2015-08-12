function jsonTree() {
	console.log('heyy');
}

function jsonTree(jsonURL, selector) {

	var element = document.querySelector(selector);
	if(element.className.indexOf('listContainer') == -1) {
		console.log('listContainer not found!');
	}

	var request = new XMLHttpRequest();
	request.open("GET", jsonURL, true);
	request.send();
	console.log('request sent');
	request.addEventListener('load', function() {
		var parsed = JSON.parse(request.responseText);
		element.innerHTML = json2html(parsed);
		var parent = element.getElementsByTagName('ul');
		if(parent)
			parent[0].className = 'expList';

		var children = [].slice.call(document.querySelectorAll('ul')).filter(function (el) { return el.querySelector('li'); });
		console.log(children);
		//var children = parent.getElementsByTagName('li:has(ul)');
		for(var i = 0; i < children.length; i++) {
			children[i].addEventListener('click', function(e) {
					console.log('yeah it is');
					toggleClass(children[i], 'expanded');
			});
			if (children[i].classList)
				children[i].classList.add('collapsed');
			else
				children[i].className += ' ' + 'collapsed';
			var tempChildren = children[i].getElementsByTagName('ul');
			for(var i = 0; i < tempChildren.length; i++) {
				tempChildren[i].style.display = 'none';
			}
		};
	});


}

function json2html(json) {
    var i, html = "";
    html += "<ul>";
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
		if(el.className.indexOf(className)) {
			el.className = el.className.replace(className, '');
		}
		else {
			el.className += ' ' + className;
		}
	}
};
