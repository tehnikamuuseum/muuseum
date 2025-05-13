(function($) {
  var eventNumbers = 29;
  var eventExclude = [0,15,16,17];

  var expositionNumbers = 76;
  var expositionExclude = [0,24,62,57,27,37,38,61,43,23,41,63,40,58,8,39,59,55,64];

  var expNames     = ['events', 'ekspositsioon'];
  var expNumbers   = [eventNumbers, expositionNumbers];
  var expExcludes  = [eventExclude, expositionExclude];

  var len_exp   = expositionNumbers - parseInt(expositionExclude.length);
  var len_event = eventNumbers - parseInt(eventExclude.length);
  var lens = [len_event,len_exp];

  var carsOverlay = $('.cars-page-overlay'),
      carsBody    = $('.cars-page-overlay').find('.cars-body'),
      carsSide    = $('.cars-page-overlay').find('.cars-side'),
      carsSideUl  = $('.cars-page-overlay').find('ul'),
      mainContent = $('section.cars-content'),
      expoList    = mainContent.find('.expo-list');
  var currentPage = 1;
  var imgCounter = 0;
  var prev_cols_count = 0;

  var distCols = function(period) {
    var children = carsBody.children();
    children.html('');
    var cols_count = children.filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    prev_cols_count = cols_count;
    var folder = expNames[period];
    var number = expNumbers[period];
    var exclude = expExcludes[period];
    for (i = 0; i < cols_count; i++) {
      children.eq(i).css({'width': 100/cols_count + '%'});
    }
    for (i = 1; i < number; i++) {
      if (jQuery.inArray(i,exclude) != -1) continue;
      $('<img/>', {
        src:     '/content/images/'+ folder +'/' + i + '.JPG',
        click:   function(e){
          if ($(window).width() <= 750) return;
          removeBrightFilter();
          findLi($(this).eq(0).attr('src'));
          $(this).eq(0).addClass("lightfilter");
        }
      }).appendTo(children.eq((i-1)%cols_count));
      // children.eq((i-1)%cols_count).append('<img src="/content/images/'+ folder +'/' + i + '.JPG"/>');
    }
  };

  var removeBrightFilter = function() {
    carsBody.find('img').removeClass('lightfilter');
    carsBody.find('img').removeClass('darkfilter');
    expoList.removeClass('highlight-li');
  };

  var findLi = function(path) {
    var str = path.split('').reverse()
    var resultStr = "";
    for (i = 0; i < str.length; i++)
    {
      if (str[i] == '/') break;
      resultStr += str[i];
    }
    resultStr = resultStr.split('').reverse().join('').slice(0,-4);
    var liItem = carsSideUl.find('#' + resultStr);
    if (liItem.length == 0) return;
    liItem.addClass('highlight-li');
    var sectionTop  = liItem.position().top;
    var scrollTop   = carsSideUl.scrollTop();
    carsSideUl.animate({
      scrollTop: sectionTop + scrollTop - 85
    }, 300);
  };

  var fixWidths = function() {
    var children = carsBody.children();
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
    carsBody.find('img').load( function() {
      imgCounter++;
      if (imgCounter >= len) {
        fixWidths();
      }
    });
  };

  expoList.on('click', function() {
    var ptr = $(this).attr('id');
    var imgname = ptr + '.JPG';
    carsBody.find('img').addClass('darkfilter');
    var image = carsBody.find("img[src$='/"+imgname+"']");
    console.log(image);
    var sectionTop  = image.position().top;
    var scrollTop   = carsBody.scrollTop();
    carsBody.animate({
      scrollTop: sectionTop + scrollTop - 85
    }, 300);
    image.removeClass('darkfilter');
    image.addClass('lightfilter');
    $(this).siblings().removeClass('highlight-li');
    $(this).addClass('highlight-li');
  });


  var checkColsChanged = function() {
    var cols_count = carsBody.children().filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    if (prev_cols_count != cols_count) {
      distCols(currentPage);
      imgLoaded(lens[currentPage]);
    }
  };

  $(document).ready(function() {
    distCols(1);
    imgLoaded(len_exp);
  });

  var resizeTimer;
  $(window).on('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      checkColsChanged();
    }, 50);
  });
})(jQuery);
