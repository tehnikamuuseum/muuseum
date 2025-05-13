(function($) {

  var p = 4;
  // li(data-title="0") Tsaariaeg
  // li(data-title="1") Saksaaeg
  // li(data-title="2") Eestiaeg
  // li(data-title="3") Nõukogude aeg
  // li(data-title="4") Kaasaeg



  var mainHeader      = $('header'),
      navButtonsWrap  = mainHeader.find('.nav-buttons-wrapper'),
      videoContainer  = $('.video-container'),
      pageLogo        = $('.page-logo');
      pageLang        = $('.page-language'),
      backBtn        = $('.overlay-back-button');
      picturesBtn         = navButtonsWrap.find('.nav-button-two'),
      carsBtn             = navButtonsWrap.find('.nav-button-one');


  var checkMobile = function() {
    if(!jQuery.browser.mobile)
    {
      var video   = $('.video-container').find('video');
      var sources = video.find('source');
      for(var i = 0; i<sources.length;i++) {
       sources[i].setAttribute('src', sources[i].getAttribute('data-src'));
      }
      video.load();
    }
  };

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


  $(document).ready(function() {
    checkMobile();
    fixVideoSize();
    var resizeTimer;
    $(window).on('resize', function(e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        fixVideoSize();
      }, 50);
    });
  });


})(jQuery);
