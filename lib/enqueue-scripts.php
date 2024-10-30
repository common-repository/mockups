<?php

namespace mockups;

/**
 *  Enqueue JavaScript and CSS
 *  for block editor only.
 */
function enqueue_block_editor_assets() {
  // Make paths variables
  $block_path = '/assets/js/main.js';
  $style_path = '/assets/css/blocks.editor.css';
  // Enqueue the bundled block JS file
  wp_enqueue_script(
    'launchui/mockups',
    _get_plugin_url() . $block_path,
    ['wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor'],
    null
  );

  // Enqueue optional editor-only styles
  wp_enqueue_style(
    'launchui/mockups/editor',
    _get_plugin_url() . $style_path,
    [],
    null
  );

  // Pass Plugin URL to our script where it can be accessed
  // using mockups.pluginUrl
  wp_localize_script('launchui/mockups', 'mockups', array(
    'pluginUrl' => _get_plugin_url(),
  ));
}



add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets');


/**
 *  Enqueue CSS
 *  for all blocks
 */
function enque_block_styles() {
  $style_path = '/assets/css/styles.css';

  wp_enqueue_style(
    'launchui/mockups/styles',
    _get_plugin_url() . $style_path,
    array(),
    filemtime( _get_plugin_url() . $style_path )
  );


}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enque_block_styles' );

/**
 * Enqueue assets for frontend
 *
 */
function all_blocks_frontend_assets() {

  wp_register_script('scale', _get_plugin_url() . '/lib/js/scale.js', array('jquery'), '', true);
  wp_enqueue_script( 'jquery' );
  wp_enqueue_script('scale');

}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\all_blocks_frontend_assets' );
