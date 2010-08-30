/*jslint adsafe: false, bitwise: true, browser: true, cap: false, css: false,
  debug: false, devel: true, eqeqeq: true, es5: false, evil: false,
  forin: false, fragment: false, immed: true, laxbreak: false, newcap: true,
  nomen: false, on: false, onevar: true, passfail: false, plusplus: true,
  regexp: false, rhino: true, safe: false, strict: false, sub: false,
  undef: true, white: false, widget: false, windows: false */
/*global jQuery: false, $: false, window: false */
"use strict";


$( document ).ready( function() {

  function initAC() {
    $( "#search" ).autocomplete( "destroy" );

    $.ajax({
      url: "index.json",
      type: "json",
      complete: function( data ) {
        var acdata = $.parseJSON( data.responseText ),
          supply = [];

        $.each( acdata, function( i, dataset ) {
          var key = "show_" + dataset.access,
            label = [ dataset.host, " → ",
              dataset.name,
              " (", dataset.type, ")"
            ].join( "" );
        
          if ( $.jStorage.get( key, false ) || dataset.access === "" ) {
            supply.push({
              label: label,
              url: dataset.url
            });
          }
        });

        $( "#search" ).autocomplete({
          source: supply,
          focus: function( event, ui ) {
            $('#search').val( ui.item.label );
            return false;
          },
          select: function( event, ui ) {
            document.location.href = ui.item.url;
            return false;
          }
        });
      }
    });
  }


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
    
    initAC();
  });

    
  initAC();

});
