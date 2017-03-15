/* @flow */

import {Platform, Dimensions} from 'react-native'

export default class Theme {
  // Common colours
  static colourBlack = '#000';
  static colourWhite = '#fff';
  static colourGrey25 = '#404040';
  static colourGrey75 = '#BFBFBF';
  static colourTransparent = 'transparent';

  // App theme colours
  static colourBG = '#21212a';
  static colourBGAlt = '#0B0B0F';
  static colourAccent = '#C72B20';

  // Sizes
  static itemMargin = 1;
  static screenWidth = Dimensions.get('window').width;

  // Platform specific colours
  static colourSettingsBorder() {
    return Platform.OS === 'ios' ? this.colourGrey75 : this.colourTransparent
  }

  static colourSpinner() {
    return Platform.OS === 'ios' ? this.colourGrey75 : this.colourAccent
  }
}
Object.freeze(Theme)
