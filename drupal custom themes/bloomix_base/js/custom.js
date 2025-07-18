
(function ($, Drupal, once) {
    Drupal.behaviors.bloomix_base = {
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

        
        if(jQuery('.Header__college-title').length > 0){
          jQuery('header.Header').addClass('Header--college');
        }

        jQuery(document).off('click', '#load-more').on('click', '#load-more', function () {
          let hiddenItems = jQuery('#load-items .Page__item:not(.show)'); // Get items without the 'show' class
          hiddenItems.slice(0, 6).addClass('show'); // Show next 6 items

          if (jQuery('#load-items .Page__item:not(.show)').length === 0) {
            jQuery(this).addClass('hide');
            jQuery('#load-all').addClass('hide');
          }
        });

        jQuery(document).off('click', '#load-all').on('click', '#load-all', function () {
          jQuery('#load-items .Page__item').each(function( index ) {
            jQuery(this).addClass('show');
          });
          jQuery(this).addClass('hide');
          jQuery('#load-more').addClass('hide');
        });

        jQuery('.CheckList .CheckList__grid .CheckList__heading:nth-of-type(1) .CheckList__toggle').attr('aria-expanded','true');
        
        // document.addEventListener("DOMContentLoaded", function () {
        window.addEventListener("load", function () {
          const observer = new MutationObserver(() => {
              let eventDates = document.querySelectorAll(".cal_date"); // Select event date containers
      
              eventDates.forEach((dateContainer) => {
                  let monthElement = dateContainer.querySelector(".cal_date_month");
                  let dayElement = dateContainer.querySelector(".cal_date_day");
      
                  if (monthElement && dayElement) {
                      let monthText = monthElement.innerText.trim(); // Example: "May"
                      let day = dayElement.innerText.trim(); // Example: "23"
      
                      // Convert month name to number (e.g., "May" -> 5)
                      let monthMap = {
                          "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4,
                          "May": 5, "Jun": 6, "Jul": 7, "Aug": 8,
                          "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
                      };
                      let month = monthMap[monthText]; // Convert month name to number
      
                      if (month) {
                          let year = new Date().getFullYear(); // Use current year
                          let formattedDate = `${month}/${day}/${year}`; // Format as MM/DD/YYYY
                          
                          // Replace the existing date structure with the formatted date
                          dateContainer.innerHTML = `<span class="formatted_event_date">${formattedDate}</span>`;
                      }
                  }
              });
          });
      
          // Start observing the LiveWhale embed container
          let targetNode = document.querySelector(".events-js");
          if (targetNode) {
              observer.observe(targetNode, { childList: true, subtree: true });
          }

          // Fix vertical-tabs scroll based on number of items
          let elementsHeight = jQuery('[data-flexscroll-dots]').height();
          let elementsWrapper = jQuery('[data-flexscroll-dots]').closest('.flexscroll-area.with-scroll').height();
          if(elementsHeight > elementsWrapper){
            jQuery('.TimelineCarousel .flexscroll-area').removeClass('scrolled fix-scroll');
          } else {
            jQuery('.TimelineCarousel .flexscroll-area').addClass('fix-scroll')
          }

          // show 6 news on page load if handpicked news selected
          jQuery('.Posts .Posts__item:nth-of-type(-n+6)').addClass('show');
        });

        // Prevent re-initializing if already done
      if (context.querySelector('#yt-player') && !context.querySelector('#yt-player').classList.contains('video-loaded')) {
        // Load the YouTube API script only once
        if (!window.YT) {
          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          document.body.appendChild(tag);
        }

        // Mark as loaded
        $('#yt-player', context).addClass('video-loaded');

        // Define player variable in global scope
        window.onYouTubeIframeAPIReady = function () {
          var videoId = document.getElementById('yt-player').dataset.videoId;

          window.ytPlayer = new YT.Player('yt-player', {
            videoId: videoId,
            playerVars: {
              autoplay: 1,
              controls: 0,
              mute: 1,
              modestbranding: 1,
              rel: 0,
              enablejsapi: 1
            },
            events: {
              'onReady': function (event) {
                event.target.playVideo();
              }
            }
          });
        };

        // Custom play/pause toggle
        $('#yt-control', context).on('click', function () {
          if (window.ytPlayer) {
            var playerState = window.ytPlayer.getPlayerState();
            if (playerState === YT.PlayerState.PLAYING) {
              window.ytPlayer.pauseVideo();
              $(this).addClass('Hero__control--paused');
            } else {
              window.ytPlayer.playVideo();
              $(this).removeClass('Hero__control--paused');
            }
          }
        }); 
      }


      jQuery('#cdn-control', context).on('click', function () {
        if (jQuery('.cdn_video').length) {
          console.log(jQuery('.cdn_video'));
          jQuery('.cdn_video').trigger("click");
          if(jQuery(this).hasClass('Hero__control--paused')){
            jQuery(this).removeClass('Hero__control--paused');
          } else{
            jQuery(this).addClass('Hero__control--paused');
          }
        }
      });


      const automodal = (target, options) => {
        const reflow = () => {
          document.documentElement.scrollTop;
        };

        const animations = (element) => {
          return Promise.allSettled(element.getAnimations().map((animation) => animation.finished));
        };

        const getType = (target) => {
          const href = target.getAttribute('href');
          const type = target.getAttribute('data-automodal-type');

          if (type) {
            return type;
          }

          if (href.startsWith('#')) {
            return 'id';
          }

          if (href.includes('youtube.com/shorts/')) {
            return 'short';
          }

          if (href.includes('youtube.com') || href.includes('youtu.be')) {
            return 'youtube';
          }

          if (href.includes('tiktok.com')) {
            return 'tiktok';
          }

          if (href.includes('instagram.com/p/')) {
            return 'instagram';
          }

          if (href.includes('instagram.com/reel/')) {
            return 'reel';
          }

          if (href.includes('vimeo.com')) {
            return 'vimeo';
          }

          if (href.includes('google.com/maps/')) {
            return 'map';
          }

          return 'image';
        };

        const iframe = (src, title) => {
          return `<iframe src="${src}" ${title && `title="${title}"`} allow="autoplay; fullscreen;"></iframe>`;
        };

        const load = async (target) => {
          const href = target.getAttribute('href');
          const type = getType(target);
          const alt = target.getAttribute('data-automodal-alt') ?? '';
          const title = target.getAttribute('data-automodal-title') ?? '';

          if (type === 'fetch') {
            return (await (await fetch(href)).text()).trim();
          }

          if (type === 'iframe') {
            return iframe(href, title);
          }

          if (type === 'id') {
            return document.querySelector(href).outerHTML.trim();
          }

          if (type === 'short') {
            const id = href.split('/shorts/')[1];
            const src = `https://www.youtube.com/embed/${id}`;

            return iframe(src, title);
          }

          if (type === 'youtube') {
            let src = `https://www.youtube.com/embed/`;

            if (href.includes('youtube.com')) {
              src += href.split('v=')[1].replace('&', '?');
            }

            if (href.includes('youtu.be')) {
              src += href.split('youtu.be/')[1];
            }

            return iframe(src, title);
          }

          if (type === 'tiktok') {
            const id = href.split('/video/')[1];
            const src = `https://www.tiktok.com/embed/v2/${id}`;

            return iframe(src, title);
          }

          if (type === 'instagram') {
            const id = href.split('/p/')[1].split('/')[0];
            const src = `https://www.instagram.com/p/${id}/embed/captioned/`;

            return iframe(src, title);
          }

          if (type === 'reel') {
            const id = href.split('/reel/')[1].split('/')[0];
            const src = `https://www.instagram.com/reel/${id}/embed/captioned/`;

            return iframe(src, title);
          }

          if (type === 'vimeo') {
            const id = href.split('vimeo.com/')[1];
            const src = `https://player.vimeo.com/video/${id}`;

            return iframe(src, title);
          }

          if (type === 'map') {
            let src = 'https://www.google.com/maps/embed/v1/';

            if (href.includes('/maps/place/')) {
              const place = href.match('(?:/maps/place/)([^/]+)')[1];

              src += `place?key=${options.googleMapsAPIKey}&q=${place}`;
            }

            if (href.includes('/maps/@')) {
              const data = href.match('(?:/maps/@)([^z]+)')[1].split(',');

              src += `view?key=${options.googleMapsAPIKey}&center=${data[0]},${data[1]}&zoom=${data[2]}z`;
            }

            return iframe(src, title);
          }

          return `<img src="${href}" ${alt && `alt="${alt}"`}>`;
        };

        const item = async (target) => {
          const type = getType(target);
          const name = target.getAttribute('data-automodal-custom') ?? '';
          const content = await load(target);
          const caption = target.getAttribute('data-automodal-caption') ?? '';

          return `
            <div class="Automodal__item Automodal__item--${type} ${name && `Automodal__item--${name}`}">
              <figure class="Automodal__content">
                ${content}
                ${caption && `<figcaption class="Automodal__caption">${caption}</figcaption>`}
              </figure>
            </div>
          `;
        };

        target.addEventListener('click', (e) => {
          e.preventDefault();

          let updating = false;

          let index;
          let group = target.getAttribute('data-automodal-group') ?? '';

          if (group) {
            group = document.querySelectorAll(`[data-automodal-group="${group}"]`);
            index = [...group].indexOf(target);
          }

          const dialog = document.createElement('dialog');
          dialog.classList.add('Automodal');
          dialog.innerHTML = `
            <button class="Automodal__close" aria-label="Close"></button>
            <div class="Automodal__viewport"></div>
            ${group && `
              <button class="Automodal__nav Automodal__nav--prev" aria-label="Previous"></button>
              <button class="Automodal__nav Automodal__nav--next" aria-label="Next"></button>
            `}
          `;

          const close = dialog.querySelector('.Automodal__close');
          const viewport = dialog.querySelector('.Automodal__viewport');
          const prev = dialog.querySelector('.Automodal__nav--prev');
          const next = dialog.querySelector('.Automodal__nav--next');

          const insert = async (target) => {
            viewport.insertAdjacentHTML('beforeend', await item(target));
            target.dispatchEvent(new CustomEvent('load'));
          };

          const nav = async (dir) => {
            if (group && !updating) {
              const remove = viewport.firstElementChild;

              if (dir === 'prev') {
                index = index - 1 >= 0 ? index - 1 : group.length - 1;
              }

              if (dir === 'next') {
                index = index + 1 < group.length ? index + 1 : 0;
              }

              updating = true;
              dialog.classList.add(`Automodal--${dir}`);

              await insert(group[index]);
              const add = viewport.lastElementChild;
              add.classList.add('Automodal__item--add');

              reflow();
              add.classList.remove('Automodal__item--add');
              remove.classList.add('Automodal__item--remove');

              await animations(add);
              await animations(remove);
              remove.remove();

              dialog.classList.remove(`Automodal--${dir}`);
              updating = false;
            }
          };

          const remove = async () => {
            dialog.classList.remove('Automodal--active');
            await animations(dialog);
            dialog.close();
            dialog.remove();
          };

          const keydown = (e) => {
            if (e.key === 'ArrowLeft') {
              nav('prev');
            }

            if (e.key === 'ArrowRight') {
              nav('next');
            }

            if (e.key === 'Escape') {
              e.preventDefault();
              remove();
            }
          };

          const build = async () => {
            document.body.append(dialog);
            dialog.showModal();
            await insert(target);
            reflow();
            dialog.classList.add('Automodal--active');
          };

          const outside = (e) => {
            if (e.target === dialog) {
              remove();
            }
          };

          const listen = () => {
            dialog.addEventListener('keydown', keydown);
            dialog.addEventListener('click', outside);
            prev?.addEventListener('click', () => { nav('prev'); });
            next?.addEventListener('click', () => { nav('next'); });
            close.addEventListener('click', remove);
          };

          const init = () => {
            build();
            listen();
          };

          init();
        });
      };
      // const targets$2 = document.querySelectorAll("[data-automodal-custom]");
      const targets$2 = once('automodal-init', '[data-automodal-custom]', context);
      for (const target of targets$2) {
        automodal(target);
      }

      $(window).on('load', function () {
      setTimeout(
        function(){
          $('.paragraph--type--embed-form iframe, iframe[class*="wufoo-form"]').each(function () {
            var $iframe = $(this);
            var heightAttr = $iframe.attr('height');
            if (heightAttr) {
              $iframe.css('height', heightAttr + 'px').attr('style', function(i, style) {
                return (style || '') + ' height: ' + heightAttr + 'px !important;';
              });
            }
          });
        }
      , 1000);
    });
    }
  }
})(jQuery, Drupal, once);