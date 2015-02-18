
DocView.viewers.raw = {
	// TODO better css class name scheme
	display: function( data, target, url, ref )
	{
		var h2 = $('<h2>Raw content of <a href="'+url+'">'+ref+'</a></h2>');
		var div = $('<div class="block"></div>');
		div.text( data );
		target.html( '' );
		target.append( h2 );
		target.append( div );
	},
	css: [
		'.block { overflow-x: auto; font-family: monospace; background-color: #f0f0f0; padding: 1em; white-space: pre }'
	]
};

