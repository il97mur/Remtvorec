document.addEventListener("DOMContentLoaded", function() {

	// Custom JS

	$( function() {
	  var handle = $( "#custom-handle" );
	  $( "#slider" ).slider({
		create: function() {
		  handle.text( $( this ).slider( "value" ) );
		},
		range: 'min',
		min: 20,
		max: 200,
		value: 154,
		slide: function( event, ui ) {
		  handle.text( ui.value );
		}
	  });
	} );
});
