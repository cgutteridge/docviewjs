
DocView.viewers['datatable-xlsx'] = {
	display: function( data, target, url, ref )
	{
		$.ajax( { 'url': 'lib/jszip.js', 'async': false } );
		$.ajax( { 'url': 'lib/xlsx.js', 'async': false } );
		$.ajax( { 'url': 'lib/jquery.dataTables.min.js', 'async': false } );
		target.html('');
		target.append( '<link rel="stylesheet" href="lib/jquery.dataTables.min.css" />' );
		var h2 = $('<h2>Tabular content of <a href="'+url+'">'+ref+'</a></h2>');
		target.append( h2 );
		target.append( $('<div id="tablespot"></div>' ) );

		wb = XLSX.read(data, {type: 'binary'});
		this.showSheet( wb.Sheets[ wb.SheetNames[0] ], 0 );
		// sheet picker and header row changer would go here
	},
	showSheet: function( sheet, row_offset )
	{
		var table = $('<table></table>' );
		$('#tablespot').html();
		$('#tablespot').append( table );
		var thead = $('<thead></thead>' );
		table.append(thead);
		var theadtr = $('<tr></tr>' );
		thead.append(theadtr);

		range = XLSX.utils.decode_range(sheet["!ref"]);
		for(R=range.s.r + row_offset, C = range.s.c; C <= range.e.c; ++C) {
			val = sheet[XLSX.utils.encode_cell({c:C,r:R})];
			th = $('<th></th>');
			theadtr.append(th);
			if(!val) continue;
			th.text(XLSX.utils.format_cell(val));
		}

		for (R = range.s.r + 1 + row_offset; R <= range.e.r; ++R) {
			var tr = $('<tr></tr>' );
			table.append(tr);
			/* row index available as __rowNum__ */
			for (C = range.s.c; C <= range.e.c; ++C) {
				val = sheet[XLSX.utils.encode_cell({c: C,r: R})];
				td = $('<td></td>');
				tr.append(td);
				if(!val) continue;
				td.text(XLSX.utils.format_cell(val));
  			}
		}

		table.DataTable();
	},
	css: [
		'#tablespot td { vertical-align:top; background-color: #f8f8f8; border: solid 1px #fff}'
	]

};
