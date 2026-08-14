
/*Browser detection script start*/
var BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "Other";
    this.version =
      this.searchVersion(navigator.userAgent) ||
      this.searchVersion(navigator.appVersion) ||
      "Unknown";
  },
  searchString: function (data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      this.versionSearchString = data[i].subString;

      if (dataString.indexOf(data[i].subString) !== -1) {
        return data[i].identity;
      }
    }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index === -1) {
      return;
    }

    var rv = dataString.indexOf("rv:");
    if (this.versionSearchString === "Trident" && rv !== -1) {
      return parseFloat(dataString.substring(rv + 3));
    } else {
      return parseFloat(
        dataString.substring(index + this.versionSearchString.length + 1)
      );
    }
  },

  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Edge",
      identity: "ms-edge",
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "explorer",
    },
    {
      string: navigator.userAgent,
      subString: "Trident",
      identity: "explorer",
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "firefox",
    },
    {
      string: navigator.userAgent,
      subString: "Opera",
      identity: "opera",
    },
    {
      string: navigator.userAgent,
      subString: "OPR",
      identity: "opera",
    },

    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "chrome",
    },
    {
      string: navigator.userAgent,
      subString: "Safari",
      identity: "safari",
    },
  ],
};

/* Waypoint script*/
// $(function () {
$(window).on("load", function () {
  function onScrollInit(items, trigger) {
    items.each(function () {
      var osElement = $(this),
        osAnimationClass = osElement.attr("data-os-animation"),
        osAnimationDelay = osElement.attr("data-os-animation-delay");

      osElement.css({
        "-webkit-animation-delay": osAnimationDelay,
        "-moz-animation-delay": osAnimationDelay,
        "animation-delay": osAnimationDelay,
      });

      var osTrigger = trigger ? trigger : osElement;

      osTrigger.waypoint(
        function () {
          osElement.addClass("animated").addClass(osAnimationClass);
        },
        {
          triggerOnce: true,
          offset: "90%",
        }
      );
    });
  }
  onScrollInit($(".os-animation"));
  onScrollInit($(".staggered-animation"), $(".staggered-animation-container"));
  Waypoint.refreshAll();
});

$(document).ready(function () {
  BrowserDetect.init();
  $("body").addClass(
    BrowserDetect.browser + " " + BrowserDetect.browser + BrowserDetect.version
  );

  // $(".menu").click(function() {
  //     console.log(111);
  //     $(".expand-menu").slideDown();
  //     $("body").addClass("ohidden");

  // });

  // $(".menu.close").click(function() {
  //     $(".expand-menu").slideUp();
  //     $("body").removeClass("ohidden");
  // });

  // edit start by ratan from stagvml

  $(".menu").click(function () {
    $(".expand-menu").slideDown();
    $(".expand-search").slideUp();
    $("body").addClass("ohidden");
    return false;
  });

  $(".serch-click").click(function () {
    console.log(111);
    $(".expand-search").slideDown();
    $(".expand-menu").slideUp();
    $("body").addClass("ohidden");
    return false;
  });

  $(".menu.close").click(function () {
    $(".expand-menu").slideUp();
    $("body").removeClass("ohidden");
    return false;
  });

  $(".search.close").click(function () {
    $(".expand-search").slideUp();
    $("body").removeClass("ohidden");
    return false;
  });


  $(window).on("load", function () {
    /* Common Sticky secondary Nav start */
    if ($(".secondary-nav, .breadcrumbwrap").length) {
      var offsethd = $(".secondary-nav, .breadcrumbwrap").offset().top - 0;
      $(window).scroll(function () {
        // alert("scrolled");
        if ($(this).scrollTop() > offsethd) {
          $(".secondary-nav, .breadcrumbwrap").addClass("sticky");
        } else {
          $(".secondary-nav, .breadcrumbwrap").removeClass("sticky");
          $(".secondary-nav, .breadcrumbwrap").removeClass("push");
        }
      });
    }
    /* Common Sticky secondary Nav start */

    //For videos which are not in banner or first view..
    $(this).one("scroll", function () {
      // alert('scroll');
      $(".lazyimg").each(function () {
        if ($(this).attr("data-src")) {
          this.tagName == "IMG" || this.tagName == "IFRAME"
            ? $(this).attr("src", $(this).data("src"))
            : $(this).css(
                "background-image",
                "url(" + $(this).data("src") + ")"
              );
          $(this).removeAttr("data-src");
        }
      });

      // if ($(window).width() <= 768) {
      //     $(".video-src").attr("src", $(".video-src").attr('data-mobile'));
      //     $(".dual-video").get()[0].load();
      //     $(".dual-video").get()[0].play();
      // }else{
      //     $(".video-src").attr("src", $(".video-src").attr('data-desktop'));
      //     $(".dual-video").get()[0].load();
      //     $(".dual-video").get()[0].play();
      // }
    });
  });

  // video lazy load start
  function handleLazyLoad(videoElement) {
    var sourceElement = $(videoElement).find("source");

    // Set data attributes for mobile and desktop
    var commonSource = sourceElement.data("src");
    var mobileSource = sourceElement.data("mobile");
    var desktopSource = sourceElement.data("desktop");

    function loadVideo() {
      // Check if the user has scrolled at least 50 pixels
      if ($(window).scrollTop() > 50) {
        var videoSource = "";
        if (commonSource) {
          videoSource = commonSource;
        } else {
          videoSource = $(window).width() <= 993 ? mobileSource : desktopSource;
        }
        sourceElement.attr("src", videoSource);

        // Load the video when it comes into the viewport
        $(videoElement)[0].load();

        // Remove the event listener after the video has been loaded
        $(window).off("scroll", loadVideo);
      }
    }

    // Attach the lazy load function to the scroll event
    $(window).on("scroll", loadVideo);

    // Trigger the lazy load function on window load
    loadVideo();
  }

  $(".lazy-video").each(function () {
    handleLazyLoad(this);
  });
  // video lazy load ends

  var lastScrollTop = 0;
  $(window).scroll(function (e) {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
      $(".header").removeClass("sticky");
      if ($(".secondary-nav").hasClass("sticky")) {
        $(".secondary-nav").removeClass("push");
      }
      //$(".secondary-nav").removeClass("push");
    } else if (st == 0) {
      $(".header").removeClass("sticky");
      if ($(".secondary-nav").hasClass("sticky")) {
        $(".secondary-nav").removeClass("push");
      }
      //$(".secondary-nav").removeClass("push");
    } else {
      $(".header").addClass("sticky");
      if ($(".secondary-nav").hasClass("sticky")) {
        $(".secondary-nav").addClass("push");
      }
      // $(".secondary-nav").addClass("push");
    }
    lastScrollTop = st;
  });

  /* Smoothscroll Secondary nav Start */
  var is_iPad = navigator.userAgent.match(/iPad/i) != null;
  var lastId,
    topMenu = $(".snav-wraper ul.nav"),
    topMenuHeight = topMenu.outerHeight() + 20,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function () {
      // var item = $($(this).attr("href"));
      // if (item.length) {
      //     return item;
      // }
      var href = $(this).attr("href");

      // ✅ Only process internal anchors (e.g., "#abt1")
      if (href && href.startsWith("#")) {
        var item = $(href);
        if (item.length) {
          return item;
        }
      }

      // ❌ Skip external links
      return null;
    });
  // For Ipad click issue
  // if (is_iPad) {
  //   menuItems.on("touchstart", function (e) {
  //     var href = $(this).attr("href"),
  //       offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
  //     $("html, body").stop().animate(
  //       {
  //         scrollTop: offsetTop,
  //       },
  //       600
  //     );
  //     e.preventDefault();
  //   });
  // } else {
  //   menuItems.on("click", function (e) {
  //     var href = $(this).attr("href"),
  //       offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
  //     $("html, body").stop().animate(
  //       {
  //         scrollTop: offsetTop,
  //       },
  //       600
  //     );
  //     e.preventDefault();
  //   });
  // }

  if (is_iPad) {
    menuItems.on("touchstart", function (e) {
      var href = $(this).attr("href");

      // ✅ Only allow anchor links (not full URLs)
      if (href && href.startsWith("#")) {
        var offsetTop =
          href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;

        $("html, body").stop().animate(
          {
            scrollTop: offsetTop,
          },
          600
        );
        e.preventDefault();
      }
    });
  } else {
    menuItems.on("click", function (e) {
      var href = $(this).attr("href");

      // ✅ Only allow anchor links (not full URLs)
      if (href && href.startsWith("#")) {
        var offsetTop =
          href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;

        $("html, body").stop().animate(
          {
            scrollTop: offsetTop,
          },
          600
        );
        e.preventDefault();
      }
    });
  }

  $(window).scroll(function () {
    var fromTop = $(this).scrollTop() + topMenuHeight;
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop) return this;
    });
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      menuItems
        .removeClass("active")
        .filter("[href='#" + id + "']")
        .addClass(function () {
          tabsWidthScroll();
          return "active";
        });
    }
  });

  // For Mobile Scroll to nav
  function tabsWidthScroll() {
    var tstW = 0;
    setTimeout(function () {
      $(
        ".secondary-nav ul li a.active, .secondary-nav .m-scroll ul li a.active"
      )
        .parent()
        .prevAll()
        .each(function () {
          tstW += $(this).outerWidth(true);
        });
      $(".secondary-nav, .m-scroll").animate(
        {
          scrollLeft: tstW,
        },
        500
      );
    }, 400);
  }

  if ($(window).width() < 900) {
    var ulWidth = 0;
    var ulWidth2 = 0;
    $(".secondary-nav .nav li").each(function () {
      ulWidth = ulWidth + 10 + $(this).outerWidth(true);
    });
    $(".secondary-nav .nav").width(ulWidth);
  }

  if ($(window).width() <= 900) {
    var ulWidth2 = 0;
    $(".listing-tabs-wrap .listing-tabs a").each(function () {
      ulWidth2 = ulWidth2 + 20 + $(this).outerWidth(true);
    });
    $(".listing-tabs-wrap .listing-tabs").width(ulWidth2);
  }

  $(".input-group-prepend .dropdown-menu a").click(function () {
    $(this)
      .parent()
      .prev(".dropdown-toggle:first-child")
      .html($(this).html() + ' <span class="caret"></span>');
  });

  $(".view-all-dd a.dropdown-item").click(function () {
    $(".view-all .text-val").text($(this).text());
    return false;
  });

  //accordian
  $(".tog_cont").hide();
  $(".trgr:eq(0)").addClass("act").next().show();
  $(".trgr").on("click", function () {
    if ($(this).next().is(":hidden")) {
      $(".trgr").removeClass("act").next().slideUp(500);
      $(this)
        .addClass("act")
        .next()
        .slideDown(400, function () {
          // scroll top When you expand other accordions
          $("html, body").animate(
            {
              scrollTop: $(this).offset().top - 300,
            },
            700
          );
        });
    } else {
      $(this).removeClass("act").next().slideUp(500);
    }
  });

  $(".lp-carousel").owlCarousel({
    nav: true,
    dots: true,
    autoplay: false,

    loop: true,
    autoplayTimeout: 7000,
    autoplayHoverPause: true,
    autoplaySpeed: 1500,
    smartSpeed: 1500,
    responsiveClass: true,
    items: 1,

    responsive: {
      0: {
        margin: 30,
        stagePadding: 0,
        dots: false,
        touchDrag: false,
      },
      1000: {
        margin: 0,
        stagePadding: 0,
        dots: true,
      },
    },
  });

  $(".main-map-box .nav-link").hover(function () {
    $(this).tab("show");
  });



  var $owlportfoliohm = $(".portfolio-carousel.hm");
  $owlportfoliohm.children().each(function (index) {
    $(this).attr("data-position", index); // NB: .attr() instead of .data()
  });

  $owlportfoliohm.owlCarousel({
    center: true,
    loop: true,
    //items: 5,
    //autoWidth:true,
    margin: 20,
    touchDrag: false,
    mouseDrag: false,
    responsive: {
      0: {
        dots: false,
        stagePadding: 50,
        margin: 15,
        items: 1,
        touchDrag: true,
        mouseDrag: true,
      },
      //600: {
      //items: 1,
      //margin: 20,
      //touchDrag: false,
      //mouseDrag: false,
      //},
      768: {
        items: 5,
        margin: 20,
        touchDrag: false,
        mouseDrag: false,
      },
    },
  });

  // $(".portfolio .hm.owl-carousel .owl-item.active.center")
  //   .prev()
  //   .addClass("prevCard");
  // $(document).on("click", ".portfolio .hm .owl-item>div", function () {
  //   var $speed = 300; // in ms
  //   $owlportfoliohm.trigger("to.owl.carousel", [
  //     $(this).data("position"),
  //     $speed,
  //   ]);
  //   $(".portfolio .hm.owl-carousel .owl-item").removeClass("prevCard");
  //   $(".portfolio .hm.owl-carousel .owl-item.active.center")
  //     .prev()
  //     .addClass("prevCard");
  // });

  setTimeout(function () {
    $(".about-carousel video").trigger("pause");
    $(".about-carousel .owl-item.center video").trigger("play");
  }, 100);

  // home page end

  // copied 26march

  var $owlportfolio = $(".portfolio-carousel");
  // $owlportfolio.children().each(function(index) {
  //     $(this).attr("data-position", index); // NB: .attr() instead of .data()
  // });
  $owlportfolio.on(
    "initialize.owl.carousel changed.owl.carousel",
    function (e) {
      if (!e.namespace) {
        return;
      }
      var carouselPR = e.relatedTarget;
      $(this)
        .next(".slider-counter-port")
        .text(
          carouselPR.relative(carouselPR.current()) +
            1 +
            "/" +
            carouselPR.items().length
        );
    }
  );

  $owlportfolio.owlCarousel({
    center: true,
    loop: true,
    items: 3,
    //autoWidth:true,
    margin: 20,
    responsive: {
      0: {
        dots: false,
        stagePadding: 50,
        margin: 15,
        items: 1,
      },
      600: {
        items: 3,
        margin: 30,
        stagePadding: 10,
      },
      900: {
        items: 3,
        margin: 30,
        stagePadding: 10,
      },
      1400: {
        items: 3,
        margin: 10,
        stagePadding: 0,
      },
    },
  });
  $(".portfolio .owl-carousel .owl-item.active.center")
    .prev()
    .addClass("prevCard");
  $(document).on("click", ".portfolio .owl-item>div", function () {
    var $speed = 300; // in ms
    $owlportfolio.trigger("to.owl.carousel", [
      $(this).data("position"),
      $speed,
    ]);
    $(".portfolio .owl-carousel .owl-item").removeClass("prevCard");
    $(".portfolio .owl-carousel .owl-item.active.center")
      .prev()
      .addClass("prevCard");
  });

  // copied 26march

  // setTimeout(function(){
  //     $('.about-carousel video').trigger('pause');
  //     $('.about-carousel .owl-item.center video').trigger('play');
  // },100);

  var abtCarousel = $(".about-carousel");
  abtCarousel.children().each(function (index) {
    //$(this).attr( 'data-position', index ); // NB: .attr() instead of .data()
  });
  abtCarousel.on("initialize.owl.carousel changed.owl.carousel", function (e) {
    if (!e.namespace) {
      return;
    }
    var carousel = e.relatedTarget;
    $(this)
      .next(".slider-counter")
      .text(
        carousel.relative(carousel.current()) +
          1 +
          "/" +
          carousel.items().length
      );
  });
  abtCarousel.owlCarousel({
    nav: true,
    dots: false,
    margin: 30,
    stagePadding: 160,
    responsiveClass: true,
    items: 1,
    center: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 50,
        margin: 10,
      },
      600: {
        items: 1,
        stagePadding: 80,
        margin: 10,
      },
      1000: {
        items: 1,
        stagePadding: 150,
        margin: 100,
        center: true,
      },
      1300: {
        items: 1,
        stagePadding: 300,
        margin: 130,
        center: true,
      },
      1600: {
        items: 1,
        stagePadding: 300,
        margin: 130,
        center: true,
      },
    },
  });

  abtCarousel.on("changed.owl.carousel", function (event) {
    setTimeout(function () {
      $(".about-carousel video").trigger("pause");
      $(".about-carousel .owl-item.center video").trigger("play");
    }, 100);
  });

  $(document).on("click", ".about-carousel .owl-item>div", function () {
    var $speed = 0; // in ms
    abtCarousel.trigger("to.owl.carousel", [$(this).data("position"), $speed]);
    $(".about-carousel .owl-item video").trigger("pause");
    $(".about-carousel .owl-item.center video").trigger("play");
  });

  setTimeout(function () {
    $(".de-carousel video").trigger("pause");
    $(".de-carousel .owl-item.center video").trigger("play");
  }, 100);

  var deCarousel = $(".de-carousel");
  deCarousel.children().each(function (index) {
    $(this).attr("data-position", index); // NB: .attr() instead of .data()
  });

  deCarousel.owlCarousel({
    nav: true,
    dots: true,
    margin: 65,
    smartSpeed: 0,
    responsiveClass: true,
    items: 1,
    stagePadding: 130,
    //animateOut: "fadeOut",
    animateIn: "fadeIn",
    center: true,
    loop: false,
    responsive: {
      0: {
        dots: false,
        stagePadding: 30,
        margin: 30,
        nav: false,
      },
      600: {
        items: 1,
      },
      1300: {
        items: 1,
        stagePadding: 200,
      },
      1600: {
        items: 1,
        stagePadding: 260,
        margin: 80,
      },
    },
  });

  deCarousel.on("changed.owl.carousel", function (event) {
    setTimeout(function () {
      $(".de-carousel .owl-item video").trigger("pause");
      $(".de-carousel .owl-item.center video").trigger("play");
    }, 100);
  });

  $(document).on("click", ".de-carousel .owl-item>div", function () {
    var $speed = 0; // in ms
    deCarousel.trigger("to.owl.carousel", [$(this).data("position"), $speed]);
    $(".de-carousel .owl-item video").trigger("pause");
    $(".de-carousel .owl-item.center video").trigger("play");
    return false;
  });

  $(".de-carousel .owl-prev").click(function () {
    $(".de-carousel .owl-item video").trigger("pause");
    $(".de-carousel .owl-item.center video").trigger("play");
  });
  $(".de-carousel .owl-next").click(function () {
    $(".de-carousel .owl-item video").trigger("pause");
    $(".de-carousel .owl-item.center video").trigger("play");
  });
});

//MAde by Vishal
$(document).ready(function () {
  $(".ip-carousel").owlCarousel({
    nav: true,
    dots: true,
    responsiveClass: true,
    items: 1,
    stagePadding: 10,
    margin: 15,
    responsive: {
      0: {
        nav: false,
        dots: false,
        stagePadding: 30,
        margin: 15,
      },
      600: {
        items: 1,
      },
    },
  });

  if ($(window).width() < 768) {
    $(".contact-us .hd2").on("click", function () {
      if ($(this).next().is(":hidden")) {
        $(this).addClass("act").next().slideDown(400);
      } else {
        $(this)
          .next()
          .slideUp(400, function () {
            $(this).prev().removeClass("act");
          });
      }
    });
  }

  // page Product

  $(".filter-list .dropdown-menu").on("click", function (event) {
    // The event won't be propagated up to the document NODE and
    // therefore delegated events won't be fired
    console.log("click");
    event.stopPropagation();
  });

  // $('#datetimepicker2').datetimepicker({
  //     // format: "dd MM yyyy"
  //     todayHighlight: true,
  //     format: "dd-mm-yyyy",
  //     autoclose: true
  //         // ,
  //         // viewMode: "months",
  //         // minViewMode: "months"
  // });

  $(function () {
    $(".cls-cnt a").click(function () {
      console.log("click");
      $(this).parents(".enqForm").fadeOut();
      $(".hero-banner").removeClass("formAdded");
    });

    // Click top go top of the form
    $(
      ".fIxEd_botm_Mob .enquire-now, .ftr-enquire.enquire-now, .btn-box.enquire-now.op1"
    ).on("click", function () {
      $("html, body").animate(
        {
          scrollTop: $("html, body").offset().top,
        },
        400
      );
      $(".hero-banner .enqForm").fadeIn();
      $(".hero-banner").addClass("formAdded");
    });

    $(".hero-banner .enquire-now").click(function () {
      $(".hero-banner .enqForm").fadeIn();
      $(".hero-banner").addClass("formAdded");
    });
  });

  $(".contact-us .requestBtn").click(function () {
    $(".footer-form .enqForm").fadeIn();
    $(this).hide();
  });

  $(".footer-form .cls-cnt").click(function () {
    $(".contact-us .requestBtn").show();
  });

  $('input[name="bookSiteRadio"]').click(function () {
    var inputValue = $(this).attr("value");
    if (inputValue == "no") {
      $(".dateCntBookSite").hide();
    } else {
      $(".dateCntBookSite").show();
    }
  });

  $(".blog-carousel").owlCarousel({
    nav: true,
    dots: true,
    autoplay: false,
    autoplayTimeout: 9000,
    autoplayHoverPause: true,
    autoplaySpeed: 1500,
    smartSpeed: 1500,
    responsiveClass: true,
    items: 1,
    responsive: {
      0: {
        nav: false,
        dots: true,
      },
      600: {
        nav: true,
        dots: false,
      },
      1000: {
        nav: true,
        dots: false,
      },
    },
  });

  var blogDetails = $(".details-carousel");
  blogDetails.owlCarousel({
    nav: true,
    dots: true,
    autoplay: false,
    autoplayTimeout: 9000,
    autoplayHoverPause: true,
    smartSpeed: 1500,
    responsiveClass: true,
    items: 1,
    loop: false,
    responsive: {
      0: {
        nav: false,
      },
      600: {
        nav: true,
      },
      1000: {
        nav: true,
      },
    },
  });

  // blogDetails.on('change.owl.carousel', function (property) {
  //     var current = property.item.index;
  //     var src = $(property.target).find(".owl-item").eq(current).find(".bgImg").attr('src');
  //     //console.log('Image current is ' + src);
  //     $('.details-img-box').css("background-image", "url(" + src + ")");
  // });

  var relatedStory = $(".related-carousel");
  relatedStory.owlCarousel({
    nav: true,
    dots: true,
    margin: 30,
    smartSpeed: 1500,
    responsiveClass: true,
    items: 2,
    loop: false,
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        nav: false,
      },
      600: {
        items: 1,
      },
      1300: {
        items: 2,
      },
    },
  });

  $(".life-list li .hd3").hover(
    function () {
      $(this).next().removeClass("hide");
    },
    function () {
      $(this).next().addClass("hide");
    }
  );

  $(".list-cont").hide();
  $(".trgr-list:eq(0)").addClass("act").next().show();
  //$(".benefits .trgr-list:eq(0)").addClass("act").next().show();
  $(".trgr-list").click(function () {
    if ($(this).next().is(":hidden")) {
      $(".trgr-list").removeClass("act").next().slideUp("slow");
      $(this).addClass("act").next().slideDown("slow");
      return false;
    } else {
      $(this).removeClass("act").next().slideUp("slow");
      return false;
    }
  });

  $(".core-value-list a").hover(function () {
    $(this).tab("show");
  });

  var careerCarousel = $(".career-carousel");
  careerCarousel.children().each(function (index) {
    $(this).attr("data-position", index); // NB: .attr() instead of .data()
  });

  careerCarousel.owlCarousel({
    nav: true,
    dots: true,
    margin: 65,
    responsiveClass: true,
    items: 1,
    stagePadding: 130,
    //animateOut: "fadeOut",
    animateIn: "fadeIn",
    center: true,
    loop: true,
    responsive: {
      0: {
        dots: false,
        stagePadding: 30,
        margin: 30,
        nav: false,
      },
      600: {
        items: 1,
      },
      1300: {
        items: 1,
        stagePadding: 200,
      },
      1600: {
        items: 1,
        stagePadding: 260,
        margin: 80,
      },
    },
  });

  $(document).on("click", ".career-carousel .owl-item>div", function () {
    var $speed = 0; // in ms
    careerCarousel.trigger("to.owl.carousel", [
      $(this).data("position"),
      $speed,
    ]);
    return false;
  });

  // ticker by Ankit
  var aboutTickerTC2 = $(".ticker-carousel.TC2");
  aboutTickerTC2.owlCarousel({
    nav: false,
    dots: true,
    rtl: true,
    margin: 10,
    smartSpeed: 2000,
    autoplay: true,
    responsiveClass: true,
    stagePadding: 120,
    loop: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        margin: 10,
      },
      600: {
        items: 2,
        stagePadding: 30,
        margin: 10,
      },
      1000: {
        items: 2,
      },
      1300: {
        items: 3,
      },
      1600: {
        items: 4,
      },
    },
  });
 
  var aboutTicker = $(".ticker-carousel");
  aboutTicker.owlCarousel({
    nav: false,
    dots: true,
    margin: 30,
    smartSpeed: 2000,
    autoplay: true,
    responsiveClass: true,
    stagePadding: 120,
    loop: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        margin: 10,
      },
      600: {
        items: 2,
        stagePadding: 30,
        margin: 15,
      },
      1000: {
        items: 2,
      },
      1300: {
        items: 3,
      },
      1600: {
        items: 4,
      },
    },
  });

  var csrCarousel = $(".csr-carousel");
  csrCarousel.children().each(function (index) {
    $(this).attr("data-position", index); // NB: .attr() instead of .data()
  });
  csrCarousel.on("initialize.owl.carousel changed.owl.carousel", function (e) {
    if (!e.namespace) {
      return;
    }
    var carousel = e.relatedTarget;
    $(this)
      .next(".slider-counter")
      .text(
        carousel.relative(carousel.current()) +
          1 +
          "/" +
          carousel.items().length
      );
  });
  csrCarousel.owlCarousel({
    nav: true,
    dots: false,
    margin: 30,
    responsiveClass: true,
    items: 1,
    center: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        margin: 10,
      },
      600: {
        items: 1,
        stagePadding: 120,
      },
      1000: {
        items: 1,
        stagePadding: 150,
        margin: 50,
        center: true,
      },
      1300: {
        items: 1,
        stagePadding: 200,
        margin: 50,
        center: true,
      },
      1600: {
        items: 1,
        stagePadding: 260,
        margin: 50,
        center: true,
      },
    },
  });
  $(document).on("click", ".csr-carousel .owl-item>div", function () {
    var $speed = 0; // in ms
    csrCarousel.trigger("to.owl.carousel", [$(this).data("position"), $speed]);
  });

  // $('.bm-card a').click(function(){
  //     $('.bm-popup').addClass('open')
  //     return false
  // });

  $(".bm-card a").click(function () {
    $(".bm-popup").addClass("open");

    $(".bm-carousel .member-info").each(function () {
      if ($(this).height() > 380) {
        $(this).addClass("active");
      }
      //console.log($(this).height(), 'hr');
    });

    return false;
  });

  $(".bm-popup .close-button").click(function () {
    $(".bm-popup").removeClass("open");
    return false;
  });

  var bmCarousel = $(".bm-carousel");
  bmCarousel.owlCarousel({
    nav: true,
    dots: false,
    items: 1,
    loop: false,
    margin: 10,
  });

  // $('.bm-card a').click(function () {
  //   var slideNumber = $(this).data('id');
  //   setTimeout(function () {
  //     bmCarousel.trigger('to.owl.carousel', [slideNumber, 0, true]);
  //   }, 100)
  // });

  $(".bm-card a").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#abt3").offset().top - 20, //#DIV_ID is an example. Use the id of your destination on the page
      },
      "slow"
    );
    var slideNumber = $(this).data("id");
    setTimeout(function () {
      bmCarousel.trigger("to.owl.carousel", [slideNumber, 0, true]);
    }, 100);
  });

  var laTicker = $(".la-carousel");
  laTicker.owlCarousel({
    nav: true,
    dots: true,
    margin: 30,
    smartSpeed: 2000,
    autoplay: false,
    responsiveClass: true,
    stagePadding: 120,
    loop: false,
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        margin: 10,
      },
      600: {
        items: 2,
        stagePadding: 40,
      },
      1000: {
        items: 3,
        stagePadding: 45,
      },
      1300: {
        items: 3,
        stagePadding: 130,
      },
      1400: {
        items: 3,
        stagePadding: 160,
      },
      1600: {
        items: 3,
        stagePadding: 190,
      },
      1800: {
        items: 3,
        stagePadding: 320,
      },
    },
  });
});

$(function () {
  jQuery(".counter").counterUp({
    delay: 10,
    time: 1000,
  });
  $("#datetimepicker2").datetimepicker({
    allowInputToggle: true,
    showClose: true,
    format: "DD MMM, YYYY - HH:mm",
  });
  $("#datetimepicker1").datetimepicker({
    allowInputToggle: true,
    showClose: true,
    format: "DD MMM, YYYY - HH:mm",
  });

  //  $(".VIEW4BHk_drop li").click(function() {
  //     var texInputValue = $(this);
  //     $('.VIEW4BHk_btn').html(texInputValue);
  //     $('.VIEW4BHk_drop').removeClass('show_drop');
  //     return false;
  //    // show the text input value in the UI
  //    $('.VIEW4BHk_btn').append(texInputValue);
  // });
  $(".VIEW4BHk_btn").click(function () {
    $(".VIEW4BHk_drop ").toggleClass("show_drop");
    if (".VIEW4BHk_drop" + ".show_drop") {
      $(".VIEW4BHk_drop").show();
    } else {
      $(".VIEW4BHk_drop").hide();
    }
  });
  // floorplan
  jQuery(".floor_apart li").on("click", function () {
    var label = jQuery(this).attr("data-label");
    jQuery(".floor_drop_top span").html(label);
    $(this).parent().hide();
    var id = "#" + label.replace(/ /g, "");
    jQuery(id).siblings().removeClass("active");
    jQuery(id).addClass("active");
  });
  jQuery(".floor_drop_top").click(function () {
    jQuery(this).siblings(".floor_apart").slideToggle();
  });
  jQuery(".floorplan_drop .nav-link").click(function () {
    jQuery(this).addClass("active");
    jQuery(this).siblings().removeClass("active");
  });
  jQuery(".floorplan_drop  .nav-link").on("click", function () {
    var label = jQuery(this).attr("data-label");
    var id = "#" + label.replace(/ /g, "");
    jQuery(id).siblings().removeClass("active");
    jQuery(id).addClass("active");
  });
  // floorplan
  jQuery("ul.VIEW4BHk_drop li").on("click", function () {
    var label = jQuery(this).attr("data-label");
    jQuery(".VIEW4BHk_btn").html(label);
    $(".VIEW4BHk_drop").removeClass("show_drop");
    var id = "#" + label.replace(/ /g, "");
    jQuery(id).siblings().removeClass("active");
    jQuery(id).addClass("active");
    // view more btn
    jQuery(".pc-info .read-more").attr("href", id);
  });
});
$(document).ready(function () {
  $(".high_pro").hover(function () {
    $(this).addClass("bg_img");
    $(this).parent().siblings().children().removeClass("bg_img");
  });
  $(".view-project .read-more").click(function () {
    $(this).parent().siblings().toggleClass("show_more");
  });
  // -------
  $(".read-more").click(function () {
    var Urlhref = jQuery(this).attr("href");
    window.location.replace(Urlhref);
  });
  // -----------
  // floorplan script
  $(".floor_drop_top").click(function () {
    $(this).parent().toggleClass("active");
    $(this).parent().siblings().removeClass("active");
  });
  $("#edit-bookvisit-yes").click(function () {
    $(".dateCntBookSite").css("display", "block");
  });
  $("#edit-bookvisit-no").click(function () {
    $(".dateCntBookSite").css("display", "none");
  });
  // footer form
});

$(document).ready(function () {
  //  $('#audio-control').click(function() {
  //     if ($(".responsive-video").prop('muted')) {
  //         $(".responsive-video").prop('muted', false);
  //         $('.icon-soundoff').addClass('act')
  //             //$(this).text('Mute');
  //             // or toggle class, style it with a volume icon sprite, change background-position
  //     } else {
  //         $(".responsive-video").prop('muted', true);
  //         //$(this).text('Unmute');
  //         $('.icon-soundoff').removeClass('act')
  //     }
  //     alert('ankit')
  // });

  $("#v-pills-tab1 .nav-link:first-child").addClass("active");
  $(".VIEW4BHk_btn").click(function () {
    $(this).toggleClass("rotate");
  });

  $(".show-more3").click(function () {
    $(".text3").toggleClass("show-more-height3");
  });
  $(".show-more4").click(function () {
    $(".text4").toggleClass("show-more-height4");
  });

  $(".show-more5").click(function () {
    $(".text5").toggleClass("show-more-height5");
  });

  $(".show-more6").click(function () {
    $(".text6").toggleClass("show-more-height6");
  });
  var mediaCover = $(".Media-Coverage");
  $(".share-blog").append(mediaCover);

  var Skity = $("#BdTaIlE #enq_form");
  $("#BdTaIlE .enqFormModal .container").append(Skity);

  $(".popup-youtube").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  $(".play-icon").click(function () {
    var youtubeUrl = $(this).attr("href");
    $(".mfp-iframe-holder .mfp-iframe").attr("src", youtubeUrl);
  });
  $(".play-icon-title").click(function () {
    var youtubeUrl = $(this).attr("href");
    $(".mfp-iframe-holder .mfp-iframe").attr("src", youtubeUrl);
  });
});

function graph_load(colorr, colorVall, dataId) {
  var color = ["#eeede8", "#b6b6b6", "#9c6d41", "#6d4a2a", "#e1bb80"];
  var colorVal = [];
  jQuery("ul.sh-list1 li")
    .unbind()
    .each(function () {
      var cc = jQuery(this).attr("data-color");
      var ccVal = jQuery(this).attr("data-value");
      //color.push(cc);
      colorVal.push({ y: ccVal });
    });
  //console.log(colorVal);
  CanvasJS.addColorSet("greenShades", [
    "#eeede8",
    "#b6b6b6",
    "#9c6d41",
    "#6d4a2a",
    "#e1bb80",
  ]);
  CanvasJS.addColorSet("greenShades2", [
    "#eeede8",
    "#b6b6b6",
    "#9c6d41",
    "#6d4a2a",
    "#e1bb80",
  ]);
  CanvasJS.addColorSet("greenShades3", [
    "#eeede8",
    "#b6b6b6",
    "#9c6d41",
    "#6d4a2a",
    "#e1bb80",
  ]);
  CanvasJS.addColorSet("greenShades4", [
    "#eeede8",
    "#b6b6b6",
    "#9c6d41",
    "#6d4a2a",
    "#e1bb80",
  ]);

  var chart = new CanvasJS.Chart("chartContainer1", {
    theme: "light2",
    colorSet: "greenShades",
    animationEnabled: true,
    title: {
      // text: "Shares of Electricity Generation by Fuel"
    },
    subtitles: [
      {
        // text: "United Kingdom, 2016",
        fontSize: 16,
      },
    ],
    data: [
      {
        type: "pie",
        indexLabelFontSize: 18,
        radius: 140,
        indexLabel: "{y}",
        yValueFormatString: '###0.00"%"',
        click: explodePie,
        dataPoints: colorVal,
      },
    ],
  });
  chart.render();

  var chart2 = new CanvasJS.Chart("chartContainer2", {
    theme: "light2",
    colorSet: "greenShades2",
    animationEnabled: true,
    title: {
      // text: "Shares of Electricity Generation by Fuel"
    },
    subtitles: [
      {
        // text: "United Kingdom, 2016",
        fontSize: 16,
      },
    ],
    data: [
      {
        type: "pie",
        indexLabelFontSize: 18,
        radius: 140,
        indexLabel: "{y}",
        yValueFormatString: '###0.00"%"',
        click: explodePie,
        dataPoints: colorVall,
      },
    ],
  });
  chart2.render();

  var chart3 = new CanvasJS.Chart("chartContainer3", {
    theme: "light2",
    colorSet: "greenShades3",
    animationEnabled: true,
    title: {
      // text: "Shares of Electricity Generation by Fuel"
    },
    subtitles: [
      {
        // text: "United Kingdom, 2016",
        fontSize: 16,
      },
    ],
    data: [
      {
        type: "pie",
        indexLabelFontSize: 18,
        radius: 140,
        indexLabel: "{y}",
        yValueFormatString: '###0.00"%"',
        click: explodePie,
        dataPoints: colorVall,
      },
    ],
  });
  chart3.render();

  var chart4 = new CanvasJS.Chart("chartContainer4", {
    theme: "light2",
    colorSet: "greenShades4",
    animationEnabled: true,
    title: {
      // text: "Shares of Electricity Generation by Fuel"
    },
    subtitles: [
      {
        // text: "United Kingdom, 2016",
        fontSize: 16,
      },
    ],
    data: [
      {
        type: "pie",
        indexLabelFontSize: 18,
        radius: 140,
        indexLabel: "{y}",
        yValueFormatString: '###0.00"%"',
        click: explodePie,
        dataPoints: colorVall,
      },
    ],
  });
  chart4.render();

  function explodePie(e) {
    for (var i = 0; i < e.dataSeries.dataPoints.length; i++) {
      if (i !== e.dataPointIndex) e.dataSeries.dataPoints[i].exploded = false;
    }
  }
}
function graph_load_ajax() {
  var container_value = $("#container_value_1").val();
  var container_valueArray = container_value.split(",");
  var colorVal = [];
  $.each(container_valueArray, function (k, v) {
    colorVal.push({ y: v });
  });
  var chart2 = new CanvasJS.Chart("chartContainer1", {
    theme: "light2",
    colorSet: "greenShades2",
    animationEnabled: true,
    title: {
      // text: "Shares of Electricity Generation by Fuel"
    },
    subtitles: [
      {
        // text: "United Kingdom, 2016",
        fontSize: 16,
      },
    ],
    data: [
      {
        type: "pie",
        indexLabelFontSize: 18,
        radius: 140,
        indexLabel: "{y}",
        yValueFormatString: '###0.00"%"',
        dataPoints: colorVal,
      },
    ],
  });
  chart2.render();
}
$(document).ready(function () {
  var carierCrousal = $(".carier-crousal");
  carierCrousal.children().each(function (index) {
    $(this).attr("data-position", index); // NB: .attr() instead of .data()
  });
  carierCrousal.on(
    "initialize.owl.carousel changed.owl.carousel",
    function (e) {
      if (!e.namespace) {
        return;
      }
      var carousel = e.relatedTarget;
      $(this)
        .next(".slider-counter")
        .text(
          carousel.relative(carousel.current()) +
            1 +
            "/" +
            carousel.items().length
        );
    }
  );
  carierCrousal.owlCarousel({
    nav: true,
    dots: true,
    margin: 30,
    responsiveClass: true,
    items: 1,
    center: true,
    loop: false,
    responsive: {
      0: {
        items: 1,
        margin: 0,
        stagePadding: 0,
        dots: true,
      },
      600: {
        items: 1,
        margin: 0,
        stagePadding: 0,
        dots: true,
      },
      1000: {
        items: 1,
        margin: 0,
        stagePadding: 0,
        dots: true,
      },
      1600: {
        items: 1,
        margin: 0,
        stagePadding: 0,
        dots: true,
      },
    },
  });
  $("#CaRiAr span.pafter").click(function () {
    // $('.carier-modal').css('right','0%');
    jQuery(this).siblings(".carier-modal").css("right", "0%");
  });
  $("#CaRiAr .carier-close").click(function () {
    $(".carier-modal").css("right", "-100%");
  });

  // var mediakit = $('.media-kit');
  $(".media-kit").owlCarousel({
    nav: true,
    dots: true,
    autoplay: false,
    autoplayTimeout: 9000,
    autoplayHoverPause: true,
    autoplaySpeed: 1500,
    smartSpeed: 1500,
    responsiveClass: true,
    items: 1,

    responsive: {
      0: {
        margin: 30,
        stagePadding: 0,
        dots: false,
        touchDrag: false,
      },
      1000: {
        margin: 0,
        stagePadding: 0,
        dots: true,
      },
    },
  });

  window.onload = function () {
    var mid = "";
    graph_load();
  };

  jQuery("li.nav-item a").on("click", function () {
    var mid = jQuery(this).attr("href");
    var dataId = jQuery(this).attr("data-id");
    var colorr = ["#eeede8", "#b6b6b6", "#9c6d41", "#6d4a2a", "#e1bb80"];
    var colorVall = [];

    // added tab functionaly for finencial statemnet quarter secton jan 14 26
    jQuery("#financial_row .tab-pane").removeClass("active show");
    jQuery("#financial_row " + mid).addClass("active show");
    // end of comment

    jQuery(mid + " ul.sh-list.sh-list2 li").each(function () {
      var cc1 = jQuery(this).attr("data-color");
      var ccVal1 = jQuery(this).attr("data-value");
      //colorr.push(cc1);
      colorVall.push({ y: ccVal1 });
    });
    jQuery(mid + " ul.sh-list.sh-list3 li").each(function () {
      var cc1 = jQuery(this).attr("data-color");
      var ccVal1 = jQuery(this).attr("data-value");
      //colorr.push(cc1);
      colorVall.push({ y: ccVal1 });
    });
    jQuery(mid + " ul.sh-list.sh-list4 li").each(function () {
      var cc1 = jQuery(this).attr("data-color");
      var ccVal1 = jQuery(this).attr("data-value");
      //colorr.push(cc1);
      colorVall.push({ y: ccVal1 });
    });

    graph_load(colorr, colorVall, dataId);
  });
});

function pi_map(mid = "") {
  //var mid = jQuery(this).attr('href');
  var dataId = jQuery(this).attr("data-id");
  var colorr = ["#eeede8", "#b6b6b6", "#9c6d41", "#6d4a2a", "#e1bb80"];
  var colorVall = [];
  jQuery(mid + " ul.sh-list.sh-list2 li")
    .unbind()
    .each(function () {
      var cc1 = jQuery(this).attr("data-color");
      var ccVal1 = jQuery(this).attr("data-value");
      //colorr.push(cc1);
      colorVall.push({ y: ccVal1 });
    });
  jQuery(mid + " ul.sh-list.sh-list3 li")
    .unbind()
    .each(function () {
      var cc1 = jQuery(this).attr("data-color");
      var ccVal1 = jQuery(this).attr("data-value");
      //colorr.push(cc1);
      colorVall.push({ y: ccVal1 });
    });
  jQuery(mid + " ul.sh-list.sh-list4 li")
    .unbind()
    .each(function () {
      var cc1 = jQuery(this).attr("data-color");
      var ccVal1 = jQuery(this).attr("data-value");
      //colorr.push(cc1);
      colorVall.push({ y: ccVal1 });
    });
  graph_load(colorr, colorVall, dataId);
}

jQuery(document).ready(function () {
  jQuery("h3.hd3.trgr").on("click", function () {
    jQuery(this).addClass("testA");
  });
});
jQuery(document).ready(function () {
  jQuery("h3.hd3.trgr-list").on("click", function () {
    jQuery(this).addClass("test_benifit");
  });
  jQuery("#hide_footer")
    .parents()
    .siblings("#konverse-ref-id")
    .siblings(".footer")
    .hide();
});

//for leding project image change when click on icon

jQuery(document).ready(function () {
  jQuery("#deepakk li a").mouseenter(function () {
    var hre = $(this).attr("href");
    jQuery("#deepakkk .tab-pane").removeClass("active");
    jQuery("#deepakkk .tab-pane" + hre).addClass("active");
  });

  jQuery("#skydeepakk li a").mouseenter(function () {
    var hre = $(this).attr("href");
    jQuery("#skydeepakkk .tab-pane").removeClass("active");
    jQuery("#skydeepakkk .tab-pane" + hre).addClass("active");
  });

  jQuery("#sixtydeepakk li a").mouseenter(function () {
    var hre = $(this).attr("href");
    jQuery("#sixtydeepakkk .tab-pane").removeClass("active");
    jQuery("#sixtydeepakkk .tab-pane" + hre).addClass("active");
  });

  // mobile

  jQuery("#mdeepakk li a").mouseenter(function () {
    var hre = $(this).attr("href");
    jQuery("#mdeepakkk .tab-pane").removeClass("active");
    jQuery("#mdeepakkk .tab-pane" + hre).addClass("active");
  });

  jQuery("#skymdeepakk li a").mouseenter(function () {
    var hre = $(this).attr("href");
    jQuery("#skymdeepakkk .tab-pane").removeClass("active");
    jQuery("#skymdeepakkk .tab-pane" + hre).addClass("active");
  });

  jQuery("#sixtymdeepakk li a").mouseenter(function () {
    var hre = $(this).attr("href");
    jQuery("#sixtymdeepakkk .tab-pane").removeClass("active");
    jQuery("#sixtymdeepakkk .tab-pane" + hre).addClass("active");
  });

  // jQuery(".project-section .owl-nav button").click(function(){
  //   var hre1 = $(".project-section .owl-item.active .pin1 a").attr("href",);
  //   jQuery(".project-section .owl-item.active .tab-pane").removeClass("active");
  //   jQuery(".project-section .owl-item.active .tab-pane" + hre1).addClass("active");
  // });
});

jQuery(document).ready(function () {
  jQuery(".filter-list .dropdown-menu-right .dropdown-item").click(function () {
    jQuery(".filter-list .dropdown-menu-right").removeClass("show");
  });
});

jQuery(document).ready(function () {
  jQuery("#audio-control").click(function () {
    if (jQuery("#myVideo").prop("muted")) {
      jQuery("#myVideo").prop("muted", false);
      jQuery(".icon-soundoff").addClass("act1");
      //$(this).text('Mute');
      // or toggle class, style it with a volume icon sprite, change background-position
    } else {
      jQuery("#myVideo").prop("muted", true);
      //$(this).text('Unmute');
      jQuery(".icon-soundoff").removeClass("act1");
    }
  });
  $(window).scroll(function () {
    var scroll1 = $(window).scrollTop();
    var bnrht = $(".hero-banner").height();
    if (scroll1 <= bnrht) {
      // jQuery(".icon-soundoff").addClass("act1");
      // jQuery("#myVideo").prop('muted', false);
    } else {
      jQuery(".icon-soundoff").removeClass("act1");
      jQuery("#myVideo").prop("muted", true);
    }
  });
});

jQuery(document).ready(function () {
  jQuery(".read-more.show-more").click(function () {
    //jQuery(".show-more-height, .show-more-height2, .show-more-height3, .show-more-height4, .show-more-height5").css("height","auto");
    jQuery(this)
      .parents()
      .prev(
        ".show-more-height, .show-more-height2, .show-more-height3, .show-more-height4, .show-more-height5"
      )
      .css("max-height", "unset");
  });
});

// dcd new-menu

var $owl_mbl = $(".new-mbl-menu-main");

$owl_mbl.children().each(function (index) {
  $(this).attr("data-position", index); // NB: .attr() instead of .data()
});

$owl_mbl.owlCarousel({
  center: true,
  loop: false,
  margin: 5,
  //autoWidth:true,
  items: 2,
});

$(document).on("click", ".owl-item>div", function () {
  var $speed = 300; // in ms
  $owl_mbl.trigger("to.owl.carousel", [$(this).data("position"), $speed]);
});
//jQuery(".new-mbl-menu-main .owl-stage").append(" <div class='owl-item'><div></div></div> ");

jQuery(document).ready(function () {
  $(".new-mbl-menu a").click(function () {
    var new_mbl_menu = jQuery(this).attr("data-target");
    if ($(this).hasClass("active")) {
      jQuery(".new-mbl-menu a").removeClass("active");
      jQuery(".new-mbl-sub-menu").removeClass("show");
    } else {
      jQuery(".new-mbl-sub-menu.show").removeClass("show");
      jQuery(".new-mbl-menu a.active").removeClass("active");

      jQuery(".new-mbl-sub-menu" + new_mbl_menu).addClass("show");
      jQuery(this).addClass("active");
      //alert(new_mbl_menu);
    }
    //return false;
  });
  jQuery(".new-mbl-menu-main .owl-stage").css(
    "transform",
    "translate3d(0px, 0px, 0px)"
  );
});

jQuery(document).ready(function () {
  $(".new-mbl-sub-menu li").click(function () {
    if ($(this).hasClass("active")) {
      jQuery(".new-mbl-sub-menu li").removeClass("active");
    } else {
      jQuery(".new-mbl-sub-menu li.active").removeClass("active");
      jQuery(this).addClass("active");
    }
  });
});

//dcd new-menu cls

jQuery(document).ready(function () {
  jQuery(".HomeCTALink").click(function () {
    jQuery(".hero-banner").find("video").parents().css("height", "unset");
    setTimeout(function () {
      jQuery(".hero-banner").removeClass("formAdded");
    }, 1000);
  });
});

//for lazy load
window.lazyLoadOptions = {
  elements_selector: ".lazy",
};

$(document).ready(function () {
  $("#arrowBtn").on("click", function () {
    $(this).toggleClass("rotate"); // rotate arrow
    $("#footerDiv").slideToggle(300, function () {
      // add/remove margin only when visible
      if ($(this).is(":visible")) {
        $(this).addClass("with-margin");
      } else {
        $(this).removeClass("with-margin");
      }
    });
  });
});

document.querySelectorAll(".tab-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // remove active
    document
      .querySelectorAll(".tab-link")
      .forEach((l) => l.classList.remove("active"));
    document
      .querySelectorAll(".tab-pane-custom")
      .forEach((c) => c.classList.remove("active"));

    // activate clicked
    this.classList.add("active");
    let target = document.querySelector(this.getAttribute("data-target"));
    target.classList.add("active");

    // align content vertically with clicked tab
    let offset =
      this.getBoundingClientRect().top -
      this.closest(".row").getBoundingClientRect().top;
    target.style.top = offset + "px";
  });
});
