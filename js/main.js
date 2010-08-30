$( document ).ready( function() {

  $.each( [ "private", "protected", "deprecated" ], function( i, kind ) {
    var key = "show_" + kind;

    if ( $.jStorage.get( key, false ) ) {
      $( "#show-toggles :checkbox#" + key ).attr( "checked", true );
      $( "." + kind ).show();
    }
    else {
      $( "." + kind ).hide();
    }
  });
  
  $( "#show-toggles :checkbox" ).click( function( evt ) {
    var elem = $( this ),
      name = elem.attr( "name" ),
      what = name.replace( /^show_/, "" ),
      checked = ( elem.filter( ":checked" ).length !== 0 );

    $.jStorage.set( name, checked );
    
    if ( checked ) {
      $( "." + what ).show();
    }
    else {
      $( "." + what ).hide();
    }
  });
  
});
