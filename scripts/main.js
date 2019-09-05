$(document).ready(function() {

  containerPosY = 0;
  carouselPosX = 0;
  focusHeight = 640;
  currentImg = 0;


  $('video').each(function() {
    $(this).get(0).pause();
  });

  // Default focus
  $('#tv').children().eq(0).addClass('active');
  $('.active').children().eq(1).addClass('focus');


  function leftRight() {
    total = $('.active .fsble').length;
    current = $('.active .fsble.focus').index() + 1;
  }

  function upDown() {
    total = $('.active').parent().children().length;
    current = $('.active').index() + 1;
  }

  function updateContainerYPos(pos) {
    containerPosY = containerPosY + pos;
    $('.container').css('transform', 'translateY(' + containerPosY + 'px)')
  }

  function updateCarouselXPos(pos) {
    carouselPosX = carouselPosX + pos;
    $('.carousel.active .carouselContent').css('transform', 'translateX(' + carouselPosX + 'px)');
  }

  function returnFocus() {

    if ($('.primaryNav').hasClass('active') && $('.primaryNav').children().hasClass('focus')) {

      //Do nothing

    } else {
      if ($('.active .fsble').hasClass('wasfocus')) {
        $('.active .fsble.wasfocus').addClass('focus').removeClass('wasfocus');
      } else {
        $('.active .fsble:eq(0)').addClass('focus');
      }
    }
  }

  function bmPlayPartTwo(image, video) {
    bmVideo = setTimeout(function() {
      video.css('opacity', 1);
      video.get(0).play()
      video.on('ended', function() {

        video.css('opacity', 0);

        setTimeout(function() {

          moveRight();

        }, 2000);

      });

    }, 2000);

  }

  function bmPlay() {
    var video = $('.active video');
    var image = $('.active .bmPage');
    bmPlayPartTwo(image, video);

    bmText = setTimeout(function() {
      $('.active .bmNudge').css('opacity', 0.25);
      $('.active .bmViews').css('opacity', 0.25);
      $('.active .bmSynopsis').css('opacity', 0.25);
      $('.active .bmActors').css('opacity', 0.25);
      $('#browsemasterExperience').css('height', "980px")
    }, 5000);
  }

  function bmProgress() {

    var index = $('.bmPage.active').index();
    var bar = $('.active .bmProgress').children().eq(index).children();
    totalTime = $('.active .bmVideo video').get(0).duration;

    progressBars = setInterval(function() {

      currentTime = $('.active .bmVideo video').get(0).currentTime;
      var progress = ((currentTime / totalTime) * 100) + "%";

      console.log(progress);

      $('.active .bmProgress').children().eq(index).children().width(progress)

    }, 500);

    $('.active .bmProgress').children().eq(index).css('opacity', 1)
    bar.show();

  }

  function tearDown() {

    clearTimeout(bmVideo);
    clearTimeout(bmText);
    clearInterval(progressBars);

    totalTime = 0;
    currentTime = 0;

    $('.bmText').children().css('opacity', 1);

    $('video').each(function() {
      $(this).get(0).pause();
      $(this).get(0).currentTime = 0;
      $(this).css('opacity', 0)
    });
  }

  function startSlideshow() {

    var totalImg = ($('.bmVideo.slideshow img').length - 1);


    //start the setInterval
    var slideshow = setInterval(function() {

      //after the interval fade the visible image
      $('.bmVideo.slideshow img').eq(currentImg).fadeOut(600);

      //increase variable to the next image
      currentImg = currentImg+1;

      //if the variable is equal to the amount of total image then show the first image
      if (currentImg > totalImg) {

        //set the variable to the first image again
        currentImg = 0;

        //Fade in the next image
        $('.bmVideo.slideshow img').eq(currentImg).fadeIn(600);

      } else {

        //Fade in the next image
        $('.bmVideo.slideshow img').eq(currentImg).fadeIn(600);

      }

    }, 4000);

  }

  function startSeriesSlide() {

    //get the number of items in the header
    var totalPage = $('.bmPage.multiSeries').length;


    //start the interval
    setInterval(function () {

      //get the item which is currently displayed
      var currentPage = $('.bmPage.multiSeries:visible').index() + 1;
      var durationFade = 400;

      //Get the next visible Browsemaster Page
      if (currentPage == totalPage){

        console.log("Back to the beginning");

        $('.bmPage.multiSeries:visible').fadeOut(durationFade);
        $('.bmPage.multiSeries').eq(0).fadeIn(durationFade);

      } else {

        $('.bmPage.multiSeries:visible').fadeOut(durationFade).next().fadeIn(durationFade);

      }

    }, 6000);

  }

  //Up key presses
  function moveUp() {

    if ($('.bmPage').hasClass('active')) {

      $('.active').removeClass('active');
      $('#tv').children().eq(0).addClass('active');
      $('.focus').addClass('wasfocus').removeClass('focus');
      $('#browsemasterExperience').css('height', '840px');

      // tearDown();

    } else if ($('.container').children().eq(1).hasClass('active')) {

      $('.active').removeClass('active');
      $('.focus').removeClass('focus').addClass('wasfocus');
      $('.bmPage:visible').addClass('active');
      $('.active .bmCTA').addClass('focus');

      updateContainerYPos(focusHeight);

      // bmPlay();
      // bmProgress();

    } else if ($('.primaryNav').hasClass('active')) {

      //Do nothing

    } else {

      upDown()

      if (current > 2) {

        var heightToMove = parseInt($('.active').outerHeight(true) / 2) + ($('.active').prev().outerHeight(true) / 2);
        $('.active').removeClass('active').prev().addClass('active');
        $('.focus').addClass('wasfocus').removeClass('focus');

        updateContainerYPos(heightToMove);

        currentTrans = $('.active .carouselContent').css('transform').split(/[()]/)[1];
        carouselPosX = parseInt(currentTrans.split(',')[4]);
        updateCarouselXPos(0);

      }

    }

    returnFocus();

  }

  //Down key presses
  function moveDown() {

    if ($('.primaryNav').hasClass('active')) {

      if ($('.active').children().eq(1).hasClass('focus') || $('.active').children().eq(0).hasClass('focus')) {

        $('.active').removeClass('active');
        $('.focus').addClass('wasfocus').removeClass('focus');
        $('.bmPage:visible').addClass('active');
        $('.active .bmCTA').addClass('focus');

        // bmPlay();
        // bmProgress();

      } else {

        //Do nothing

      }


    } else if ($('.bmPage').hasClass('active')) {

      $('.active').removeClass('active');
      $('.container').children().eq(1).addClass('active');
      $('.focus').removeClass('focus');
      $('#browsemasterExperience').css('height', '840px');
      // tearDown();

      //Set container position
      updateContainerYPos(-focusHeight);

    } else {

      upDown()

      if (current < total) {

        var heightToMove = parseInt($('.active').outerHeight(true) / 2) + ($('.active').next().outerHeight(true) / 2);

        $('.active').removeClass('active').next().addClass('active');
        $('.focus').addClass('wasfocus').removeClass('focus');

        updateContainerYPos(-heightToMove);

        currentTrans = $('.active .carouselContent').css('transform').split(/[()]/)[1];
        carouselPosX = parseInt(currentTrans.split(',')[4]);
        updateCarouselXPos(0);

      }

    }

    returnFocus();

  }

  //Left key presses
  function moveLeft() {


    if ($('.bmPage').hasClass('active')) {

      // tearDown();

      if ($('.bmPage:first').is(":visible")) {

        $('.bmPage.active:visible').hide().removeClass('active');
        $('.bmPage:last').show().addClass('active');
        $('.bmPage.active .bmCTA').addClass('focus');

        // bmPlay();
        // bmProgress();

      } else {

        $('.bmPage.active:visible').removeClass('active');
        $('.bmPage:visible').hide().prev().show();
        $('.bmPage:visible').addClass('active');
        $('.bmPage:visible .bmCTA').addClass('focus');

        // bmPlay();
        // bmProgress();

      }


    } else {

      leftRight();

      if (current > 1) {


        widthToMove = parseInt($('.active .fsble.focus').outerWidth(true));
        $('.active .fsble.focus').removeClass('focus').prev().addClass('focus');

        updateCarouselXPos(widthToMove);

      }

    }

  }

  //Right key presses
  function moveRight() {

    if ($('.bmPage').hasClass('active')) {

      // tearDown();

      if ($('.bmPage:last').is(":visible")) {

        $('.bmPage.active:visible').hide().removeClass('active');
        $('.bmPage:first').show().addClass('active');
        $('.bmPage:visible .bmCTA').addClass('focus');

        // bmPlay();
        // bmProgress();

      } else {

        $('.bmPage.active:visible').removeClass('active');
        $('.bmPage:visible').hide().next().show();
        $('.bmPage:visible').addClass('active');
        $('.bmPage:visible .bmCTA').addClass('focus');

        // bmPlay();
        // bmProgress();

      }

    } else {

      leftRight();

      if (current < total) {

        widthToMove = parseInt($('.active .fsble.focus').outerWidth(true));
        $('.active .fsble.focus').removeClass('focus').next().addClass('focus');
        updateCarouselXPos(-widthToMove);


      }

    }

  }


  function pressEnter() {

    if ($('.browsemaster_button').hasClass('focus')) {



    } else if ($('.primaryNav').hasClass('active')) {

      if ($('.primaryNav').children().eq(1).hasClass('focus')) {

        $('#tv').children().hide();
        $('#tv .primaryNav').show();
        $('#tv .container').show();

      } else if ($('.primaryNav').children().eq(2).hasClass('focus')) {

        $('#tv').children().hide();
        $('#tv .primaryNav').show();
        $('#tv .channelsPage').show();

      } else if ($('.primaryNav').children().eq(3).hasClass('focus')) {

        $('#tv').children().hide();
        $('#tv .primaryNav').show();
        $('#tv .categoriesPage').show();

      }

    }

  }

  function goBack() {



  }


  // On *any* keydown event
  $(document).keydown(function(e) {

    e.preventDefault();

    if (e.keyCode == 37) {
      moveLeft();
    }
    if (e.keyCode == 38) {
      moveUp();
    }
    if (e.keyCode == 39) {
      moveRight();
    }
    if (e.keyCode == 40) {
      moveDown();
    }
    if (e.keyCode == 13) {
      pressEnter();
    }
    if (e.keyCode == 27 || e.keyCode == 8) {
      goBack();
    }

  });

  $(document).keyup(function(e) {
    e.preventDefault();
  });

  if ($('.bmVideo').hasClass('slideshow')) {

    startSlideshow();

  }

  if ($('.bmPage').hasClass('multiSeries')) {

    startSeriesSlide();

  }

});
