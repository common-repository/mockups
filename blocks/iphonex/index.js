/**
 *  iPhone X Mockup Block
 *  ---
 *  Choose a mockup image and upload a screenshot to create a mockup preview.
 */

//  Import CSS.
import './editor.css'
/**
 * Block dependencies
 */
import icon from './icon';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload, InspectorControls } = wp.editor;
const { Button, PanelBody, PanelRow } = wp.components;
const { Component } = wp.element;
const pluginUrl = mockups.pluginUrl;

import ReactResizeDetector from 'react-resize-detector';

import getTransformCoordinates from '../../lib/js/perspective-transform';

import deviceMockups from './mocks/mocks';

registerBlockType('mockups/iphonex', {
  title: __( 'iPhone X' ),
  icon: {
    src: icon,
  },
  category: 'common',
  keywords: [
    __( 'device' ),
    __( 'mockup' ),
    __( 'iphonex' ),
  ],

  // Enable or disable support for default WordPress block options
  supports: {
    html: false,
    reusable: false,
    align: false
  },

  // Data model for this block
  attributes: {
    pluginPath: {
      type: 'string',
      content: pluginUrl
    },
    deviceMockupUrl: {
      type: 'string',
      default: 'mocks/images/iphone-x-1.jpg'
    },
    deviceId: {
      type: 'string',
      default: 'iphonex-1'
    },
    mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string'
    },
    transforms: {
      type: 'string',
      default: '0.935371, 0.254331, 0, -6.33505e-05, -0.364701, 0.960961, 0, -3.20798e-05, 0, 0, 1, 0, 563, 218, 0, 1'
    },
    scaleChild: {
      type: 'object',
      default: false
    },
    wrapperPadding: {
      type: 'string'
    },
    childHeight: {
      type: 'number',
      default: 10
    },
    childWidth: {
      type: 'number',
      default: 10
    },
    screenWidth: {
      type: 'number',
      default: 375
    },
    screenHeight: {
      type: 'number',
      default: 812
    },
    maskPath: {
      type: 'string',
      default: 'M85.7748209,0 C89.0266325,0 92.3288356,2.30385417 92.3288356,5.55729167 C92.6331834,11.0681979 93.0429369,14.2293646 94.747647,17.4175521 C96.7603282,21.1830208 99.7150383,23.1392083 103.478625,25.1528958 C107.243118,27.1665833 111.470473,28.2395833 118.802901,28.2395833 L256.197099,28.2395833 C263.529527,28.2395833 267.756882,27.1665833 271.521375,25.1528958 C275.284962,23.1392083 278.239672,21.1830208 280.252353,17.4175521 C281.956157,14.2293646 282.328773,11.0319479 282.671164,5.55729167 C282.671164,2.30385417 285.973367,0 289.225179,0 L326.811594,0 C343.567935,0 349.644022,1.7454375 355.769928,5.02334375 C361.894928,8.30125 366.702899,13.1107188 369.979167,19.2396875 C373.255435,25.3695625 375,31.4486875 375,48.2134062 L375,763.7875 C375,780.552219 373.255435,786.631344 369.979167,792.760313 C366.702899,798.888375 361.894928,803.69875 355.769928,806.976656 C349.644022,810.254562 343.567935,812 326.811594,812 L48.1893116,812 C31.432971,812 25.3568841,810.254562 19.2300725,806.976656 C13.1041667,803.69875 8.29710145,798.888375 5.02083333,792.760313 C1.74456522,786.631344 0,780.552219 0,763.7875 L0,48.2134062 C0,31.4486875 1.74456522,25.3695625 5.02083333,19.2396875 C8.29710145,13.1107188 13.1041667,8.30125 19.2300725,5.02334375 C25.3568841,1.7454375 31.432971,0 48.1893116,0 L85.7748209,0 Z'
    }
  },

  // The UI for the WordPress editor
  edit: class extends Component {

    constructor() {
      super(...arguments);
      this.onSelectImage = this.onSelectImage.bind(this);
      this.selectDevice = this.selectDevice.bind(this);
      this.onResize = this.onResize.bind(this);
      this.onChildResize = this.onChildResize.bind(this);
    }
    
    // Update media props
    onSelectImage (media) {
      this.props.setAttributes({
        mediaURL: media.url,
        mediaID: media.id
      });
    };

    // Select mockup image and
    // transform coordinates to fit device screen
    selectDevice (mockup) {
      const {
        deviceId,
        deviceMockupUrl,
        maskPath,
        srcCorners,
        dstCorners,
        screenHeight,
        screenWidth,
      } = mockup;
  
      const { setAttributes } = this.props;
  
      // Set attributes with scaling factors
      setAttributes({
        deviceMockupUrl,
        deviceId,
        screenHeight,
        screenWidth,
        srcCorners,
        dstCorners,
        maskPath,
        transforms: getTransformCoordinates(srcCorners, dstCorners)
      });
    }

    // Scale mock to parent's width
    onResize (width) {
      const { setAttributes, attributes: { childHeight, childWidth} } = this.props;
      const ratio = (width / childWidth);
      const padding = childHeight * ratio;

      setAttributes({
        scaleChild: {
          transform: `scale(${ratio})`,
          transformOrigin: `top left`
        },
        wrapperPadding: `${padding}px`
      });
    };

    // Scale
    onChildResize (width, height) {
      this.props.setAttributes({
        childWidth: width,
        childHeight: height
      });
    };
  
    render () {
      // Pull out the props we'll use
      const {
        attributes: {
          mediaID,
          mediaURL,
          transforms,
          deviceId,
          deviceMockupUrl,
          screenHeight,
          screenWidth,
          scaleChild,
          maskPath,
          wrapperPadding
        }
      } = this.props;
  
      const deviceStyles = {
        width: `${screenWidth}px`,
        height: `${screenHeight}px`,
        clipPath: `url(#${deviceId})`
      };
  
      const transform3d = {
        ...deviceStyles,
        transform: `matrix3d(${transforms})`,
      };

      const scaleStyles = {
        transform: scaleChild.transform,
        transformOrigin: scaleChild.transformOrigin,
      };

      const wrapperStyles = {
        paddingTop: wrapperPadding
      };
  
      return (
        <div>
          <InspectorControls>
            <PanelBody title={ __( 'Mockup Images', 'launchui' ) }>
              {deviceMockups.map((mockup) =>
                <PanelRow key={mockup.id}>
                  <div onClick={() => this.selectDevice(mockup)} >
                    <img className={deviceId === mockup.deviceId ? "mockups_select-image--selected": "mockups_select-image--js"} src={`${pluginUrl}/blocks/iphonex/${mockup.deviceMockupUrl}`} title={mockup.credit} /> 
                  </div>                
                </PanelRow>
                )}
            </PanelBody>
          </InspectorControls>
            <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />            
              {mediaID &&
                <div className="mockups-wrapper--js" style={wrapperStyles}>
                  <div className="mockups--js" style={scaleStyles}>
                    <ReactResizeDetector handleWidth handleHeight onResize={this.onChildResize} />
                    <div className="mockups__screen--js" style={transform3d} >
                      <img
                        className="mockups__screen-image--js"
                        src={mediaURL}
                        alt={ __( 'Upload Image', 'launchui' ) } 
                        style={deviceStyles}
                      />
                      <svg width="0" height="0">
                        <clipPath id={deviceId}>
                          <path d={maskPath}></path>
                        </clipPath>
                      </svg>
                    </div>
                    <img className="mockups__body--js" src={`${pluginUrl}/blocks/iphonex/${deviceMockupUrl}`} /> 
                  </div>
                </div>
              }
            <MediaUpload
              onSelect={this.onSelectImage}
              allowedTypes="image"
              value={mediaID}
              render={({ open }) => (
                <Button className='button button-large' onClick={open}>
                {__( 'Add Screenshot (375×812px)', 'launchui' )}
                </Button>
              )}
            />
        </div>
      );
    }
  },
  // No save, this is a dynamic block
  save: props => {
    return null
  }
})
