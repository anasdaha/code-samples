
(function ($, Drupal) {
    Drupal.behaviors.novaspire = {
      attach: function (context, settings) {

        //Responsive Tables
        if(jQuery('.Table__stack table').length > 0){
          jQuery('.Table__stack table').each(function() {
            jQuery(this).find('tbody tr').each(function() {
              jQuery(this).find('td').each(function( index ) {
                jQuery(this).attr('data-label', jQuery(this).closest('table').find('thead th').eq(index).text());
              });
            });
          });
        }

        //Header Search on Scroll 
        jQuery(window).scroll(function() {
          const root = document.documentElement;
          var headerDiv = jQuery(".header__main");
          var window_offset = headerDiv.offset().top - jQuery(window).scrollTop() - 25;
          if (window_offset < -174)
          {
            root.setAttribute('data-scrollsearch', 'up');
          } else {
            root.setAttribute('data-scrollsearch', 'down');
          }
        });

        if(jQuery('.region-content > .block-system > h2:contains("Search results")').length > 0){
          jQuery('.region-content > .block-system > h2:contains("Search results")').replaceWith($('<h1>').html('Search results'));
        }

        function removeExtraCharacter(){
          // Select all direct child nodes of the body
          var removeExtraCharacterInterval = setInterval(
            function () {
              document.body.childNodes.forEach((node) => {
                // Check if the node is a text node
                if (node.nodeType === Node.TEXT_NODE) {
                  // Check if the text content is an isolated double quote
                  if (node.textContent.trim() === '"') {
                    node.textContent = ''; // Remove the unwanted character
                  }
                }
              });
            }
          , 500);

          setTimeout(
            function () {
              clearInterval(removeExtraCharacterInterval);
            }
          , 10000);
        }
        
        removeExtraCharacter();
        
        document.addEventListener("DOMContentLoaded", function () {
          removeExtraCharacter();
        });
      }
    }
})(jQuery, Drupal);