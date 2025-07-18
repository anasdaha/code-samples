(function ($, Drupal) {

    // NESTED LIBRARY PAGES CHAT FEATURE
    Drupal.behaviors.fluxioLibraryChatFeature = {

        attach: function (context, settings) {

            $(once("fluxioLibraryChatFeature", "body")).each(function () {

                function libraryChatFeature() {
                    var x = document.createElement("script"); x.type = "text/javascript"; x.async = true;
                    x.src = (document.location.protocol === "https:" ? "https://" : "http://") + "#";
                    var y = document.getElementsByTagName("script")[0]; y.parentNode.insertBefore(x, y);
                }

                function chatClickHandler() {
                    window.open('#', 'AskUs', 'resizable=1,width=500,height=300');
                    return false;
                }

                // THROTTLE SCROLL
                function throttleNestedLibraryChatScroll(fn, delay) {
                    var presentTime = Date.now();
                    return function () {
                        if ((presentTime + delay - Date.now()) < 0) {
                            fn();
                            presentTime = Date.now();
                        }
                    };
                }

                // DEBOUNCE FOR RESIZE FUNCTION
                function debounceNestedLibraryChatResize(fn, delay) {
                    var timer = null;
                    return function () {
                        var context = this;
                        var args = arguments;
                        window.clearTimeout(timer);
                        timer = window.setTimeout(function () {
                            fn.apply(context, args);
                        }, delay);
                    };

                }

                function getFooterHeight(){
                    footerNav = $('.footer-nav')[0];
                    return $(footerNav).height();
                }

                function getFooterLinksRowHeight(){
                    footerLink = $('.footer-link-1')[0];
                    return $(footerLink).height();
                }

                function positionChatButton() {
                    var libraryChatButton = $("#library-chatbox");

                    if( $(window).width() > 1135 && $(this).scrollTop() === 0 && $(libraryChatButton).css("bottom") != "0px"){
                        $(libraryChatButton).stop();
                        $(libraryChatButton).animate({ bottom: "0px" }, 100);
                    } else if($(window).width() > 1135 && $(this).scrollTop() > 0 && $(libraryChatButton).css("bottom") != (getFooterHeight() + 10) + "px"){
                        $(libraryChatButton).stop();
                        $(libraryChatButton).animate({ bottom: (getFooterHeight() + 10) + "px" }, 100);
                    } else if($(window).width() > 695 && $(window).width() <= 1135 && (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - (getFooterHeight() + getFooterLinksRowHeight() + 50) ) && $(libraryChatButton).css("bottom") != (getFooterHeight() + getFooterLinksRowHeight() + 30) + "px"){
                        $(libraryChatButton).stop();
                        $(libraryChatButton).animate({ bottom: (getFooterHeight() + getFooterLinksRowHeight() + 30) + "px" }, 100);
                    } else if($(window).width() > 695 && $(window).width() <= 1135 && (window.innerHeight + window.scrollY) < (document.body.offsetHeight - (getFooterHeight() + getFooterLinksRowHeight() + 50) ) && $(libraryChatButton).css("bottom") != "0px" ){
                        $(libraryChatButton).stop();
                        $(libraryChatButton).animate({ bottom: "0px" }, 100);
                    } else if($(window).width() <= 695 && (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - (getFooterHeight() + getFooterLinksRowHeight() + 50)) && $(libraryChatButton).css("bottom") != (getFooterHeight() + getFooterLinksRowHeight() + 30) + "px"){
                        $(libraryChatButton).stop();
                        $(libraryChatButton).animate({ bottom: (getFooterHeight() + getFooterLinksRowHeight() + 30) + "px" }, 100);
                    } else if( $(window).width() <= 695 && (window.innerHeight + window.scrollY) < (document.body.offsetHeight - (getFooterHeight() + getFooterLinksRowHeight() + 50)) && $(libraryChatButton).css("bottom") != "0px" ){
                        $(libraryChatButton).stop();
                        $(libraryChatButton).animate({ bottom: "0px" }, 100);
                    }

                }

                function callPositionChatButton() {
                    $(window).on("scroll", throttleNestedLibraryChatScroll(positionChatButton, 50));
                    $(window).on("resize", debounceNestedLibraryChatResize(positionChatButton, 50));
                }

                if ($("#library-chatbox").length) {
                    libraryChatFeature();
                    positionChatButton();
                    callPositionChatButton();
                    $("#chatHandlerAnchor").on("click", function () {
                        chatClickHandler();
                    });
                }

            });

        }

    }

})(jQuery, Drupal);