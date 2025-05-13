(function($) {

  var pictureNumbers = [
      "002","003","005","006",
      "007","008","009","010","011","012",
      "014","015","016","017",
      "020","021","022","023","024",
      "025","026","027","028","029","030",
      "031","032","033","034","035","036",
      "037","038","039","040","041","042",
      "043","044","045","046","047","048",
      "049","050","051","052","053","054",
      "055","056","057","058","059","060",
      "061","062","063","064","065","066",
      "067","068","069","070","071","072"
    ]

  var navButtonsWrap  = $('header').find('.nav-buttons-wrapper'),
      videoContainer  = $('.video-container'),
      pageLogo        = $('.page-logo');
      pageLang        = $('.page-language');
      backBtn        = $('.overlay-back-button');
  var carsOverlay         = $('.cars-page-overlay'),
      picturesOverlay     = $('.pictures-page-overlay'),
      contactOverlay      = $('.contact-page-overlay'),
      largePictureOverlay = $('.picture-large-overlay'),
      contactBody         = contactOverlay.find('.contact-body'),
      contactNav          = contactOverlay.find('ul'),
      sideNavUl           = picturesOverlay.find('ul'),
      headerHr            = picturesOverlay.find('.pictures-header hr'),
      staticTheme         = picturesOverlay.find('.static-theme-container'),
      fixedTheme          = picturesOverlay.find('.fixed-theme-container'),
      largePicContainer   = largePictureOverlay.find('.large-picture-container'),
      picturesBody    = picturesOverlay.find('.pictures-body'),
      contactSide     = contactOverlay.find('.contact-side'),
      carsBody        = carsOverlay.find('.cars-body'),
      thumbDiv        = picturesBody.find('.thumb-div');
  var contactContact = contactBody.find('#contact .heading'),
      contactHistory = contactBody.find('#history .heading'),
      contactContact = contactBody.find('#documents .heading'),
      contactContact = contactBody.find('#projects .heading');

  contactNav.children().on('click', function() {
    event.preventDefault();
    var id          = $(this).attr('href');
    var section     = contactBody.find($(this).attr('href') + ' .heading');
    var sectionTop  = section.position().top;
    var scrollTop   = contactOverlay.scrollTop();
    var str = 'calc(100vh + '+sectionTop + 'px + '+scrollTop + 'px)';
    // console.log(str);
    contactBody.css({'height': str});
    contactOverlay.animate({
      scrollTop: sectionTop + scrollTop
    }, 300);
  });

  var distributeCarCols = function() {
    var children = carsBody.children();
    var cols_count = children.filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    for (i = 0; i < pictureNumbers.length; i++) {
      children.eq(i%cols_count).append('<img src="content/images/gallery/IMG_0' + pictureNumbers[i] + '.jpg"/>');
    }
  };

  var distributePictureCols = function() {
    var children = picturesBody.children();
    var cols_count = children.filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    for (i = 0; i < pictureNumbers.length; i++) {
      children.eq(i%cols_count).append('<img src="content/images/gallery/IMG_0' + pictureNumbers[i] + '.jpg"/>');
    }
  };

  distributePictureCols();
  distributeCarCols();


  var fixVideoSize = function() {
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    if (windowWidth < windowHeight*1.85) {
      pageLogo.hide();
      if (windowWidth < windowHeight*1.4) {
        videoContainer.find('video').css({'width': 'auto'});
        pageLogo
      } else {
        videoContainer.find('video').css({'width': '100%'});
      }
    } else {
      if (backBtn.css('display') == 'none')
      {
        pageLogo.show();
      }
    }
  };


  var frontPage = function() {
    videoContainer.find('video').get(0).play();
    $('.cars-page-overlay, .pictures-page-overlay, .contact-page-overlay').fadeOut(300,function() {
      navButtonsWrap.css({'z-index': '3'});
    });
  };

  var imagesPage = function() {
    largePictureOverlay.fadeOut(200,function() {});
  };

  var fixOpac = function() {
    if (picturesOverlay.scrollTop() > 100) {
      staticTheme.css("opacity",'0');
      headerHr.css("opacity",'0');
    }
  };

  sideNavUl.children().on('click', function() {
    // console.log();
    $(this).siblings().css({'background':'none'});
    console.log($(this).html());
    $(this).css({'background':'rgba(250,250,250,0.2)'});
  });

  picturesOverlay.scroll(function(){
    var currentTop = $(this).scrollTop();
    if (currentTop <= 100) {
      var opac = String(1-currentTop*0.01);
      staticTheme.css("opacity",opac);
      headerHr.css("opacity",opac);
    }
    else {
      staticTheme.css("opacity",'0');
      headerHr.css("opacity",'0');
    }
  });

  thumbDiv.on('click', function() {
    var source = $(this).find('img').attr('src');
    largePicContainer.css({
      'background': 'url('+ source +') no-repeat center center'
    });
    largePictureOverlay.fadeIn(200,function() {});
  });

  largePicContainer.find('.large-picture-close').on('click', function() {
    imagesPage();
  });

  navButtonsWrap.children().on('click', function() {
    var overlayName = '.' + $(this).attr('data-overlay');
    navButtonsWrap.css({'z-index': '1'});
    $(overlayName).fadeIn(300,function() {
      pageLogo.hide();
      backBtn.show();
      $(this).css({'display': 'flex'});
      videoContainer.find('video').get(0).pause();
    });

  });

  backBtn.on('click', function() {
    backBtn.hide();
    pageLogo.show();
    fixVideoSize();
    frontPage();
  });

  $(document).keydown(function(e) {
    if (e.which === 27) {
      if (largePictureOverlay.css('display') == 'none') {
        videoContainer.find('video').get(0).play();
        backBtn.hide();
        pageLogo.show();
        fixVideoSize();
        frontPage();
      }
      else {
        imagesPage();
      }
    }
  });

  fixVideoSize();
  var resizeTimer;
  $(window).on('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      fixVideoSize();
    }, 100);
  });
})(jQuery);
