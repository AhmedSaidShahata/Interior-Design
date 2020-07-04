//------------------------------------------------- PRE LOADER-----------------------------------------------------

let win = $(window);
win.on("resize", function () {
  if (win.width() <= 920) {
    $(".cube").prepend($(".contact_us").addClass("responsive_contact"));
  } else {
    $(".menu .navbar-brand").after(
      $(".contact_us").removeClass("responsive_contact")
    );
  }
});
//--------------------------------------------------Start Preload---------------------------------------------------------
$(window).on("load", function () {
  $(".cube_container_loading").fadeOut(2000);
});
//-----------------------------------------------Start Sticky Navbar-------------------------------------------------

$(window).scroll(function () {
  var scroling = $(window).scrollTop();
  if (scroling > 100) {
    $(".menu").addClass("navbar-scroll");

  } else {
    $(".menu").removeClass("navbar-scroll");
  }
});



$(document).ready(function () {
  //------------------------------------------------ Start Navbar---------------------------------------------------

  $("body").on("click", ".nav-toggle.closed", function (e) {
    e.preventDefault();
    var pageDiv = $(".page");
    navCube = $(".nav-cube");
    var closeSwitch = $(this);
    closeSwitch.addClass("opened");
    closeSwitch.removeClass("closed");
    closeSwitch.data("cube-target", ".nav-cube");
    pageDiv.addClass("open");
    navCube.addClass("transform");
    $(this).html("<i class='fas fa-times'></i>");
  });

  $("body").on("click", ".nav-toggle.opened", function (e) {
    e.preventDefault();
    var pageDiv = $(".page");
    $(this).removeClass("opened").addClass("closed");
    pageDiv.removeClass("open");
    navCube.removeClass("transform");
    $(this).html("<i class='fas fa-bars'></i>");
  });

    //--------------------------------------------- Start Animate to Sections-------------------------------------

    $(".nav-cube ul li  a").click(function () {
      $("html , body").animate(
          {
              scrollTop: $("#" + $(this).data("scroll")).offset().top - 100,
          },
          1000
      );
  });


  var scrolltotoptop = $(".tri");

  $(window).scroll(function () {
      $("section").each(function () {
          if ($(window).scrollTop() > $(this).offset().top - 400) {
              var secion_id = $(this).attr("id");

              $(
                  ".nav-cube ul li  a[data-scroll='" + secion_id + "']"
              ).addClass("active");

              $(".nav-cube ul li  a[data-scroll='" + secion_id + "']")
                  .parent()
                  .siblings()
                  .children()
                  .removeClass("active");
          }
      });

  //-------------------------------------- Start Fade btn to top show and hidden-----------------------------------

      // if ($(window).scrollTop() > 1000) {
      //     scrolltotoptop.fadeIn();
      // } else {
      //     scrolltotoptop.fadeOut();
      // }
  });

  scrolltotoptop.click(function (e) {
      e.preventDefault();

      $("html , body ").animate(
          {
              scrollTop: 0,
          },
          1000
      );
  });



  //---------------------------------------------- Start Slider---------------------------------------------------

  var $slider = $(".slider"),
    $slideBGs = $(".slide__bg"),
    diff = 0,
    curSlide = 0,
    numOfSlides = $(".slide").length - 1,
    animating = false,
    animTime = 500,
    autoSlideTimeout,
    autoSlideDelay = 6000,
    $pagination = $(".slider-pagi");

  function createBullets() {
    for (var i = 0; i < numOfSlides + 1; i++) {
      var $li = $("<li class='slider-pagi__elem'></li>");
      $li.addClass("slider-pagi__elem-" + i).data("page", i);
      if (!i) $li.addClass("active");
      $pagination.append($li);
    }
  }

  createBullets();

  function autoSlide() {
    autoSlideTimeout = setTimeout(function () {
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 0;
      changeSlides();
    }, autoSlideDelay);
  }

  autoSlide();

  function changeSlides() {
    $slider.addClass("animating");
    $slider.css("top");
    $(".slide").removeClass("active");
    $(".slide-" + curSlide).addClass("active");

    setTimeout(function () {
      $slider.removeClass("animating");
      animating = false;
    }, animTime);

    window.clearTimeout(autoSlideTimeout);
    $(".slider-pagi__elem").removeClass("active");
    $(".slider-pagi__elem-" + curSlide).addClass("active");
    $slider.css("transform", "translate3d(" + -curSlide * 100 + "%,0,0)");
    $slideBGs.css("transform", "translate3d(" + curSlide * 50 + "%,0,0)");
    diff = 0;
    autoSlide();
  }

  function navigateLeft() {
    if (curSlide > 0) curSlide--;
    changeSlides();
  }

  function navigateRight() {
    if (curSlide < numOfSlides) curSlide++;
    changeSlides();
  }

  $(document).on("mousedown", ".slider", function (e) {
    window.clearTimeout(autoSlideTimeout);
    var startX = e.pageX,
      winW = $(window).width();
    diff = 0;

    $(document).on("mousemove ", function (e) {
      var x = e.pageX;
      diff = ((startX - x) / winW) * 70;

      $slider.css(
        "transform",
        "translate3d(" + (-curSlide * 100 - diff) + "%,0,0)"
      );
      $slideBGs.css(
        "transform",
        "translate3d(" + (curSlide * 50 + diff / 2) + "%,0,0)"
      );
    });
  });

  $(document).on("mouseup touchend", function (e) {
    $(document).off("mousemove touchmove");

    if (diff <= -8) {
      navigateLeft();
    }
    if (diff >= 8) {
      navigateRight();
    }
  });

  $(document).on("click", ".slider-pagi__elem", function () {
    curSlide = $(this).data("page");
    changeSlides();
  });

  // start modal images
  var elem = document.documentElement;

  $(".slide_image").click(function () {
    openFullscreen();
    function openFullscreen() {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    }

    $(".openImagesModal").click();

    imageTarget = $(this).children("img");

    imageTargetSrc = imageTarget.data("3d");

    $("#imagesModal .modal-body iframe").attr("src", imageTargetSrc);
  });

  // start btn next control

  $("#imagesModal .modal-body .next").click(function () {
    let nextImage = imageTarget.parent().next().children("img");
    imageTarget = nextImage;
    $("#imagesModal .modal-body iframe").attr("src", imageTarget.data("3d"));

    if (imageTarget.parent().is(":last-child")) {
      $(".next").hide();
      $(".prev").show();
    } else {
      $(".next").show();
      $(".prev").show();
    }
  });

  // start btn prev control

  $("#imagesModal .modal-body .prev").click(function () {
    let nextImage = imageTarget.parent().prev().children("img");
    imageTarget = nextImage;
    $("#imagesModal .modal-body iframe").attr("src", imageTarget.data("3d"));

    if (imageTarget.parent().is(":first-child")) {
      $(".prev").hide();
      $(".next").show();
    } else {
      $(".prev").show();
      $(".next").show();
    }
  });

  // start close modal images
  $("#imagesModal .close").click(function () {
    closeFullscreen();

    function closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  });
});

// ------------------------------------------------ Start Animate Elements --------------------------------------

$(window).on("scroll", function () {
  if ($(window).scrollTop() + 600 >= $(".services").offset().top) {
    $(".services_content").css({
      opacity: 1,
      top: 0,
    });
  }

  if ($(window).scrollTop() + 500 >= $(".description1").offset().top) {
    $(".description1").animate(
      {
        left: 0,
      },
      1000
    );
  }

  if ($(window).scrollTop() + 500 >= $(".description2").offset().top) {
    $(".description2").animate(
      {
        left: 0,
      },
      1000
    );
  }

  if ($(window).scrollTop() + 500 >= $(".description3").offset().top) {
    $(".description3").animate(
      {
        left: 0,
      },
      1000
    );
  }

  if ($(window).scrollTop() + 500 >= $(".description4").offset().top) {
    $(".description4").animate(
      {
        left: 0,
      },
      1000
    );
  }
  if ($(window).scrollTop() + 500 >= $(".description5").offset().top) {
    $(".description5").animate(
      {
        left: 0,
      },
      1000
    );
  }
});

//------------------------------------------------- Start Statitics ----------------------------------------------

let nCount = (selector) => {
  $(selector).each(function () {
    $(this).animate(
      {
        Counter: $(this).text(),
      },
      {
        duration: 6000,

        easing: "swing",

        step: function (value) {
          $(this).text(Math.ceil(value));
        },
      }
    );
  });
};

let a = 0;
$(window).scroll(function () {
  let oTop = $(".statitics").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() + 10 >= oTop) {
    $(".statitics .counter").css({
      transform: "scale(1.2)",
      transition: "all 3s",
    });
    a++;
    nCount(".counter_content > .number_c");
  }
});
//---------------------------------------------- Start Carousel Slider------------------------------------------
$(".owl-carousel").owlCarousel({
  slideSpeed: 10,
  autoplay: 10,
  loop: false,
  margin: 15,
  responsive: {
    0: { items: 2 },
    600: { items: 3 },
    1000: { items: 5 },
  },
  nav: true,
});
