<?php
/**
 *  Mockups for WordPress
 *
 *  @wordpress-plugin
 *  Plugin Name: Mockups
 *  Plugin URI:  https://launchui.com/mockups-for-wordpress-gutenberg/
 *  Description: Beautiful device mockups you can use right from WordPress.
 *  Version:     1.0.2
 *  Author:      Launch UI
 *  Author URI:  https://launchui.com
 *  License:     GPL2+
 *  License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

namespace mockups;

//  Exit if accessed directly.
defined('ABSPATH') || exit;

// Gets this plugin's absolute directory path.
function _get_plugin_directory() {
  return __DIR__;
}

// Gets this plugin's URL.
function _get_plugin_url() {
  static $plugin_url;

  if (empty($plugin_url)) {
    $plugin_url = plugins_url(null, __FILE__);
  }

  return $plugin_url;
}

// Enqueue JavaScript and CSS
include __DIR__ . '/lib/enqueue-scripts.php';

// Load dynamic blocks
include __DIR__ . '/blocks/iphonex/index.php';
