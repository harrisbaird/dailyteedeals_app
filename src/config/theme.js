/* @flow */

import { Platform } from 'react-native'

export default class Theme {
  static itemMargin = 1

  // Common colours
  static colourBlack = '#000'
  static colourWhite = '#fff'
  static colourGrey25 = '#404040'
  static colourGrey75 = '#BFBFBF'
  static colourTransparent = 'transparent'

  // App theme colours
  static colourBG = '#21212a'
  static colourBGAlt = '#0B0B0F'
  static colourAccent = '#C72B20'

  // Platform specific colours
  static colourSettingsBorder() {
    return Platform.OS === 'ios' ? this.colourGrey75 : this.colourTransparent
  }

  static colourSpinner() {
    return Platform.OS === 'ios' ? this.colourGrey75 : this.colourAccent
  }
}
Object.freeze(Theme)
