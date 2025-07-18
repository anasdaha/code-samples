
(function ($, Drupal) {
    Drupal.behaviors.fluxio = {
      attach: function (context, settings) {
        if($('.region-tertiary-menu .nav-js').length){
          $('.region-tertiary-menu .nav-js').addClass('Subnav__list underline').removeClass('Header__nav');
          $('.region-tertiary-menu .nav-js .menu-item--expanded > .button-toggle-js').addClass('Subnav__sub-toggle').removeClass('Header__sub-toggle');
          $('.Subnav__list .menu-item.menu-item--expanded.menu-item--active-trail > .button-toggle-js').attr('aria-expanded', 'true');
        }
        
        $('.paragraph--type--news-listing div[data-oversnap-scroll] .node--view-mode-teaser').each(function() {
          if($('.paragraph--type--news-listing div[data-oversnap-scroll] .node--view-mode-teaser').length > $('.paragraph--type--news-listing div[data-oversnap-pagination] button').length){
            $('.paragraph--type--news-listing div[data-oversnap-pagination]').append('<button data-oversnap-page="" aria-label="Page"></button>');
          }
        });

        $('.Header__search-toggle').on('click', function(){
          setTimeout(function() {
            $('.Header__search input.gsc-input').focus();
          }, 200);
        });

        if($('.user-logged-in').length){
          $(window).scroll(function(){
            if(this.scrollY > 100){
              $('header.Header').attr('data-stuck', '');
            } else {
              $('header.Header').removeAttr('data-stuck', '');
            }
          })
        }
      }
    }
})(jQuery, Drupal);