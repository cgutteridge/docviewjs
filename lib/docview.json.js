
DocView.viewers.json = {
	display: function( data, target, url, ref )
	{
		json = $.parseJSON(data); // could go wrong here but will be caught.
		$.ajax( { 'url': 'lib/jquery.jsonview.js', 'async': false } );
		target.html('');
		target.append( '<link rel="stylesheet" href="lib/jquery.jsonview.css" />' );
		var h2 = $('<h2>JSON content of <a href="'+url+'">'+ref+'</a></h2>');
		var div = $('<div>\
<button id="collapse-btn">Collapse</button>\
<button id="expand-btn">Expand</button>\
<button id="toggle-btn">Toggle</button>\
<button id="toggle-level1-btn">Toggle level1</button>\
<button id="toggle-level2-btn">Toggle level2</button>\
<div id="json"></div>\
');

		target.append( h2 );
		target.append( div );
		$("#json").JSONView(json, { collapsed: true, nl2br: true, recursive_collapser: true });
		$('#collapse-btn').on('click', function() { $('#json').JSONView('collapse'); });
		$('#expand-btn').on('click', function() { $('#json').JSONView('expand'); });
		$('#toggle-btn').on('click', function() { $('#json').JSONView('toggle'); });
		$('#toggle-level1-btn').on('click', function() { $('#json').JSONView('toggle', 1); });
		$('#toggle-level2-btn').on('click', function() { $('#json').JSONView('toggle', 2); });
	}
};

