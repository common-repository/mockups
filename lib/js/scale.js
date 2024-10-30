 /* Scale element to match parent's width using CSS Transforms */
function scale() {
  jQuery('.mockups-scaled').each(function() {
    var scaled = jQuery(this),
      parent = scaled.parent(),
      ratio = (parent.width() / scaled.width()),
      padding = scaled.height() * ratio;
    scaled.css({
      'transform': 'scale(' + ratio + ')',
      'transform-origin': 'top left'
    });
    parent.css('padding-top', padding);
  })
}

/* Run scale function when ALL contents are ready, including images */
jQuery(window).load(function() {
  scale();
 });

 /* Run scale function on window resize */
jQuery(window).resize(function() {
  scale();
});

