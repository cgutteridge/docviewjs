
// buggy -- gets muddled by <?xml header!
DocView.viewers.xml = {
	likesExtension: function( ext )
	{
		if( ext == null ) { return false; }
		if( ext == "xml" ) { return true; }
		return false;
	},
	display: function( data, target, url, ref )
	{
		$.ajax( { 'url': 'lib/jquery.snippet.min.js', 'async': false } );
		target.html('');
		target.append( '<link rel="stylesheet" href="lib/jquery.snippet.min.css" />' );
		var h2 = $('<h2>XML content of <a href="'+url+'">'+ref+'</a></h2>');
		var pre = $('<pre></pre>');
		pre.text( data );
		target.append( h2 );
		target.append( pre );
		pre.snippet( 'xml',{style:"random", startCollapsed:true});
	}
};

