
jQuery.prototype.addViewerButtons = function(target)
{
	this.each(function(i,e){
		e=$(e);
		var href = e.attr( 'href' );
		// work out appropriate viewers
		var viewers = Object.keys( DocView.viewers );
		for( var i=0; i<viewers.length; i++ )
		{
			var button = $('<span class="viewer-button" data-url="'+href+'" data-viewer="'+viewers[i]+'">'+viewers[i]+'</span>');
			button.click(function() {
				DocView.callViewer( $(this).attr('data-url'), $(this).attr('data-viewer'), target );
			});
			e.after( button );
		}
	});

};

var DocView = {

	viewers: {},

	callViewer: function(rel_url, viewer, target)
	{
		var viewer = this.viewers[viewer];
		target=$(target);
		var url = ""+document.location;
		// strip filename and fragments
		url = url.replace( /#.*$/,'').replace( /\/[^\/]+$/, '/' );
		// add new filename or relative path to it (won't handle non relative paths, yet)
		url += rel_url;
		// should test that viewer really exists
		target.html( 'Loading <i>'+url+'</i> using <i>'+viewer+'</i>' );
		var jqxhr = $.ajax( { 
			'url': url,
			//'processData': false,
			//'dataType': 'binary' ,
 			beforeSend: function( xhr ) {
				xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
			}
		} )
		.success(function(data) {
			try {
				viewer.display( data, target, rel_url, url );
				if( viewer.hasOwnProperty( 'css' ) )
				{
					$('body').append( $('<style></style>').text( viewer.css.join( "\n" ) ) );
				}
			}
			catch( err )
			{
				target.text( "Render Error: "+err.message );
			}
		})
		.fail(function(e,estr,ethrown) {
			target.html( 'Load Error: '+estr+' :: '+ethrown );
		})
		.always(function() {
		});
		jqxhr.always(function() {
		});
	}
};
