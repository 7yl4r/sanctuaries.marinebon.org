/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.

jQuery('.captchaContainer .wpcf7-not-valid-tip').html('The capcha is incorrect.');
jQuery(document).ready(function($) {
  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////     Carousels     /////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  $("#home-carousel").owlCarousel({
      navigation : true, // Show next and prev buttons
      slideSpeed : 800,
      paginationSpeed : 800,
      singleItem:true,
      touchDrag  : true,
      mouseDrag  : true,
      navigationText: [
      "<span class='icon-prev'></span>",
      "<span class='icon-next'></span>"
      ]
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false
  });
  $("#project-carousel").owlCarousel({
      navigation : true, // Show next and prev buttons
      slideSpeed : 800,
      paginationSpeed : 800,
      singleItem:true,
      touchDrag  : true,
      mouseDrag  : true,
      navigationText: [
      "<span class='icon-prev'></span>",
      "<span class='icon-next'></span>"
      ]
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false
  });
  


  ///////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////     Functions     /////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  function higherSubElement(selector, target){
    var max = -1;
    $(selector).each(function( index) {
      //console.log("Row " + index + ": " + $( this ).height() );
      if ( $( this ).find(target).height() >= max ) max = $( this ).find(target).height();  
    });
    return max;
  }

  $( ".videoMontereyContainer" ).on('click', function() {
    $('.embedVideo').trigger('play');
    $('.playAndDisplay').hide();

  });

  function ResearchFilters(){
    var containerHeight = $('.news__container').height();
    //$('.news__container_mask').height(containerHeight);
  }

  function setSubElementsHeights(max, selector, target){
    $(selector).each(function( index) {
      $( this ).find(target).height(max + 20);      
    });
  }

  function resetSubElementsHeights(selector, target){
    $(selector).each(function( index) {
      $( this ).find(target).css('height','auto');
    });
  }

  function higherSponsor(target){
    var max = -1;
    $(".sponsors-partners .sponsors .sponsors-row").each(function( index) {
      //console.log("Row " + index + ": " + $( this ).height() );
      $(this).find(".sponsor").each(function( index) {
        if ( $( this ).find(target).height() >= max ) max = $( this ).find(target).outerHeight();
        //console.log("P " +  index + ": " + $( this ).find(target).outerHeight() );
      });
    });

    return max;
  }

  function higherPartner(target){
    //console.log("HIGHER PARTNER "+ target);
    var max = -1;
    $(".sponsors-partners .partners .partners-row").each(function( index) {
      console.log("Higher Partner Row " + index + ": " + $( this ).height() );
      $(this).find(".partner").each(function( index) {
        if ( $( this ).find(target).height() >= max ) max = $( this ).find(target).outerHeight();
        //console.log("Higher Partner " + target + " " +  index + ": " + $( this ).find(target).outerHeight() );
      });

      //console.log("Max: "+max);
    });
    return max;
  }

  /*function setSponsorsHeights(max, target){
    $(".sponsors-partners .sponsors .sponsors-row").each(function( index) {
      $(this).find(".sponsor").each(function( index) {
      	console.log("Altura" + max);
         $( this ).find(target).height(max);   
      });
    });
  }*/

  function setPartnersHeights(max, target){
    $(".sponsors-partners .partners .partners-row").each(function( index) {
      $(this).find(".partner").each(function( index) {
         $( this ).find(target).height(max);
      });
    });
  }

  function resetSponsorsHeights(target){
    $(".sponsors-partners .sponsors .sponsors-row").each(function( index) {
      $(this).find(".sponsor").each(function( index) {
         $( this ).find(target).css('height','auto');
      });
    });
  }

  function resetPartnersHeights(target){
    $(".sponsors-partners .partners .partners-row").each(function( index) {
      $(this).find(".partner").each(function( index) {
         $( this ).find(target).css('height','auto');
      });
    });
  }

  function setPartnersPadding(target){
    $(".sponsors-partners .partners .partners-row").each(function( index) {
      $(this).find(".partner").each(function( index) {
        var img = $( this ).find(".header img").width();
        var h3 = parseFloat($( this ).find(".header h3").css('padding-left').replace(/[^-\d\.]/g, ''));
        $( this ).find(".content").css('padding-left', img + h3);
      });
    });
  }


  function higherSponsor(target){
    var max = -1;
    $(".sponsors-partners .sponsors .sponsors-row").each(function( index) {
      //console.log("Row " + index + ": " + $( this ).height() );
      $(this).find(".sponsor").each(function( index) {
        if ( $( this ).find(target).height() >= max ) max = $( this ).find(target).outerHeight();
        //console.log("P " +  index + ": " + $( this ).find(target).outerHeight() );
      });
    });

    return max;
  }


  function hasAttribute(obj, att){
      var attr = obj.attr(att);
      if (typeof attr !== typeof undefined && attr !== false) return true;
      return false;
  }

  function updateImageSizes(obj){

    obj.each(function( index ) {

      var wSize = index.innerWidth;
//console.log(wSize + ' ' + index + ' ' + $(this).width() + ' ' + $(this).height());
//$(this).css('border', '1px solid red');
      if($(this).width() < $(this).height()){
        if( $(this).width() > 767 && hasAttribute($(this), "portrait-medium")){

          $(this).css('background-image', 'url(' + $(this).attr("portrait-medium") + ')');
        
        }else if( $(this).width() <= 767 && hasAttribute($(this), "portrait-small")){ 
          
          $(this).css('background-image', 'url(' + $(this).attr("portrait-small") + ')');
        
        } else{
          $(this).css('background-image', 'url(' + $(this).attr("default") + ')');
        }
//console.log('hola if');
      }else{

        if( $(this).width() > 1200 && hasAttribute($(this), "landscape-xlarge")){

          $(this).css('background-image', 'url(' + $(this).attr("landscape-xlarge") + ')');

        } else if( $(this).width() > 991 && $(this).width() <= 1200 && hasAttribute($(this), "landscape-large")){

          $(this).css('background-image', 'url(' + $(this).attr("landscape-large") + ')');

        } else if( $(this).width() > 767 && $(this).width() <= 991 && hasAttribute($(this), "landscape-medium")){

          $(this).css('background-image', 'url(' + $(this).attr("landscape-medium") + ')');

        } else if( $(this).width() > 480 && $(this).width() <= 767 && hasAttribute($(this), "landscape-small")){

          $(this).css('background-image', 'url(' + $(this).attr("landscape-small") + ')');

        } else if( $(this).width() <= 480 && hasAttribute($(this), "landscape-xsmall")){

          $(this).css('background-image', 'url(' + $(this).attr("landscape-xsmall") + ')');

        } else{
          $(this).css('background-image', 'url(' + $(this).attr("default") + ')');
        }
//console.log('hola else');
      }

    });

    $("img[custom-size]").each(function( index ) {

      var wSize = index.innerWidth;
//console.log('hay una imagen por aqui' + $(this).width() + '..' + $(this).height());
      if($(this).width() < $(this).height()){
        if( $(this).width() > 767 && hasAttribute($(this), "portrait-medium") ){

          $(this).attr('src', $(this).attr("portrait-medium") );
        
        }else if($(this).width() <= 767 && hasAttribute($(this), "portrait-small") ){
          
          $(this).attr('src', $(this).attr("portrait-small") );
        
        }else{
          $(this).attr('src', $(this).attr("default") );
        }

      }else{

        if( $(this).width() > 1200 && hasAttribute($(this), "landscape-xlarge")){

          $(this).attr('src', $(this).attr("landscape-xlarge") );

        } else if( $(this).width() > 991 && $(this).width() <= 1200 && hasAttribute($(this), "landscape-large")){

          $(this).attr('src', $(this).attr("landscape-large") );

        } else if( $(this).width() > 767 && $(this).width() <= 991 && hasAttribute($(this), "landscape-medium")){

          $(this).attr('src', $(this).attr("landscape-medium") );

        } else if( $(this).width() > 480 && $(this).width() <= 767 && hasAttribute($(this), "landscape-small")){

          $(this).attr('src', $(this).attr("landscape-small") );

        } else if( $(this).width() <= 480 && hasAttribute($(this), "landscape-xsmall")){

          $(this).attr('src', $(this).attr("landscape-xsmall") );

        } else{
          $(this).attr('src', $(this).attr("default") );
        }
      }
    });

  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////      Home Actions    /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
 
  $(".block--content").dotdotdot({
    /*  The text to add as ellipsis. */
    ellipsis  : '... ',
 
    /*  How to cut off the text/html: 'word'/'letter'/'children' */
    wrap    : 'word',
 
    /*  Wrap-option fallback to 'letter' for long words */
    fallbackToLetter: true,
 
    /*  jQuery-selector for the element to keep and put after the ellipsis. */
    after   : null,
 
    /*  Whether to update the ellipsis: true/'window' */
    watch   : false,
  
    /*  Optionally set a max-height, can be a number or function.
      If null, the height will be measured. */
    height    : 140,
 
    /*  Deviation for the height-option. */
    tolerance : 0,
 
    /*  Callback function that is fired after the ellipsis is added,
      receives two parameters: isTruncated(boolean), orgContent(string). */
    callback  : function( isTruncated, orgContent ) {},
 
    lastCharacter : {
 
      /*  Remove these characters from the end of the truncated text. */
      remove    : [ ' ', ',', ';', '.', '!', '?' ],
 
      /*  Don't add an ellipsis if this array contains 
        the last character of the truncated text. */
      noEllipsis  : []
    }
  });

  $(".h5__dotDotDot").dotdotdot({
    /*  The text to add as ellipsis. */
    ellipsis  : '... ',
 
    /*  How to cut off the text/html: 'word'/'letter'/'children' */
    wrap    : 'word',
 
    /*  Wrap-option fallback to 'letter' for long words */
    fallbackToLetter: true,
 
    /*  jQuery-selector for the element to keep and put after the ellipsis. */
    after   : null,
 
    /*  Whether to update the ellipsis: true/'window' */
    watch   : false,
  
    /*  Optionally set a max-height, can be a number or function.
      If null, the height will be measured. */
    height    : 38,
 
    /*  Deviation for the height-option. */
    tolerance : 0,
 
    /*  Callback function that is fired after the ellipsis is added,
      receives two parameters: isTruncated(boolean), orgContent(string). */
    callback  : function( isTruncated, orgContent ) {},
 
    lastCharacter : {
 
      /*  Remove these characters from the end of the truncated text. */
      remove    : [ ' ', ',', ';', '.', '!', '?', '<ul>', '</ul>' ],
 
      /*  Don't add an ellipsis if this array contains 
        the last character of the truncated text. */
      noEllipsis  : []
    }
  });
  $(".paragraph__dotDotDot").dotdotdot({
    /*  The text to add as ellipsis. */
    ellipsis  : '... ',
 
    /*  How to cut off the text/html: 'word'/'letter'/'children' */
    wrap    : 'word',
 
    /*  Wrap-option fallback to 'letter' for long words */
    fallbackToLetter: true,
 
    /*  jQuery-selector for the element to keep and put after the ellipsis. */
    after   : null,
 
    /*  Whether to update the ellipsis: true/'window' */
    watch   : false,
  
    /*  Optionally set a max-height, can be a number or function.
      If null, the height will be measured. */
    height    : 90,
 
    /*  Deviation for the height-option. */
    tolerance : 0,
 
    /*  Callback function that is fired after the ellipsis is added,
      receives two parameters: isTruncated(boolean), orgContent(string). */
    callback  : function( isTruncated, orgContent ) {},
 
    lastCharacter : {
 
      /*  Remove these characters from the end of the truncated text. */
      remove    : [ ' ', ',', ';', '.', '!', '?', '<ul>', '</ul>' ],
 
      /*  Don't add an ellipsis if this array contains 
        the last character of the truncated text. */
      noEllipsis  : []
    }
  });
  updateImageSizes($("div[custom-size]"));

  $(".header-menu-icon").click(function() {
    if($(".menu-principal").is(":visible")){
     
      $( ".menu-principal" ).slideUp( 1, function() {});
      $(".menu-principal-container .menu-principal ul.sub-menu").slideUp(1);
    }else{


      $( ".menu-principal" ).css("display", "none");

    }
  });

  $(".menu-principal-container .menu-principal .item div").on('mouseenter',function() {
    var id = $(this).find("a").attr('id');
    
    if(!$(".header-menu .header-menu-icon").is(":visible")){
    console.log('es visible')
      $(".sub-menu" , this ).css("display", "block");
      if(!$(".menu-principal-container .menu-principal ul.sub-menu[id='"+id+"']").is(":visible")){

        $(".menu-principal-container .menu-principal ul.sub-menu[id='"+id+"']").css("display", "none");

      }
    }

  });


    $(".menu-principal-container .menu-principal .item div").on('mouseleave',function() {
    
      $(".menu-principal-container .menu-principal ul.sub-menu").css("display", "none");

  });


  /*$(".menu-principal-container .menu-principal .item div").click(function() {
    var id = $(this).find("a").attr('id');
    var duration = 1;
    if($(".header-menu .header-menu-icon").is(":visible")){
      console.log('sirve');
      $(".menu-principal-container .menu-principal ul.sub-menu").slideUp(duration);

      if($(".menu-principal-container .menu-principal ul.sub-menu[id='"+id+"']").is(":visible")){
        $(".menu-principal-container .menu-principal ul.sub-menu[id='"+id+"']").slideUp(duration);

      }else{
        $(".menu-principal-container .menu-principal ul.sub-menu[id='"+id+"']").slideDown(duration);

      }
    }   
  });*/


  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////     Projects Actions     /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  $(".project-overview .project-questions ul li").click(function() {
    var id = $(this).find("a").attr('id');
    var duration = 200;

    $(".project-overview .project-questions ul li .answer").slideUp(duration);
    $(".project-overview .project-questions ul li .question").removeClass("clicked");

    if($(this).find(".answer").is(":visible")){
      $(this).find(".answer").slideUp(duration);
    }else{
      $(this).find(".answer").slideDown(duration);
      $(this).find(".question").addClass("clicked");
    }
  });

  //////////////////////////////////////     Video     //////////////////////////////////////

  $(".start-video img").on('click', function(ev) {
    $( ".video-thumbnail" ).hide( );
    $( ".featured-video-plus iframe" ).show( );
    $(".featured-video-plus iframe")[0].src = $(".featured-video-plus iframe")[0].src.replace("autoplay", "autoplay=1&");
    ev.preventDefault();
  });

  $(".start-video").css("top", (($(".video-thumbnail").height() / 2) - ($(".start-video img").height() / 2)) * 100 / $(".video-thumbnail").height()+ "%");
  $(".start-video").css("left", (($(".video-thumbnail").width() / 2) - ($(".start-video img").width() / 2)) * 100 / $(".video-thumbnail").width()+ "%");

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////     Sponsors & Partners Actions     //////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   /*if($(window).width() >= 963){
    setSponsorsHeights(higherSponsor(".content p"), ".content p");
   }*/

   setPartnersPadding();

   if($(window).width() >= 963){
    setPartnersHeights(higherPartner(".content"), ".content");
    setPartnersHeights(higherPartner(".content p"), ".content p");
   }
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////     Outreach Resizing Actions   /////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   var max = -1;

   if($(window).width() > 750){
     resetSubElementsHeights(".outreach-latest-news .outreach-news, .outreach-others-news", ".news-header");
     max = higherSubElement(".outreach-latest-news .outreach-news, .outreach-others-news", ".news-header");
     setSubElementsHeights(max, ".outreach-latest-news .outreach-news, .outreach-others-news", ".news-header");

     resetSubElementsHeights(".outreach-latest-news .outreach-news, .outreach-others-news", ".news-body");
     max = higherSubElement(".outreach-latest-news .outreach-news, .outreach-others-news", ".news-body");
     setSubElementsHeights(max, ".outreach-latest-news .outreach-news, .outreach-others-news", ".news-body");
   }

   $(window).resize(function() {
     resetSubElementsHeights(".outreach-latest-news .outreach-news, .outreach-others-news", ".news-header");
     max = higherSubElement(".outreach-latest-news .outreach-news, .outreach-others-news", ".news-header");
     setSubElementsHeights(max, ".outreach-latest-news .outreach-news, .outreach-others-news", ".news-header");

     resetSubElementsHeights(".outreach-latest-news .outreach-news, .outreach-others-news", ".news-body");
     max = higherSubElement(".outreach-latest-news .outreach-news, .outreach-others-news", ".news-body");
     setSubElementsHeights(max, ".outreach-latest-news .outreach-news, .outreach-others-news", ".news-body");
   });

   /*if($(window).width() > 1160){
     resetSubElementsHeights(".outreach-others-news .row:nth-child(2)  .outreach-news", ".news-header");
     max = higherSubElement(".outreach-others-news .row:nth-child(2)  .outreach-news", ".news-header");
     setSubElementsHeights(max, ".outreach-others-news .row:nth-child(2)  .outreach-news", ".news-header");

     resetSubElementsHeights(".outreach-others-news .row:nth-child(2)  .outreach-news", ".news-body");
     max = higherSubElement(".outreach-others-news .row:nth-child(2)  .outreach-news", ".news-body");
     setSubElementsHeights(max, ".outreach-others-news .row:nth-child(2)  .outreach-news", ".news-body");
   }

   if($(window).width() <= 1160){
     resetSubElementsHeights(".outreach-others-news-tablet .outreach-news", ".news-header");
     max = higherSubElement(".outreach-others-news-tablet .outreach-news", ".news-header");
     setSubElementsHeights(max, ".outreach-others-news-tablet .outreach-news", ".news-header");

     resetSubElementsHeights(".outreach-others-news-tablet .outreach-news", ".news-body");
     max = higherSubElement(".outreach-others-news-tablet .outreach-news", ".news-body");
     setSubElementsHeights(max, ".outreach-others-news-tablet .outreach-news", ".news-body");
   }*/

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////     Publications & Presentations Actions     /////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  $(".presentations-button").click(function() {
    $(".publications-tab").hide();
    $(".presentations-tab").show();
    $(this).addClass("active");
    $(".publications-button").removeClass("active");
  });

  $(".publications-button").click(function() {
    $(".presentations-tab").hide();
    $(".publications-tab").show();
    $(this).addClass("active");
    $(".presentations-button").removeClass("active");
  });


  $(document.body).on('click', '.presentation .header .hide' ,function(){
    $(this).parent().parent().find(".content").slideUp(200);
    $(this).hide();
    $(this).parent().find(".show").show();
  });

  $(document.body).on('click', '.presentation .header .show' ,function(){
    $(this).parent().parent().find(".content").slideDown(200);
    $(this).hide();
    $(this).parent().find(".hide").show();
  });

  $(document.body).on('click', '.publications .publication .hide' ,function(){
    $(this).parent().find(".content").slideUp(200);
    $(this).hide();
    $(this).parent().find(".show").show();
  });

  $(document.body).on('click', '.publications .publication .show' ,function(){
    $(this).parent().find(".content").slideDown(200);
    $(this).hide();
    $(this).parent().find(".hide").show();
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////     Publications & Presentations Search Actions     /////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  $(".presentations-tab .filter-options select").change(function() {
    var month = $(".presentations-tab .filter-options #month-filter").val();
    var year = $(".presentations-tab .filter-options #year-filter").val();
    var terms = $(".presentations-tab .filter-options .search-bar").val();
    $('.presentations-publications .loader-container').fadeIn();
    searchPresentations(month, year, terms);
  });

  $('.presentations-tab .filter-options .search-bar').keyup(function() {
      var month = $(".presentations-tab .filter-options #month-filter").val();
      var year = $(".presentations-tab .filter-options #year-filter").val();
      var terms = $(".presentations-tab .filter-options .search-bar").val();
    delay(function(){
      $('.presentations-publications .loader-container').fadeIn();
      searchPresentations(month, year, terms); 
    }, 500 );
  });


  $('.publications-tab .filter-options .search-bar').keyup(function() {
      var type = $(".publications-tab .filter-options select").val();
      var terms = $(this).val();
    delay(function(){
      $('.presentations-publications .loader-container').fadeIn();
      searchPublications(type, terms);  
    }, 500 );
  });

  $(".publications-tab .filter-options select").change(function() {
    var type = $(this).val();
    var terms = $(this).parent().parent().parent().find(".search-box .search-bar").val();
    $('.presentations-publications .loader-container').fadeIn();
    searchPublications(type, terms);
  });


  function searchPresentations(month, year, terms){
    //console.log(month);
    //console.log(year);
    $.ajax({
            type:"POST",
            url: "../wp-admin/admin-ajax.php",
            data: {
                action:'search_presentations', 
                month: month,
                year: year,
                terms: terms
            },
            success:function(data){
              $('.presentations-publications .loader-container').fadeOut();
              $(".presentations-tab .presentations").html(data);
              //$('.publications-tab .filter-options select').removeAttr("disabled");
              //$('.publications-tab .filter-options .search-bar').removeAttr("disabled");
            }
    });   

  }


  function searchPublications(type, terms){
    $.ajax({
            type:"POST",
            url: "../wp-admin/admin-ajax.php",
            data: {
                action:'search_publications', 
                type: type,
                terms: terms
            },
            success:function(data){
              $('.presentations-publications .loader-container').fadeOut();
              $(".publications-tab .publications").html(data);
              //$('.publications-tab .filter-options select').removeAttr("disabled");
              //$('.publications-tab .filter-options .search-bar').removeAttr("disabled");
            }
    });   

  }


  $(".mbon__inputSearch").click(function() {
    //console.log('hola input');
    $("#searchForm__container").toggle();
    $("input.searchForm__textInput").focus();
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////     Window Resize Actions     //////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).on('resize', function () {
//console.log('hola como');
    ResearchFilters();
  //////////////////////////////////////     Video Resizing Actions   /////////////////////////////////////

    $(".start-video").css("top", (($(".video-thumbnail").height() / 2) - ($(".start-video img").height() / 2)) * 100 / $(".video-thumbnail").height()+ "%");
    $(".start-video").css("left", (($(".video-thumbnail").width() / 2) - ($(".start-video img").width() / 2)) * 100 / $(".video-thumbnail").width()+ "%");

  //////////////////////////////////////     Sponsors & Partners Resizing Actions   /////////////////////////////////////

    //resetSponsorsHeights(".content p");
    if($(window).width() >= 963){
     setSponsorsHeights(higherSponsor(".content p"), ".content p");
    }

    resetPartnersHeights(".content p");
    resetPartnersHeights(".content");
    if($(window).width() >= 963){
    setPartnersHeights(higherPartner(".content"), ".content");
     setPartnersHeights(higherPartner(".content p"), ".content p");
     setPartnersPadding();
    }

  //////////////////////////////////////     Outreach Resizing Actions   /////////////////////////////////////

    /*var max = -1;
    if($(window).width() > 750){
      resetSubElementsHeights(".outreach-latest-news .outreach-news, .outreach-others-news", ".news-header");
      max = higherSubElement(".outreach-latest-news .outreach-news, .outreach-others-news", ".news-header");
      setSubElementsHeights(max, ".outreach-latest-news .outreach-news, .outreach-others-news", ".news-header");

      resetSubElementsHeights(".outreach-latest-news .outreach-news", ".news-body");
      max = higherSubElement(".outreach-latest-news .outreach-news", ".news-body");
      setSubElementsHeights(max, ".outreach-latest-news .outreach-news", ".news-body");
    }else{
      resetSubElementsHeights(".outreach-latest-news .outreach-news, .outreach-others-news", ".news-header");
      resetSubElementsHeights(".outreach-latest-news .outreach-news", ".news-body");
    }

    if($(window).width() > 1160){
      resetSubElementsHeights(".outreach-others-news .row:nth-child(2)  .outreach-news", ".news-header");
      max = higherSubElement(".outreach-others-news .row:nth-child(2)  .outreach-news", ".news-header");
      setSubElementsHeights(max, ".outreach-others-news .row:nth-child(2)  .outreach-news", ".news-header");

      resetSubElementsHeights(".outreach-others-news .row:nth-child(2)  .outreach-news", ".news-body");
      max = higherSubElement(".outreach-others-news .row:nth-child(2)  .outreach-news", ".news-body");
      setSubElementsHeights(max, ".outreach-others-news .row:nth-child(2)  .outreach-news", ".news-body");
    }

    if($(window).width() <= 1160){
      resetSubElementsHeights(".outreach-others-news-tablet .outreach-news", ".news-header");
      max = higherSubElement(".outreach-others-news-tablet .outreach-news", ".news-header");
      setSubElementsHeights(max, ".outreach-others-news-tablet .outreach-news", ".news-header");

      resetSubElementsHeights(".outreach-others-news-tablet .outreach-news", ".news-body");
      max = higherSubElement(".outreach-others-news-tablet .outreach-news", ".news-body");
      setSubElementsHeights(max, ".outreach-others-news-tablet .outreach-news", ".news-body");
    }
*/

  //////////////////////////////////////     General Image Resizing Actions   /////////////////////////////////////
  
    updateImageSizes($("div[custom-size]"));

    function helloWorld(){
      //console.log('helloWorld');
    }
    helloWorld();

  }); 
});
jQuery(document).ready(function($) {
  var altViewport = $(window).height();
  console.log(altViewport);
});