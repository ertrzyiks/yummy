!function(c){var e=function(t,a){a=a||0;var n=t.getBoundingClientRect();return n.top>=-a&&n.bottom<=(window.innerHeight||document.documentElement.clientHeight)+a},t=c("#search-form-wrap"),a=!1,n=function(){a=!0},o=function(t){setTimeout(function(){a=!1,t&&t()},200)};c("#nav-search-btn").on("click",function(){a||(n(),t.addClass("on"),o(function(){c(".search-form-input").focus()}))}),c(".search-form-input").on("blur",function(){n(),t.removeClass("on"),o()}),c("body").on("click",function(){c(".article-share-box.on").removeClass("on")}).on("click",".article-share-link",function(t){t.stopPropagation();var a=c(this),n=a.attr("data-url"),e=encodeURIComponent(n),o="article-share-box-"+a.attr("data-id"),i=a.offset();if(c("#"+o).length){if((s=c("#"+o)).hasClass("on"))return void s.removeClass("on")}else{var r=['<div id="'+o+'" class="article-share-box">','<input class="article-share-input" value="'+n+'">','<div class="article-share-links">','<a href="https://twitter.com/intent/tweet?url='+e+'" class="article-share-twitter" target="_blank" title="Twitter"></a>','<a href="https://www.facebook.com/sharer.php?u='+e+'" class="article-share-facebook" target="_blank" title="Facebook"></a>','<a href="http://pinterest.com/pin/create/button/?url='+e+'" class="article-share-pinterest" target="_blank" title="Pinterest"></a>','<a href="https://plus.google.com/share?url='+e+'" class="article-share-google" target="_blank" title="Google+"></a>',"</div>","</div>"].join(""),s=c(r);c("body").append(s)}c(".article-share-box.on").hide(),s.css({top:i.top+30,left:i.left+28}).addClass("on")}).on("click",".article-share-box",function(t){t.stopPropagation()}).on("click",".article-share-box-input",function(){c(this).select()}).on("click",".article-share-box-link",function(t){t.preventDefault(),t.stopPropagation(),window.open(this.href,"article-share-box-window-"+Date.now(),"width=500,height=450")}),c(".article-entry").each(function(t){c(this).find("img").each(function(){if(!c(this).parent().hasClass("fancybox")){var t=this.alt;t&&c(this).after('<span class="caption">'+t+"</span>"),c(this).wrap('<a href="'+this.src+'" title="'+t+'" class="fancybox"></a>')}}),c(this).find(".fancybox").each(function(){c(this).attr("rel","article"+t)})}),c.fancybox&&c(".fancybox").fancybox();var i=c("#container"),r=!1;function s(){var t=c("[data-lazy-src]");0!=t.length?t.each(function(){var t=c(this);if(e(this,500)){var a=t.data("lazy-src");t.removeAttr("data-lazy-src");var n=new Image;n.onload=function(){t.addClass("is-loaded").css("background-image","url("+a+")")},n.src=a}}):c(window).off("scroll.lazy-loading")}c("#main-nav-toggle").on("click",function(){r||(r=!0,i.toggleClass("mobile-nav-on"),setTimeout(function(){r=!1},200))}),c("#wrap").on("click",function(){!r&&i.hasClass("mobile-nav-on")&&i.removeClass("mobile-nav-on")}),c(window).on("scroll.lazy-loading",function(o){var i=arguments.length<=1||void 0===arguments[1]?100:arguments[1],r=null;return function(){for(var t=this,a=arguments.length,n=Array(a),e=0;e<a;e++)n[e]=arguments[e];null===r&&(r=setTimeout(function(){o.apply(t,n),r=null},i))}}(s,200)),s()}(jQuery);