!function(t){var a=t("#search-form-wrap"),e=!1,n=function(){e=!0},o=function(t){setTimeout(function(){e=!1,t&&t()},200)};t("#nav-search-btn").on("click",function(){e||(n(),a.addClass("on"),o(function(){t(".search-form-input").focus()}))}),t(".search-form-input").on("blur",function(){n(),a.removeClass("on"),o()}),t("body").on("click",function(){t(".article-share-box.on").removeClass("on")}).on("click",".article-share-link",function(a){a.stopPropagation();var e=t(this),n=e.attr("data-url"),o=encodeURIComponent(n),i="article-share-box-"+e.attr("data-id"),s=e.offset();if(t("#"+i).length){if((c=t("#"+i)).hasClass("on"))return void c.removeClass("on")}else{var r=['<div id="'+i+'" class="article-share-box">','<input class="article-share-input" value="'+n+'">','<div class="article-share-links">','<a href="https://twitter.com/intent/tweet?url='+o+'" class="article-share-twitter" target="_blank" title="Twitter"></a>','<a href="https://www.facebook.com/sharer.php?u='+o+'" class="article-share-facebook" target="_blank" title="Facebook"></a>','<a href="http://pinterest.com/pin/create/button/?url='+o+'" class="article-share-pinterest" target="_blank" title="Pinterest"></a>','<a href="https://plus.google.com/share?url='+o+'" class="article-share-google" target="_blank" title="Google+"></a>',"</div>","</div>"].join(""),c=t(r);t("body").append(c)}t(".article-share-box.on").hide(),c.css({top:s.top+30,left:s.left+28}).addClass("on")}).on("click",".article-share-box",function(t){t.stopPropagation()}).on("click",".article-share-box-input",function(){t(this).select()}).on("click",".article-share-box-link",function(t){t.preventDefault(),t.stopPropagation(),window.open(this.href,"article-share-box-window-"+Date.now(),"width=500,height=450")}),t(".article-entry").each(function(a){t(this).find("img").each(function(){if(!t(this).parent().hasClass("fancybox")){var a=this.alt;a&&t(this).after('<span class="caption">'+a+"</span>"),t(this).wrap('<a href="'+this.src+'" title="'+a+'" class="fancybox"></a>')}}),t(this).find(".fancybox").each(function(){t(this).attr("rel","article"+a)})}),t.fancybox&&t(".fancybox").fancybox();var i=t("#container"),s=!1;t("#main-nav-toggle").on("click",function(){s||(s=!0,i.toggleClass("mobile-nav-on"),setTimeout(function(){s=!1},200))}),t("#wrap").on("click",function(){!s&&i.hasClass("mobile-nav-on")&&i.removeClass("mobile-nav-on")})}(jQuery);