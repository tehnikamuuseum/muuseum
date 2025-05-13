(function($) {
  var contactOverlay      = $('.contact-page-overlay'),
      contactBody         = contactOverlay.find('.contact-body'),
      contactNav          = contactOverlay.find('ul');
  var contactContact = contactBody.find('#contact .heading'),
      contactHistory = contactBody.find('#history .heading'),
      contactContact = contactBody.find('#documents .heading'),
      contactContact = contactBody.find('#projects .heading');

  contactNav.children().on('click', function(event) {
    event.preventDefault();
    var id          = $(this).attr('href');
    var section     = contactBody.find($(this).attr('href') + ' .heading');
    var sectionTop  = section.position().top;
    var scrollTop   = $('.contact-content-wrapper').scrollTop();
    var str = 'calc(100vh + '+sectionTop + 'px + '+scrollTop + 'px)';
    contactBody.css({'height': str});
    $('.contact-content-wrapper').animate({
      scrollTop: sectionTop + scrollTop - 85
    }, 300);
  });
})(jQuery);
