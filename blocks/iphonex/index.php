<?php

namespace mockups\iphonex;

add_action('plugins_loaded', __NAMESPACE__ . '\register_dynamic_block');

function register_dynamic_block() {
  // Only load if Gutenberg is enabled.
  if (!function_exists('register_block_type')) {
    return;
  }

  // Hook server side rendering into render callback
  // Must match registerBlockType in ./index.js
  register_block_type('mockups/iphonex', array(
    'style' => 'mockups',
    'render_callback' => __NAMESPACE__ . '\render_dynamic_block'
  ));
}

// Gets this plugin's URL.
function _get_plugin_full_url() {
  static $plugin_url;

  if (empty($plugin_url)) {
    $plugin_url = plugins_url(null, __FILE__);
  }

  return $plugin_url;
}

function render_dynamic_block($attributes) {
  // Get our attributes. If empty, use default. Needs to match block defaults.
  $media_id = $attributes['mediaID'];
  $media_url = $attributes['mediaURL'];
  $device_id = $attributes['deviceId'] ? $attributes['deviceId'] : 'iphonex-1';
  $device_url = $attributes['deviceMockupUrl'] ? $attributes['deviceMockupUrl'] : 'mocks/images/iphone-x-1.jpg';
  $transforms = $attributes['transforms'] ? $attributes['transforms'] : '0.935371, 0.254331, 0, -6.33505e-05, -0.364701, 0.960961, 0, -3.20798e-05, 0, 0, 1, 0, 563, 218, 0, 1';
  $screenWidth = $attributes['screenWidth'] ? $attributes['screenWidth'] : 375;
  $screenHeight = $attributes['screenHeight'] ? $attributes['screenHeight'] : 812;
  $mask_path = $attributes['maskPath'] ? $attributes['maskPath'] : 'M85.7748209,0 C89.0266325,0 92.3288356,2.30385417 92.3288356,5.55729167 C92.6331834,11.0681979 93.0429369,14.2293646 94.747647,17.4175521 C96.7603282,21.1830208 99.7150383,23.1392083 103.478625,25.1528958 C107.243118,27.1665833 111.470473,28.2395833 118.802901,28.2395833 L256.197099,28.2395833 C263.529527,28.2395833 267.756882,27.1665833 271.521375,25.1528958 C275.284962,23.1392083 278.239672,21.1830208 280.252353,17.4175521 C281.956157,14.2293646 282.328773,11.0319479 282.671164,5.55729167 C282.671164,2.30385417 285.973367,0 289.225179,0 L326.811594,0 C343.567935,0 349.644022,1.7454375 355.769928,5.02334375 C361.894928,8.30125 366.702899,13.1107188 369.979167,19.2396875 C373.255435,25.3695625 375,31.4486875 375,48.2134062 L375,763.7875 C375,780.552219 373.255435,786.631344 369.979167,792.760313 C366.702899,798.888375 361.894928,803.69875 355.769928,806.976656 C349.644022,810.254562 343.567935,812 326.811594,812 L48.1893116,812 C31.432971,812 25.3568841,810.254562 19.2300725,806.976656 C13.1041667,803.69875 8.29710145,798.888375 5.02083333,792.760313 C1.74456522,786.631344 0,780.552219 0,763.7875 L0,48.2134062 C0,31.4486875 1.74456522,25.3695625 5.02083333,19.2396875 C8.29710145,13.1107188 13.1041667,8.30125 19.2300725,5.02334375 C25.3568841,1.7454375 31.432971,0 48.1893116,0 L85.7748209,0 Z';

  ob_start(); // Turn on output buffering for HTML template

  /* Start HTML template output */
?>

<?php if (!empty($media_url)) { ?>

  <div class="mockups-wrapper">
    <div class="mockups mockups-scaled">
      <div class="mockups__screen" style="transform: matrix3d(<?php echo $transforms; ?>)">
        <img class="mockups__screen-image" 
              src="<?php echo $media_url; ?>" 
              style="-webkit-clip-path: url(#<?php echo $device_id; ?>); 
              clip-path: url(#<?php echo $device_id; ?>); 
              position: static;
              width: <?php echo $screenWidth; ?>px; height: <?php echo $screenHeight; ?>px;">
        <svg width="0" height="0">
          <clipPath id="<?php echo $device_id; ?>">
            <path d="<?php echo $mask_path; ?>"></path>
          </clipPath>
        </svg>
      </div>
      <img class="mockups__body" src="<?php echo _get_plugin_full_url(); ?>/<?php echo $device_url; ?>">
    </div>
  </div>
  
<?php }; ?>

<?php
  /* End HTML Output */
  $output = ob_get_contents(); // Grab output
  ob_end_clean(); // Turn off ouput buffer
  return $output; // Print output
}
