(function($) {

  var period = 0;

  var tsarNumbers = 148;
  var tsarExclude = [3,11];
  var tsarPerct_5 = [19.402,20.135,19.222,20.831,20.404];
  var tsarPerct_4 = [24.595,25.063,24.817,25.516];
  var tsarPerct_3 = [33.51,32.504,33.989];
  var tsarPerct_2 = [49.423,50.575];
  var Perct_1     = [100];

  var estNumbers = 324;
  var estExclude = [25,144,323];
  var estPerct_5 = [20.312,20.014,19.416,20.020,20.228];
  var estPerct_4 = [25.072,24.9252,24.425,25.5625];
  var estPerct_3 = [32.856,33.2935,33.838];
  var estPerct_2 = [49.498,50.488];

  var sovietNumbers = 199;
  var sovietExclude = [1,2,3,53,57,59,76,77,78,101,153,154];
  var sovietPerct_5 = [19.284,19.700,21.284,21.347,18.646];
  var sovietPerct_4 = [23.931,25.134,25.185,25.825];
  var sovietPerct_3 = [33.376,32.938,33.682];
  var sovietPerct_2 = [49.085,50.930];


  var germanNumbers = 29;
  var germanExclude = [3,8,15];
  var germanPerct_5 = [22.85,16.480,16.180,29.790,19.655]
  var germanPerct_5 = [21.771,15.705,15.426,28.365,18.727]
  var germanPerct_4 = [22.471,26.018,22.478,30.760]
  var germanPerct_3 = [40.242,24.103,41.806]
  var germanPerct_2 = [44.910,56.290]


  var currentNumbers = 41;
  var currentExclude = [];
  var currentPerct_5 = [19.837,19.863,17.717,20.470,22.750]
  var currentPerct_4 = [23.004,23.022,27.042,27.618]
  var currentPerct_3 = [34.220,33.957,31.900]
  var currentPerct_2 = [49.749,50.254]

  var tsarColWidths     = [Perct_1,tsarPerct_2,tsarPerct_3,tsarPerct_4,tsarPerct_5];
  var estColWidths      = [Perct_1,estPerct_2,estPerct_3,estPerct_4,estPerct_5];
  var germanColWidths   = [Perct_1,germanPerct_2,germanPerct_3,germanPerct_4,germanPerct_5];
  var sovietColWidths   = [Perct_1,sovietPerct_2,sovietPerct_3,sovietPerct_4,sovietPerct_5];
  var currentColWidths  = [Perct_1,currentPerct_2,currentPerct_3,currentPerct_4,currentPerct_5];

  var periodNames     = ['TSAARIAEG', 'SAKSAAEG', 'EESTIAEG', 'NKOGUDEAEG', 'PRAEGU'];
  var periodNumbers   = [tsarNumbers, germanNumbers, estNumbers, sovietNumbers, currentNumbers];
  var periodExcludes  = [tsarExclude, germanExclude, estExclude, sovietExclude, currentExclude];
  var periodPercents  = [tsarColWidths, germanColWidths, estColWidths, sovietColWidths, currentColWidths];

  var len_tsar    = tsarNumbers     - parseInt(tsarExclude.length);
  var len_est     = estNumbers      - parseInt(estExclude.length);
  var len_german  = germanNumbers   - parseInt(germanExclude.length);
  var len_soviet  = sovietNumbers   - parseInt(sovietExclude.length);
  var len_current = currentNumbers  - parseInt(currentExclude.length);
  var lens        = [len_tsar,len_german,len_est,len_soviet,len_current];



  var pageLogo        = $('.page-logo');
      pageLang        = $('.page-language');
  var picturesOverlay     = $('.pictures-page-overlay'),
      largePictureOverlay = $('.picture-large-overlay'),
      picturesHeader      = picturesOverlay.find('header'),
      picturesSide        = picturesOverlay.find('.pictures-side'),
      headerHr            = picturesOverlay.find('.pictures-header hr'),
      staticTheme         = picturesOverlay.find('.static-theme-container'),
      fixedTheme          = picturesOverlay.find('.fixed-theme-container'),
      sideNavUl           = picturesSide.find('ul'),
      mobileNav           = picturesHeader.find('.mobile-nav'),
      mobileNavUl         = picturesHeader.find('.mobile-nav-ul'),
      mobileNavLi         = mobileNavUl.find('li'),
      largePicContainer   = largePictureOverlay.find('.large-picture-container'),
      picturesBody    = picturesOverlay.find('.pictures-body'),
      thumbDiv        = picturesBody.find('.thumb-div');

  var naviVisible = false;

  var distributePictureCols = function(period) {
    var children = picturesBody.children();
    children.html('');
    var cols_count = children.filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    prev_cols_count = cols_count;
    var zeros;
    var folder = periodNames[period];
    var number = periodNumbers[period];
    var exclude = periodExcludes[period];
    for (i = 0; i < cols_count; i++) {
      children.eq(i).css({'width': 100.0/cols_count + '%'});
    }
    for (i = 0; i < number; i++) {
      if (jQuery.inArray(i,exclude) != -1) continue;
      if (i < 10) zeros = "000";
      else if (i < 100) zeros = "00";
      else if (i < 1000) zeros = "0";
      children.eq(i%cols_count).append('<img src="/content/images/ajastud/'+ folder +'/IMG_' + zeros + i + '.jpg"/>');
    }
  };


  var fixWidths = function() {
    var children = picturesBody.children();
    var cols_count = children.filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    var percents = [0,0,0,0,0];
    var sum_heights = 0;
    var init_perc = 100.0/cols_count;
    var avg = 0;
    for (i = 0; i < cols_count; i++) {
      sum_heights += children.eq(i).height();
    }
    avg = sum_heights / cols_count;
    for (i = 0; i < cols_count; i++) {
      percents[i] = avg / children.eq(i).height() *  init_perc;
    }
    for (i = 0; i < cols_count; i++) {
      children.eq(i).css({'width': percents[i] + '%'});
    }
  };

  var imgLoaded = function(len) {
    imgCounter = 0;
    picturesBody.find('img').load( function() {
      imgCounter++;
      if (imgCounter >= len) {
        fixWidths();
      }
    });
  };



  mobileNav.on('click', function() {
    if (!naviVisible) {
      mobileNavUl.show(300);
      naviVisible = true;
    } else {
      mobileNavUl.hide(300);
      naviVisible = false;
    }
  });



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
    if ($(this).hasClass('active')) return;
    var children = picturesBody.children();
    mobileNavLi.css({'background':'none'});
    $(this).siblings().css({'background':'none'});
    period = $(this).attr('data-title');
    var mobileNavElement = mobileNavUl.find('li[data-title=' + period + ']');
    distributePictureCols(period);
    imgLoaded(lens[period]);
    $(this).css({'background':'rgba(250,250,250,0.2)'});
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    mobileNavElement.css({'background':'rgba(250,250,250,0.2)'});
    mobileNavElement.siblings().removeClass('active');
    mobileNavElement.addClass('active');
  });


  mobileNavLi.on('click', function() {
    if ($(this).hasClass('active')) return;
    var children = picturesBody.children();
    mobileNavLi.css({'background':'none'});
    sideNavUl.find('li').css({'background':'none'});
    period = $(this).attr('data-title');
    var sideElement = sideNavUl.find('li[data-title=' + period + ']');
    distributePictureCols(period);
    imgLoaded(lens[period]);
    $(this).css({'background':'rgba(250,250,250,0.2)'});
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    sideElement.css({'background':'rgba(250,250,250,0.2)'});
    sideElement.siblings().removeClass('active');
    sideElement.addClass('active');
  });

  picturesBody.scroll(function(){
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

  largePictureOverlay.on('click', function() {
    imagesPage();
  });

  picturesBody.children().on('click','img', function() {
    var windowWidth = $(window).width();
    if (windowWidth <= 750) {
      return;
    }
    var source = $(this).attr('src');
    largePicContainer.css({
      'background': 'url('+ source +') no-repeat center center',
      'background-size': 'contain'
    });
    largePictureOverlay.fadeIn(200,function() {});
  });


  $(document).keydown(function(e) {
    if (e.which === 27) {
      imagesPage();
    }
  });

  var checkColsChanged = function() {
    var cols_count = picturesBody.children().filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    if (prev_cols_count != cols_count) {
      distributePictureCols(period);
      imgLoaded(lens[period]);
    }
  };

  $(document).ready(function() {
    distributePictureCols(period);
    imgLoaded(lens[period]);
  });

  var resizeTimer;
  $(window).on('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      checkColsChanged();
    }, 50);
  });

})(jQuery);
